import { useState, useEffect } from "react";
declare global {
    interface Window {
        Twitch?: any;
    }
}


const Config = () => {
    const [summonerName, setSummonerName] = useState("");
    const [region, setRegion] = useState("");
    
    useEffect(() => {    
        window.Twitch.ext.onAuthorized((auth : any) => {});
    }, []);
    
    const submit = (e : any) => {
        e.preventDefault();
        window.Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify([summonerName, region]));
    }

    return (
        <>
            <form onSubmit={submit}>
                <label htmlFor="summonerName">Summoner Name:</label>
                <input id="summonerName" required value={summonerName} onChange={(event) => {
                    setSummonerName(event.target.value)
                }}/>
                <label htmlFor="region">Region</label>
                <select id="region" required value={region} onChange={(event) => {
                    setRegion(event.target.value)
                }}>
                    <option disabled>BR</option>
                    <option disabled>EUNE</option>
                    <option >EUW</option>
                    <option disabled>LAN</option>
                    <option disabled>LAS</option>
                    <option disabled>NA</option>
                    <option disabled>OCE</option>
                    <option disabled>RU</option>
                    <option disabled>TR</option>
                    <option disabled>JP</option>
                    <option disabled>KR</option>
                    <option disabled>PH</option>
                    <option disabled>SG</option>
                    <option disabled>TW</option>
                    <option disabled>TH</option>
                    <option disabled>VN</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Config;