import { Image, Button, Card, CardHeader, ProgressBar, Container, Row, Col, CardBody, CardText } from "react-bootstrap";
import { useEffect, useState } from "react";
import './TeamCard.css'
import games from './data/games.json'

function TeamCard(props) {

    const teamName = props.team.team_name;
    const isTeamFinished = props.team.finished + props.runs[props.team.team_number - 1] == 13;
    const currRun = Math.min(props.team.finished + props.runs[props.team.team_number - 1], 12);
    const currGame = props.team.schedule.runs[currRun].data.game;
    const currRunner = props.team.schedule.runs[currRun].data.name;
    const currRunnerPronouns = props.runners.find((runner) => {return runner.name === currRunner}).pronouns;
    const start = new Date(props.team.schedule.runs[currRun].start_t);
    const end = new Date(props.team.schedule.runs[currRun].end_t);

    const [time, setTime] = useState(new Date());
    const [currRunTime, setCurrRunTime] = useState((time - start) / (end - start) * 100);

    const est_time = new Date(props.team.schedule.runs[currRun].estimate * 1000).toUTCString().split(" ")[4];

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => new Date());
            setCurrRunTime(prevTime => (time - start) / (end - start) * 100);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time, start, end]);

    const gameOrder = props.team.schedule.runs.map((run) => run.data.game);
    games.sort((game1, game2) => gameOrder.indexOf(game1[0]) - gameOrder.indexOf(game2[0]));
    const gamesCompleted = games.map((game) => {
            let src = "/game_logos/" + game[1] + ".png";
            return <Image src={src} width="40rem" fluid></Image>
        });

    return (
        <Card className="team-card m-4" border="dark" style={{ width: '18em' }} fluid>
            <CardHeader id={props.team.team_number !== props.main ? props.team.team_color : "black"}>
                <Container fluid>
                    <Row>
                    <Col className={"material-symbols-outlined mt-2"}>{props.main === props.team.team_number ? "volume_up" : ""}</Col>
                    <Col>{currRunner}</Col>
                    <Col><Button variant="success" size="sm" className={currRunnerPronouns === "" ? "no-pronouns" : "ms-3 mb-1"} id="pronouns">{currRunnerPronouns}</Button></Col>
                    </Row>
                </Container>
            </CardHeader>
            <CardBody id={props.team.team_color}>
                <Container fluid>
                    <Row>
                        <Col>{currGame}</Col>
                    </Row>
                    <Row>
                        <Col>Estimate: {est_time}</Col>
                        </Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default TeamCard;