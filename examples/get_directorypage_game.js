const TwitchGQL = require("..").Init();

(async () => {
    let opts = {
        limit: 50,
        options: {
            sort: "VIEWER_COUNT",
            tags: ["c2542d6d-cd10-4532-919b-3d19f30a768b"]
        },
        sortTypeIsRecency: false
    }

    const directorypagegame = await TwitchGQL.GetDirectoryPageGame("smite", opts)
    console.log(directorypagegame[0].data.game)
    
    console.log(directorypagegame[0].data.game.streams.edges[0])
})();