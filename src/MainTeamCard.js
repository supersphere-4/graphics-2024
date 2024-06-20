import { Button, Stack, Image, Card, CardHeader, ProgressBar, Container, Row, Col, CardBody, CardFooter } from "react-bootstrap";
import { useEffect, useState } from "react";
import './TeamCard.css'
import games from './data/games.json'

function MainTeamCard(props) {

    const team = props.teams.find((team)=> {return team.team_number === props.main});
    const teamName = team.team_name;
    const currRun = team.finished + props.runs[team.team_number - 1];
    const currGame = team.schedule.runs[currRun].data.game;
    const currRunner = team.schedule.runs[currRun].data.name;
    const currRunnerPronouns = props.runners.find((runner) => {return runner.name === currRunner}).pronouns;
    const start = new Date(team.schedule.runs[currRun].scheduled);
    const end = new Date(start.getTime() + team.schedule.runs[currRun].length_t*1000);
    const gameOrder = team.schedule.runs.map((run) => run.data.game);
    games.sort((game1, game2) => gameOrder.indexOf(game1[0]) - gameOrder.indexOf(game2[0]));
    const gamesCompleted = games.map((game) => {
            let src = "/game_logos/" + game[1] + ".png";
            return <div><Image src={src} width="128px" className={currRun > gameOrder.indexOf(game[0]) ? "complete" : currRun == gameOrder.indexOf(game[0]) ? "in-progress" : "incomplete"}></Image></div>
        }
    )
        


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
    }, [time, start, end]);

    return (
        <Card className="team-card main-card" style={{ width: '112rem' }}>
            <CardHeader id={team.team_color}>
                <Container fluid>
                    <Row>
                        <Col xs={12} className="team-name flex flex-grow">{teamName}</Col>
                        {/* <Col s><Button size="sm" variant="warning" className="">{currRun}/13</Button></Col> */}
                    </Row>
                </Container>
            </CardHeader>
            <CardFooter id="black">
                <Stack direction="horizontal">
                    {gamesCompleted}
                </Stack>
            </CardFooter>
        </Card>
    )
}

export default MainTeamCard;