const TwitchGQL = require("..").Init();

(async () => {
    const status = await TwitchGQL.GetTopStreams(25)
    console.log(status.data)
})();