import { Card, CardBody, Col } from "react-bootstrap";
import './MainStream.css'

function MainStream(props) {

    const src = "https://player.twitch.tv/?channel=" + "SuperSphere_" + "&parent=localhost&muted=true";

    return (
        <Col className=""><div className="peach"><iframe className={"team"} src={src} width="100%" height="100%"></iframe></div></Col>
    )
}

export default MainStream;