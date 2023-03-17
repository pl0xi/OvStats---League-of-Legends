import { useEffect, useState } from "react";
import Header from "../components/Header";
import MatchHistory from "../components/MatchHistory";
import RankDisplay from "../components/RankDisplay";

const Panel = () => {
    
    const [rankDisplayComponentLoaded, setRankDisplayComponentLoaded] = useState(false);
    const [matchHistoryComponentLoaded, setMatchHistoryComponentLoaded] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(rankDisplayComponentLoaded && matchHistoryComponentLoaded) {
            setLoading(false)
        }
    }, [rankDisplayComponentLoaded, matchHistoryComponentLoaded])

    return (
        <>
            <Header />
            <div style={{visibility: loading ? "hidden" : "visible"}}>
                <RankDisplay setLoaded={setRankDisplayComponentLoaded}/>
                <MatchHistory setLoaded={setMatchHistoryComponentLoaded} />
            </div>
            <div className="loadingScene" style={{display: loading ? "block" : "none"}}>
                <div className="loadingDot dotOne"></div>
                <div className="loadingDot dotTwo"></div>
                <div className="loadingDot dotThree"></div>
                <div className="loadingDot dotFour"></div>
                <p>Loading summoner stats...</p>
            </div>
        </>
    )
    
}

export default Panel;