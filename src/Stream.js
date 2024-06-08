import SubStream from "./SubStream";

function Stream(props) {

    const subTeams = props.teams.filter((team) => team.number != props.main);
    const teams = subTeams.map((team) => {
        return <SubStream team={team} runners={props.runners} id={team.name}/>
    });

    return (teams);
}

export default Stream;