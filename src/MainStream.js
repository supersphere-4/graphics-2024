import { Card } from "react-bootstrap";
import './MainStream.css'

function MainStream(props) {

    const main = props.main;
    const team = props.teams.find((team) => team.number == main);
    const currRun = team.finished;
    const currRunner = team.order[currRun][1];
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost";

    return (
    <Card className="main-stream mt-3 ml-5">
        <iframe src={src} width="1080px" height="840px"></iframe>
    </Card>
)
}

export default MainStream;