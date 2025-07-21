import { Button, Stack, Image, Card, CardHeader, ProgressBar, Container, Row, Col, CardBody, CardFooter } from "react-bootstrap";
import { useEffect, useState } from "react";
import './TeamCard.css'
import games from './data/games.json'

function MainTeamCard(props) {

    const team = props.teams.find((team)=> {return team.team_number === props.main});
    const teamName = team.team_name;
    const isTeamFinished = props.runs[team.team_number - 1] == 13;
    let currRun = props.runs[team.team_number - 1];
    if (isTeamFinished) currRun = 12;
    const run = team.schedule.run_order.indexOf(currRun + 1)
    
    const currRunner = team.schedule.runs[run].name;

    const start = new Date(team.schedule.runs[currRun].scheduled);
    const end = new Date(start.getTime() + team.schedule.runs[currRun].length_t*1000);
    let games_array = games
    for (let i = 0; i < games.length; i++) {
        games_array[i].order = team.schedule.run_order[i]
    }
    games_array = games_array.toSorted((game1, game2) => game1.order - game2.order)
    const gamesCompleted = games_array.map((game) => {
            let src = "/game_logos/" + game[1] + ".png";
            return <div><Image src={src} width="128px" className={isTeamFinished || currRun > games_array.indexOf(game) ? "complete" : currRun == games_array.indexOf(game) ? "in-progress" : "incomplete"}></Image></div>
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
        <Card className="team-card main-card" id={team.team_color} style={{ width: '106rem' }}>
            <CardHeader id={"team" + team.team_number}>
                <Container fluid>
                    <Row>
                        <Col xs={12} className="team-name flex flex-grow">
                            <Image src={"/team_logos/" + team.team_color + ".png"} width={70} height={70} className="m-2 pe-2"></Image>
                            {teamName}
                        </Col>
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