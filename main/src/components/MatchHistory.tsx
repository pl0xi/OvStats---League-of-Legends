import { useEffect, useState } from "react";

const MatchHistory = () => {

  const [matches, setMatches] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    window.Twitch.ext.onAuthorized((auth: any) => {
      var config = JSON.parse(
        window.Twitch.ext.configuration.broadcaster.content
      );

      if (config[0] !== "") {
        
        fetch(`https://localhost:7256/api/league/summoner/matches?username=${config[0]}&region=${config[1]}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setUser(responseJson.data.playerPuuid)
            setMatches(responseJson.data.matches);
          });
      }
    });
  }, []); 

  function calculateTimeDiff(time : number) : string {
    var currentDate : Date = new Date();
    var differenceTime : number = Math.floor((currentDate.getTime() - time) / 1000)
    if(differenceTime < 60) {
      return differenceTime + " seconds ago"
    } else if (differenceTime < 3600) {
      return Math.floor(differenceTime / 60) + " minutes ago"
    } else if (differenceTime < 86400) {
      return Math.floor((differenceTime / 60) / 60) + " hours ago"
    } else {
      return Math.floor(((differenceTime / 60) / 60)/24) + " days ago"
    }
  }

  function getGameResult(match: any) : string {
    if(user) {
        var matchState = match.info.participants.find((participant : any) => 
          participant.puuid === user
        )

        if(matchState.win) {
          return "WON"
        } else {
          return "LOST"
        }
    } else {
      return "Error: Missing configuration"
    }
  }

  return (
        <div id="matchHistory">
            <h1>Match History</h1>
            <div id="matches">
                {matches.map((match : any) => (
                  <div className="match"> 
                    <p>{calculateTimeDiff(match.info.gameEndTimestamp)}</p>
                    <p>{getGameResult(match)}</p>
                  </div>
                  
                  ))}
            </div>
        </div>
    );
};

export default MatchHistory;
