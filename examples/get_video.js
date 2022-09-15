import TwitchGQL from "../index.js";
TwitchGQL.Init();

(async () => {
    let Channel = await TwitchGQL.client._SendQuery("GET_VIDEO", {videoId: "1293128540"});
    console.log(Channel.data.video);
})();