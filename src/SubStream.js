import {Card} from 'react-bootstrap'

function SubStream(props) {

    const currRun = props.team.finished;
    const currRunner = props.team.order[currRun][1];
    const src = "https://player.twitch.tv/?channel=" + currRunner + "&parent=localhost&muted=true";

    return (
    <Card className="ms-7 mt-3" id="sub-stream"><iframe src={src} width="100%" height="196px"/></Card>
    
    );
}

export default SubStream;