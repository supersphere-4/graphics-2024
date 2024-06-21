import './App.css';
import teams from './data/teams_final.json';
import runnerinfo from './data/runnerinfo.json';
import MainStream from './MainStream';
import Stream from './Stream';
import Teams from './Team';
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Fade } from 'react-bootstrap';
import MainTeamCard from './MainTeamCard';

function App(props) {
    
    const [time, setTime] = useState(0);
    const [runsCompleted, setRunsCompleted] = useState([0, 0, 0, 0, 0]);

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
        if (runsCompleted[team_number] == 13) {
            console.log(runsCompleted);
            console.error("Team " + team_number + " already finished!");
            const newMain = runsCompleted.findIndex((run) => run < 13);
            setTime(newMain > -1 ? newMain : time);
            console.warn("Set main stream to Team " + time);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000000);

        return () => {
            clearInterval(interval);
        };
    }, [time])

    return (
        <Container fluid>
            <Row className="mt-2">
                <Col>
                    <Button id="indigo" onClick={() => {MarkRunComplete(0)}}><span>Next Run</span></Button>
                </Col>
                <Col>
                    <Button id="purple" onClick={() => {MarkRunComplete(1)}}><span>Next Run</span></Button>
                </Col>
                <Col>
                    <Button id="green" onClick={() => {MarkRunComplete(2)}}><span>Next Run</span></Button>
                </Col>
                <Col>
                    <Button id="blue" onClick={() => {MarkRunComplete(3)}}><span>Next Run</span></Button>
                </Col>
                <Col>
                    <Button id="magenta" onClick={() => {MarkRunComplete(4)}}><span>Next Run</span></Button>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <Button id="indigo" onClick={() => {MainStreamOverride(0)}}><span>Send Indigo to Main</span></Button>
                </Col>
                <Col>
                    <Button id="purple" onClick={() => {MainStreamOverride(1)}}><span>Send Purple to Main</span></Button>
                </Col>
                <Col>
                    <Button id="green" onClick={() => {MainStreamOverride(2)}}><span>Send Green to Main</span></Button>
                </Col>
                <Col>
                    <Button id="blue" onClick={() => {MainStreamOverride(3)}}><span>Send Blue to Main</span></Button>
                </Col>
                <Col>
                    <Button id="magenta" onClick={() => {MainStreamOverride(4)}}><span>Send Magenta to Main</span></Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Teams teams={teams} runners={runnerinfo} main={time % 5 + 1} runs={runsCompleted}></Teams>
                </Col>
                <Col xs={9}>
                    <MainStream teams={teams} runners={runnerinfo} main={time % 5 + 1} runs={runsCompleted}/>
                </Col>
            </Row>
            <Row>
                <Col xs={6}></Col>
                <Col>
                    <Stream teams={teams} runners={runnerinfo} main={time % 5 + 1} runs={runsCompleted}/>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col xs={9}>
                    <MainTeamCard teams={teams} runners={runnerinfo} main={time % 5 + 1} runs={runsCompleted}></MainTeamCard>
                </Col>
            </Row>
        </Container>
        
    );
}

export default App;
