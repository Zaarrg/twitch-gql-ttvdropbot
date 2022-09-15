import TwitchGQL from "../index.js";
TwitchGQL.Init();

(async () => {
    let VodMoments = await TwitchGQL.client.GetVideoMoments("1297158218");
    console.log({VodMoments: VodMoments[0].data.video.moments.edges.map(i => i.node)});
})();