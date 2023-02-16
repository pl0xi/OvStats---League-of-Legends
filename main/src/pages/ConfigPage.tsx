import { useState, useEffect } from "react";
declare global {
    interface Window {
        Twitch?: any;
    }
}


const Config = () => {
    const [summonerName, setSummonerName] = useState("");
    const [region, setRegion] = useState("euw1");
    
    useEffect(() => {    
        window.Twitch.ext.onAuthorized((auth : any) => {});
    }, []);
    
    const submit = (e : any) => {
        e.preventDefault();

        fetch(`https://localhost:7256/api/league/verifyAccount?username=${summonerName}&region=${region}`)
            .then(response => {
                if(response.status == 200) {
                    window.Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify([summonerName, region]));
                    console.log("Account set")
                } else {
                    // WIP 
                    console.log("Account not found")
                }
                
                return response;
            })

    }

    return (
        <>
            <form onSubmit={submit}>
                <label htmlFor="summonerName">Summoner Name:</label>
                <input id="summonerName" required value={summonerName} onChange={(event) => {
                    setSummonerName(event.target.value)
                }}/>
                <label htmlFor="region">Region</label>
                <select id="region" defaultValue="euw1" required onChange={(event) => {
                    setRegion(event.target.value);
                }}>
                    <option disabled>BR</option>
                    <option value="eune">EUNE</option>
                    <option value="euw1">EUW</option>
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