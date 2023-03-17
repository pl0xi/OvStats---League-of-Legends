import divisions from "../images/Divisions";
import { useState } from "react";

const RankDisplay = (props : any) => {

    const [summonerName, setSummonerName] = useState();
    const [tier, setTier] = useState();
    const [rank, setRank] = useState();
    const [rankBadge, setRankbagde] = useState(divisions.Iron);
    const [lp, setLP] = useState()
    const [wins, setWins] = useState()
    const [losses, setLosses] = useState()
   
    window.Twitch.ext.configuration.onChanged(() => {
        var config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content);
 
            if(config[0] !== null) {
                setSummonerName(config[0])
                fetch(`https://localhost:7256/api/league/summoner?username=${config[0]}&region=${config[1]}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    var data = responseJson.data;
                    setTier(data.tier)
                    setRank(data.rank)
                    setLP(data.leaguePoints)
                    setWins(data.wins)
                    setLosses(data.losses);
    
                    switch (data.tier) {
                        case "IRON":
                            setRankbagde(divisions.Iron);
                            break;
                        case "BRONZE":
                            setRankbagde(divisions.Bronze);
                            break;
                        case "SILVER":
                            setRankbagde(divisions.Silver);
                            break;
                        case "GOLD":
                            setRankbagde(divisions.Gold);
                            break;
                        case "PLATINUM":
                            setRankbagde(divisions.Platinum);
                            break;
                        case "DIAMOND":
                            setRankbagde(divisions.Diamond);
                            break;
                        case "MASTER":
                            setRankbagde(divisions.Master);
                            break;
                        case "GRANDMASTER":
                            setRankbagde(divisions.Grandmaster);
                            break;
                        case "CHALLENGER":
                            setRankbagde(divisions.Challenger);
                            break;
                        default:
                            setRankbagde(divisions.Iron);
                            break;
                    }
                    props.setLoaded(true)
                })
            }
    })
  
    return (
        <div id="rankDisplay">
        <img id="divisionImage" src={rankBadge} alt="league rank"/>
        <div id="rankDisplayFlexItem">
            <h1 id="summonerName">{summonerName}</h1>
            <h2 id="divisonTierTitle">{tier} - {rank} ({lp} LP)</h2>
        </div>
        <div id="lpAndLosses">
            <p>WIN: {wins} - LOSS: {losses}</p>
        </div>
    </div>
    )
    
}

export default RankDisplay;