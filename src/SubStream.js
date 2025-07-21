import {Col, Card} from 'react-bootstrap'
import './TeamCard.css'

function SubStream(props) {

    const currRun = props.runs[props.team.team_number - 1];
    if (currRun >= 13) return;
    const run = props.team.schedule.run_order.indexOf(currRun + 1)
    const currRunner = props.team.schedule.runs[run].name;
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost&muted=true";

    return (
        <iframe src={src} width="240px" height="135px" className={"team" + props.team.team_number + ' m-4'}/>
    );
}

export default SubStream;