import TwitchGQL from "../index.js";
TwitchGQL.Init();

(async () => {
    let CurrentTopStreams = await TwitchGQL.client.GetTopStreams();
    CurrentTopStreams = CurrentTopStreams.data.streams.edges;

    for (let i = 0; i < CurrentTopStreams.length; i++) {
        const stream = CurrentTopStreams[i].node;
        
        console.log(`"${stream.title}" by "${stream.broadcaster.displayName}"`)
    }
})();