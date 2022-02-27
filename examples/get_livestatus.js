const TwitchGQL = require("..").Init();

(async () => {
    const status = await TwitchGQL.GetLiveStatus('marty_vole')
    console.log(status)
})();


