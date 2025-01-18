import { Card, CardBody, Col } from "react-bootstrap";
import './MainStream.css'

function MainStream(props) {

    const team_num = props.team_num;
    const main = props.main;
    const sub = props.sub;
    const team = props.teams.find((team) => team.team_number == team_num);
    const currRun = Math.min(team.finished + props.runs[team.team_number - 1], 12);
    let currRunner = team.schedule.runs[currRun].data.name;
    if (team.schedule.runs[currRun].data.twitch_name) {
        currRunner = team.schedule.runs[currRun].data.twitch_name;
    }
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost&muted=";

    return (
        <iframe src={src + (team_num == sub ? "true" : "false")} width="944px" height="531px"></iframe>
    )
}

export default MainStream;