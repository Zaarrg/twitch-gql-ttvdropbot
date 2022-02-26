const TwitchGQL = require("..").Init();

(async () => {
    let opts = {
        "sortTypeIsRecency":false,
        "limit":100
    }

    const directorypagegame = await TwitchGQL.GetDirectoryPageGame("tom clancy's rainbow six siege", opts)
    console.log(directorypagegame[0].data.game)
})();