import {Col, Card} from 'react-bootstrap'
import './TeamCard.css'

function SubStream(props) {

    const currRun = props.team.finished + props.runs[props.team.team_number - 1];
    const currRunner = props.team.schedule.runs[currRun].data.name;
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost&muted=true";

    return (
        <iframe src={src} width="240px" height="135px" className='m-4'/>
    );
}

export default SubStream;