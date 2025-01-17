import './App.css';
import teams from './data/teams_2025_jan.json';
import runnerinfo from './data/runnerinfo.json';
import MainStream from './MainStream';
import Teams from './Team';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Fade, Stack } from 'react-bootstrap';
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
                return newRunsCompleted;
            }
        )
        setTime(time + 1);
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
        }, 450000);

        return () => {
            clearInterval(interval);
        };
    }, [time])

    return (
        <Stack>
            <Row>
                <Col>
                    <MainStream
                        team_num={1}
                        teams={teams}
                        runners={runnerinfo}
                        main={time % team_count + 1}
                        sub={(time + 1) % team_count + 1}
                        runs={runsCompleted}
                    />
                </Col>
                <Col>
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
            <Stack direction='horizontal' gap={4}>
                <Teams teams={teams} runners={runnerinfo} main={time % team_count + 1} runs={runsCompleted}></Teams>
            </Stack>
            <Stack direction="horizontal">
            <MainTeamCard teams={teams} runners={runnerinfo} main={time % team_count + 1} card_number={1} runs={runsCompleted}></MainTeamCard>
            <MainTeamCard teams={teams} runners={runnerinfo} main={time % team_count + 1} card_number={2} runs={runsCompleted}></MainTeamCard>
            </Stack>
            <Row>
                <Col className='d-grid gap-2'>
                    <Button id="red" onClick={() => {MarkRunComplete(0)}}><span>Next Run</span></Button>
                    <Button id="purple" onClick={() => {MarkRunComplete(1)}}><span>Next Run</span></Button>
                </Col>
                <Col className='d-grid gap-2'>
                    <Button id="red" onClick={() => {MainStreamOverride(0)}}><span>irl_1545 Audio</span></Button>
                    <Button id="purple" onClick={() => {MainStreamOverride(1)}}><span>Purple Idiots Audio</span></Button>
                </Col>
            </Row>
        </Stack>
        
    );
}

export default App;
