import './App.css';
import teams from './data/teams.json';
import runnerinfo from './data/runnerinfo.json';
import MainStream from './MainStream';
import Stream from './Stream';
import Teams from './Team';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';



function App(props) {

    const [time, setTime] = useState(0);
    const [runtime, setRunTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [time])

    return (
        <Container fluid>
            <Row>
                <Col s xl={3}>
                    <Teams teams={teams} runners={runnerinfo}></Teams>
                </Col>
                <Col s xl={2}>
                    <Stream teams={teams} runners={runnerinfo} main={time % 5 + 1}/>
                </Col>
                <Col xl="auto">
                    <MainStream teams={teams} runners={runnerinfo} main={time % 5 + 1}/>
                </Col>
            </Row>
            <Row>
                
            </Row>
        </Container>
        
    );
}

export default App;
