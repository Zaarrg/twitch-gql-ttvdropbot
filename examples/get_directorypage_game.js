const TwitchGQL = require("..").Init();

(async () => {
    let opts = {
        "name":"tom clancy's rainbow six siege",
        "sortTypeIsRecency":false,
        "limit":100
    }

    const DirectoryPage_Game = await TwitchGQL._SendQuery("DirectoryPage_Game", opts, 'd5c5df7ab9ae65c3ea0f225738c08a36a4a76e4c6c31db7f8c4b8dc064227f9e', "", true)
    console.log(DirectoryPage_Game[0].data.game)
})();