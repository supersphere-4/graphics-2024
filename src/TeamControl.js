import {Col, Button} from "react-bootstrap"

function TeamControl(props) {
    return (
        <>
            {props.teams.filter((team) => props.runs[team.team_number - 1] < 13).map((team) => {
                let num = team.team_number
                let color = team.team_color
                return (
                    <Col fluid>

                        {/* Switches the current team's stream to the next runner and sends the next team to the main stream. */}

                        <Button id={color} onClick={() => {
                            props.callback1(2, num, color);
                            props.callback3(team, props.main)
                            }}>
                                <span>{props.runs[num - 1] + team.finished < 12 ? "Next Run" : "Finish"}</span>
                        </Button>

                        {/* Forces the corresponding team to the main stream */}

                        <Button id={color} onClick={() => props.callback2(num, color)}>
                            <span>Send {color.replace(/^./, char => char.toUpperCase())} to Main</span>
                        </Button>

                        {/* Forces a refresh of the corresponding team's video feed */}

                        <Button id={color} variant="danger" onClick={() => props.callback3(team, props.main)}>
                            <span>Refresh {color.replace(/^./, char => char.toUpperCase())}</span>
                        </Button>
                    </Col>
                )
            })}
        </>
);
}

export default TeamControl;