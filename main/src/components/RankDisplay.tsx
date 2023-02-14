import divisions from "../images/Divisions";

const RankDisplay = () => {
    return (
        <div id="rankDisplay">
            <img id="divisionImage" src={divisions.Bronze} alt="league rank"/>
            <h1 id="summonerName">Sofieee</h1>
            <h1 id="divisonTierTitle">Bronze - II</h1>
        </div>
    )
}

export default RankDisplay;