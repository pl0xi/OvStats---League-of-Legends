import divisions from "../images/Divisions";
import { useEffect, useState } from "react";

const RankDisplay = () => {

    const [summonerName, setSummonerName] = useState("Extension is not configured!");
    const [tier, setTier] = useState("Loading..");
    const [rank, setRank] = useState ("Loading..");
    const [rankBadge, setRankbagde] = useState(divisions.Iron)
    useEffect(() => {    
        window.Twitch.ext.onAuthorized((auth : any) => {
            var config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content);

            if(config[0] != "") {
                setSummonerName(config[0])
                
                fetch(`https://localhost:7256/api/league/playerInfo?username=${config[0]}&region=${config[1]}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setTier(data.tier)
                    setRank(data.rank)
                    
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

                })
            }
        });
    }, []);

    return (
        <div id="rankDisplay">
            <img id="divisionImage" src={rankBadge} alt="league rank"/>
            <div id="rankDisplayFlexItem">
                <h1 id="summonerName">{summonerName}</h1>
                <h1 id="divisonTierTitle">{tier} - {rank}</h1>
            </div>
        </div>
    )
}

export default RankDisplay;