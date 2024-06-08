import TeamCard from "./TeamCard";

function Teams(props) {

    const teams = props.teams.map((team) => {
        return <TeamCard team={team} runners={props.runners}/>
    });

    return (teams)
}

export default Teams;