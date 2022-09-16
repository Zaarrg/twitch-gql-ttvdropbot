const TwitchGQL = require("..").Init();

(async () => {
    
    await TwitchGQL.SetRetryTimeout(1000)
    
    let varo = {
        "input": {
            "channelID": "49891804",
            "claimID": "66d685be-daf6-44a5-b135-b0d7086592c8"
        }
    }
    
    const Inventory = await TwitchGQL._SendQuery("ClaimCommunityPoints", varo, '46aaeebe02c99afdf4fc97c7c0cba964124bf6b0af229395f1f6d1feed05b3d0', process.env.TWITCH_OAUTH_TOKEN, true, {}, true)
    console.log(Inventory)

    const status = await TwitchGQL.GetLiveStatus('marty_vole')
    console.log(status)
})();


