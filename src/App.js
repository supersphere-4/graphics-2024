import './App.css';
import teams from './data/teams_new.json';
import runnerinfo from './data/runnerinfo_new.json';
import MainStream from './MainStream';
import Stream from './Stream';
import TeamControl from './TeamControl';
import Teams from './Team';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainTeamCard from './MainTeamCard';

function App(props) {
    
    const [time, setTime] = useState(0);
    const [main, setMain] = useState(1);
    const [runsCompleted, setRunsCompleted] = useState(teams.map((team) => team.finished));

    const minutes = 0.1;

    function refreshStream(team, main) {
        const currRun = runsCompleted[team.team_number - 1] + 1;
        if (currRun > 13 || currRun < 0) {
            console.error("This team is already finished!");
            return;
        }

        let stream = document.querySelector("iframe.team" + team.team_number);
        const run = team.schedule.run_order.indexOf(currRun)
        const currRunner = team.schedule.runs[run].name;
        const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost" + (team.team_number === main ? '' : "&muted=true");
        stream.src = src;
    }

    function disableButton(seconds, team_number, team_color) {
        MarkRunComplete(team_number, team_color)
        let buttons = document.querySelectorAll('button#' + team_color + ':not(#pronouns):not(#team-progress)');
        for (let b of buttons) {
            b.disabled = true
        }
        if (true) {
            setTimeout(function() {
                for (let b of buttons) {
                    b.disabled = false
                }
            }, seconds * 1000);
        }
    }

    function MainStreamOverride(team_number) {
        if (runsCompleted.every(run => run >= 13)) {
            console.error("This relay is over!");
            return;
        }
        if (runsCompleted[team_number - 1] >= 13) {
            console.error("This team is already finished!");
            return;
        }
        setMain(team_number);
    }

    function MarkRunComplete(team_number, team_color) {

        if (runsCompleted.every(run => run >= 13)) {
            return;
        }
        if (runsCompleted[team_number - 1] >= 12) {
            let buttons = document.querySelectorAll('button#' + team_color);
            for (let b of buttons) {
                b.disabled = true;
            }
        }
        setRunsCompleted (
            function() {
                const newRunsCompleted = runsCompleted;
                newRunsCompleted[team_number - 1] = runsCompleted[team_number - 1] + 1;
                return newRunsCompleted;
            }
        )
        if (main == team_number) {
            getNewMain();
        }
        if (runsCompleted[team_number - 1] >= 13) {
            return;
        }
    }

    function getNewMain() {
        const newMain = runsCompleted.findIndex((run) => run === Math.min(...runsCompleted)) + 1;
        setMain(newMain);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, minutes * 60000);

        return () => {
            clearInterval(interval);
            let newMain = (time) % runsCompleted.length + 1;
            if (runsCompleted[newMain - 1] >= 13) {
                let i = 0;
                while (runsCompleted[newMain - 1] >= 13) {
                    if (i > 10) break;
                    setMain((time + i) % runsCompleted.length + 1);
                    i++;
                }
            }
            if (runsCompleted[newMain - 1] >= 13) {
                getNewMain();
            }
        };
    }, [time])

    

    return (
        <Container fluid>
            <Row className="my-4">
                <TeamControl main={main} teams={teams} runs={runsCompleted} callback1={disableButton} callback2={MainStreamOverride} callback3={refreshStream}></TeamControl>
            </Row>
            <Row>
                <Col>
                    <Teams teams={teams} runners={runnerinfo} main={main} runs={runsCompleted}></Teams>
                </Col>
            </Row>
            <Row className="my-4">
                <Col fluid>
                    <MainStream teams={teams} runners={runnerinfo} main={main} runs={runsCompleted}/>
                </Col>
                <Col fluid>
                    <Stream teams={teams} runners={runnerinfo} main={main} runs={runsCompleted}/>
                </Col>
            </Row>
            <Row className="my-4">
                <Col xs={9}>
                    <MainTeamCard teams={teams} runners={runnerinfo} main={main} runs={runsCompleted}></MainTeamCard>
                </Col>
            </Row>
        </Container>
        
    );
}

export default App;
