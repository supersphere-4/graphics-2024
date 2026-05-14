import {Col, Card} from 'react-bootstrap'
import './TeamCard.css'

function SubStream(props) {

    const currRun = props.runs[props.team.team_number - 1];
    if (currRun >= 13) return;
    const run = 1
    const currRunner = (props.team.schedule.runs[run].twitch_name !== "" ? props.team.schedule.runs[run].twitch_name : props.team.schedule.runs[run].name);
    const src = "https://player.twitch.tv/?channel=" + "Johanian" + "&parent=localhost&muted=true";

    return (
        <iframe src={src} width="480px" height="270px" className={"team" + props.team.team_number + ' m-4'}/>
    );
}

export default SubStream;