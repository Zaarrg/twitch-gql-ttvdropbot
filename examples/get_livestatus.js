const TwitchGQL = require("..").Init();

(async () => {
    const status = await TwitchGQL.GetLiveStatus('solaaa')
    console.log(status)
})();


