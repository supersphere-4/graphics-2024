import { Badge, Card, CardHeader, ProgressBar, Container, Row, Col, CardBody } from "react-bootstrap";
import { useEffect, useState } from "react";
import './TeamCard.css'

function TeamCard(props) {

    const teamName = props.team.name;
    const currRun = props.team.finished;
    const currGame = props.team.order[currRun][0];
    const currRunner = props.team.order[currRun][1];
    const currRunnerPronouns = props.runners.find((runner) => {return runner.name === currRunner}).pronouns;
    const start = new Date(props.team.start[currRun]);
    const end = new Date(props.team.end[currRun]);

    const [time, setTime] = useState(new Date());
    const [currRunTime, setCurrRunTime] = useState((time - start) / (end - start) * 100);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => new Date());
            setCurrRunTime(prevTime => (time - start) / (end - start) * 100);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time, start, end])

    return (
        <Card className="team-card m-2 mt-3" id={props.team.color}>
            <CardHeader>
                <Container fluid>
                    <Row>
                        <Col className="team-name" xxl="auto">{teamName}</Col>
                        <Col s l={3}><Badge bg="warning" className="mb-2">{currRun}/13</Badge></Col>
                    </Row>
                </Container>
            </CardHeader>
            <CardBody>
                <Container>
                        <Row>
                            <Col><div>{currRunner}</div></Col>
                            <Col s l={3}><Badge bg="danger" className={currRunnerPronouns === "" ? "no-pronouns" : "mt-1 ms-2"} id="pronouns">{currRunnerPronouns}</Badge></Col>
                        </Row>
                        <Row><div>{currGame}</div></Row>
                        <Row><div><ProgressBar className="mt-1" aria-label="run-progress" variant="warning" now={currRunTime} style={{height:"0.3rem"}}/></div></Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default TeamCard;