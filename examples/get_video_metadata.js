import TwitchGQL from "../index.js";
TwitchGQL.Init();

(async () => {
    let VideoMetadata = await TwitchGQL.client.GetVideoMetadata("admiralbahroo", "1293529119");
    console.log(VideoMetadata[0].data.video);
})();