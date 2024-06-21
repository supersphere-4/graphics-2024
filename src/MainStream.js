import { Card, CardBody, Col } from "react-bootstrap";
import './MainStream.css'

function MainStream(props) {

    const main = props.main;
    const team = props.teams.find((team) => team.team_number == main);
    const currRun = Math.min(team.finished + props.runs[team.team_number - 1], 12);
    const currRunner = team.schedule.runs[currRun].data.name;
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost";

    return (
        <Col className=""><iframe src={src} width="1520px" height="855px"></iframe></Col>
    )
}

export default MainStream;