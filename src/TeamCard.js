import { Button, Card, CardHeader, ProgressBar, Container, Row, Col, CardBody, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import './TeamCard.css'

function TeamCard(props) {

    const teamName = props.team.team_name;
    const isTeamFinished = props.runs[props.team.team_number - 1] >= 13;
    const currRun = Math.min(props.runs[props.team.team_number - 1], 12);
    const run = props.team.schedule.run_order.indexOf(isTeamFinished ? 13 : currRun + 1)
    const currRunner = props.team.schedule.runs[run].name;
    const currGame = props.team.schedule.runs[run].game;
    const currRunnerPronouns = props.runners.find((runner) => ( runner.name == currRunner)).pronouns;
    const run_length = props.team.schedule.runs[run].estimate.split("PT")[1];

    const hours = run_length.split(/H|M|S/)[0];
    const minutes = run_length.split(/H|M|S/)[1];
    const seconds = run_length.split(/H|M|S/)[2];


    const start = new Date(props.team.schedule.runs[run].start_time);
    const end = new Date(start.getTime() + hours*3600*1000 + minutes*60*1000 + seconds*1000);

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
                        <Col><Image src={'/team_logos/' + props.team.team_color + '.png'} width={32}></Image></Col>
                        <Col xs={8} m={3} className="team-name">{teamName}</Col>
                        <Col><Button variant="primary" id="team-progress">{isTeamFinished ? "FINISHED" : "GAME " + (currRun + 1) + "/13"}</Button></Col>
                    </Row>
                </Container>
            </CardHeader>
            <CardBody id={props.team.team_color}>
                <Container>
                        <Row>
                            <Col>{currRunner}<Button variant="danger" size="sm" className={currRunnerPronouns === "" ? "no-pronouns" : "ms-3 mb-1"} id="pronouns">{currRunnerPronouns}</Button></Col>
                        </Row>
                        <Row><span>{currGame}</span></Row>
                        <Row><div><ProgressBar className="" aria-label="run-progress" variant="primary" now={currRunTime} style={{height:"0.4rem"}}/></div></Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default TeamCard;