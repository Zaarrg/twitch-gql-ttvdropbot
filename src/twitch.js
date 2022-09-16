const GraphQL = require("./graphql");

const Twitch = {
    async SetClientID(ClientID) {
        GraphQL.ClientID = ClientID;
    },
    async SetRetryTimeout(timeout) {
        GraphQL.retrytimeout = timeout
    },
    async SetRetryAmount(amount) {
        GraphQL.maxretries = amount
    },
    async GetUser(login, variables = {}) {
        variables = {...variables, login};
        return await GraphQL.SendQuery("GET_USER", variables, "", "", false, {}, false);
    },
    async GetTopStreams(amount = 25, variables = {}) {
        variables = {after: "", ...variables, amount};
        return await GraphQL.SendQuery("GET_TOP_STREAMS", variables, "", "", false, {}, false);
    },
    async GetVideos(login, variables = {}) {
        let opts = {
            broadcastType: "ARCHIVE",
            channelOwnerLogin: login,
            limit: 30,
            videoSort: "TIME",
            ...variables
        }
        return await GraphQL.SendQuery("FilterableVideoTower_Videos", opts, '', '', true, {}, false);
    },
    async GetPlaybackAccessToken(vodID, variables = {}) {
        let opts = {
            isLive: false,
            isVod: true,
            login: "",
            playerType: "channel_home_carousel",
            vodID: vodID,
            ...variables
        };
        return await GraphQL.SendQuery("PlaybackAccessToken", opts, '', '', true, {}, false);
    },
    async GetVideoMoments(vodID, variables = {}) {
        let opts = {
            videoId: vodID,
            ...variables
        };
        return await GraphQL.SendQuery("VideoPreviewCard__VideoMoments", opts, '', '', true, {}, false);
    },
    async GetVideoMetadata(channelLogin, vodID, variables = {}) {
        let opts = {
            channelLogin,
            videoID: vodID,
            ...variables
        };
        return await GraphQL.SendQuery("VideoMetadata", opts, '', '', true, {}, false);
    },
    async GetChatClip(clipSlug, variables = {}) {
        let opts = {
            clipSlug,
            ...variables
        };
        return await GraphQL.SendQuery("ChatClip", opts, '', '', true, {}, false);
    },
    async GetDirectoryPageGame(game, variables = {}) {
        let opts = {
            name: game,
            ...variables
        };
        return await GraphQL.SendQuery("DirectoryPage_Game", opts, '', '', true, {}, false);
    },
    async GetLiveStatus(channelLogin, variables = {}) {
        let opts = {
            channelLogin: channelLogin,
            ...variables
        };
        let livestatus = await GraphQL.SendQuery("UseLive", opts, '', "", true, {}, false)
        if (livestatus[0].data.user == null) {
            return null
        } else {
            return livestatus[0].data.user.stream != null
        }
    },
    async _SendQuery(QueryName, variables, sha256Hash = null, OAuth = null, preset = false, headers = {}, Integrity = false) {
        return await GraphQL.SendQuery(QueryName, variables, sha256Hash, OAuth, preset, headers, Integrity);
    }
};

module.exports = Twitch;
