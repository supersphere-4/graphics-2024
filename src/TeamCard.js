import { Button, Card, CardHeader, ProgressBar, Container, Row, Col, CardBody } from "react-bootstrap";
import { useEffect, useState } from "react";
import './TeamCard.css'

function TeamCard(props) {

    const teamName = props.team.team_name;
    const isTeamFinished = props.team.finished + props.runs[props.team.team_number - 1] == 13;
    const currRun = Math.min(props.team.finished + props.runs[props.team.team_number - 1], 12);
    const currGame = props.team.schedule.runs[currRun].data.game;
    const currRunner = props.team.schedule.runs[currRun].data.name;
    const currRunnerPronouns = props.runners.find((runner) => {return runner.name === currRunner}).pronouns;
    const start = new Date(props.team.schedule.runs[currRun].scheduled);
    const end = new Date(start.getTime() + props.team.schedule.runs[currRun].length_t*1000);

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
        <Card className="team-card" style={{ width: '38rem'}} border="light">
            <CardHeader id={props.team.team_number !== props.main ? props.team.team_color : "black"}>
                <Container fluid>
                    <Row>
                        <Col xs={9} m={2} className="team-name">{teamName}</Col>
                        <Col><Button variant="warning">{isTeamFinished ? "FINISHED" : "GAME " + (currRun + 1) + "/13"} </Button></Col>
                    </Row>
                </Container>
            </CardHeader>
            <CardBody id={props.team.team_color}>
                <Container>
                        <Row>
                            <Col>{currRunner}<Button variant="danger" size="sm" className={currRunnerPronouns === "" ? "no-pronouns" : "ms-3 mb-1"} id="pronouns">{currRunnerPronouns}</Button></Col>
                        </Row>
                        <Row><span>{currGame}</span></Row>
                        <Row><div><ProgressBar className="" aria-label="run-progress" variant="warning" now={currRunTime} style={{height:"0.4rem"}}/></div></Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default TeamCard;