import { useState, useEffect } from "react";
declare global {
    interface Window {
        Twitch?: any;
    }
}


const Config = () => {
    const [summonerName, setSummonerName] = useState("");
    const [region, setRegion] = useState("euw1");
    const [failed, setFailed] = useState("none");
    const [success, setSuccess] = useState("none");

    useEffect(() => {    
        window.Twitch.ext.onAuthorized((auth : any) => {});
    }, []);
    
    const submit = (e : any) => {
        e.preventDefault();

        fetch(`https://localhost:7256/api/league/verifyAccount?username=${summonerName}&region=${region}`)
            .then(response => {
                if(response.status === 200) {
                    window.Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify([summonerName, region]));
                    setSuccess("block");
                } else {
                    setFailed("block")
                }
                
                removeNotification();
                return response;
            })
    }

    const removeNotification = () => {
        setTimeout(() => {
            setFailed("none");
            setSuccess("none");
        }, 1500)
    }

    return (
        <>  
            <div id="notification">
                <div id="success" style={{display: success}}>
                    <p>Summoner set successfully</p>
                </div>
                <div id="failed" style={{display: failed}}>
                    <p>Summoner not found</p>
                </div>
            </div>
            <form id="summonerConfig" onSubmit={submit}>
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