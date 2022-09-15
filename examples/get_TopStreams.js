import TwitchGQL from "../index.js";
TwitchGQL.Init();

(async () => {
    const status = await TwitchGQL.client.GetTopStreams(25)
    console.log(status.data)
})();