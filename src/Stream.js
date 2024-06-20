import SubStream from "./SubStream";

function Stream(props) {

    const subTeams = props.teams.filter((team) => team.team_number != props.main);
    const teams = subTeams.map((team) => {
        return <SubStream team={team} runners={props.runners} id={team.team_name} runs={props.runs}/>
    });

    return (teams);
}

export default Stream;