import Twitch from "./src/twitch.js";

const TwitchGQL = { 
    client: Twitch,
    isInitialized: false,

    Init: (ClientID = "kimne78kx3ncx6brgo4mv6wki5h1ko") => {
        if (TwitchGQL.client.isInitialized)
            return TwitchGQL.client;

        TwitchGQL.client.SetClientID(ClientID);
        TwitchGQL.isInitialized = true;
        return TwitchGQL.client;
    }
}

export default TwitchGQL;