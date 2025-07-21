import { Card, CardBody, Col } from "react-bootstrap";
import './MainStream.css'

function MainStream(props) {

    const main = props.main;
    const team = props.teams.find((team) => team.team_number === main);
    const isTeamFinished = props.runs[team.team_number - 1] == 13;
    let currRun = props.runs[team.team_number - 1];
    if (isTeamFinished) currRun = 12;
    const run = team.schedule.run_order.indexOf(currRun + 1)
    const currRunner = team.schedule.runs[run].name;
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost";

    return (
        <Col className=""><iframe className={"team" + team.team_number} src={src} width="1520px" height="855px"></iframe></Col>
    )
}

export default MainStream;