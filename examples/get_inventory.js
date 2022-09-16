const TwitchGQL = require("..").Init();

(async () => {
    const Inventory = await TwitchGQL._SendQuery("Inventory", {}, '27f074f54ff74e0b05c8244ef2667180c2f911255e589ccd693a1a52ccca7367', process.env.TWITCH_OAUTH_TOKEN, true)
    console.log(Inventory[0].data.currentUser)
})();