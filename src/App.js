import './App.css';
import teams from './data/teams_2025_jan.json';
import runnerinfo from './data/runnerinfo.json';
import MainStream from './MainStream';
import Teams from './Team';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Fade } from 'react-bootstrap';
import MainTeamCard from './MainTeamCard';

function App(props) {
    
    const [time, setTime] = useState(0);
    const [runsCompleted, setRunsCompleted] = useState([0, 0, 0, 0, 0]);
    const team_count = 2;

    function MainStreamOverride(team_number) {
        if (runsCompleted.every(run => run >= 13)) {
            console.error("The relay race is over!");
            return;
        }
        if (runsCompleted[team_number] == 13) {
            console.error("This team is already finished!");
            console.warn(runsCompleted);
            const newMain = runsCompleted.findIndex((run) => run < 13);
            setTime(newMain > -1 ? newMain : time);
            return;
        }
        setTime(team_number);
    }

    function MarkRunComplete(team_number) {
        setRunsCompleted(
            function() {
                const newRunsCompleted = runsCompleted;
                newRunsCompleted[team_number] = Math.min(13, newRunsCompleted[team_number] + 1);
                setTime(time + 5);
                return newRunsCompleted;
            }
        )
        if (runsCompleted[team_number] == 13) {
            console.log(runsCompleted);
            console.error("Team " + team_number + " already finished!");
            const newMain = runsCompleted.findIndex((run) => run < 13);
            setTime(newMain > -1 ? newMain : time);
            console.warn("Set main stream to Team " + time);
        }
        console.warn(runsCompleted);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 600000);

        return () => {
            clearInterval(interval);
        };
    }, [time])

    return (
        <Container fluid>
            <Row className="mt-2">
                <Col>
                    <Button id="red" onClick={() => {MarkRunComplete(0)}}><span>Next Run</span></Button>
                </Col>
                <Col>
                    <Button id="blue" onClick={() => {MarkRunComplete(1)}}><span>Next Run</span></Button>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <Button id="red" onClick={() => {MainStreamOverride(0)}}><span>Team 1 Audio</span></Button>
                </Col>
                <Col>
                    <Button id="blue" onClick={() => {MainStreamOverride(1)}}><span>Team 2 Audio</span></Button>
                </Col>
            </Row>
            <Row>
                <Col s={4}>
                    <MainStream
                        team_num={1}
                        teams={teams}
                        runners={runnerinfo}
                        main={time % team_count + 1}
                        sub={(time + 1) % team_count + 1}
                        runs={runsCompleted}
                    />
                    <MainStream
                            team_num={2}
                            teams={teams}
                            runners={runnerinfo}
                            main={time % team_count + 1}
                            sub={(time + 1) % team_count + 1}
                            runs={runsCompleted}
                        />
                </Col>
            </Row>
            <Row>
                <Col s={6}>
                    <MainTeamCard teams={teams} runners={runnerinfo} main={1} runs={runsCompleted}></MainTeamCard>
                </Col>
                <Col s={6}>
                    <MainTeamCard teams={teams} runners={runnerinfo} main={2} runs={runsCompleted}></MainTeamCard>
                </Col>
            </Row>
            <Col>
                <Teams teams={teams} runners={runnerinfo} main={time % team_count + 1} runs={runsCompleted}></Teams>
            </Col>
        </Container>
        
    );
}

export default App;
