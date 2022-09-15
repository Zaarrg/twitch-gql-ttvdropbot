import TwitchGQL from "../index.js";
TwitchGQL.Init();

(async () => {
    let ChatClip = await TwitchGQL.client.GetChatClip("HappyLovelyDoveDoritosChip-1I0FMnBQn1W-Ho3P");
    console.log(ChatClip[0].data.clip);
})();