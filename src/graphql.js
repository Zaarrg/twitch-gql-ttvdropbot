const axios = require("axios")
const fs = require("fs");

const Operation_Hashes = {
    'CollectionSideBar': '27111f1b382effad0b6def325caef1909c733fe6a4fbabf54f8d491ef2cf2f14',
    'FilterableVideoTower_Videos': 'a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb',
    'ClipsCards__User': 'b73ad2bfaecfd30a9e6c28fada15bd97032c83ec77a0440766a56fe0bd632777',
    'ChannelCollectionsContent': '07e3691a1bad77a36aba590c351180439a40baefc1c275356f40fc7082419a84',
    'StreamMetadata': '1c719a40e481453e5c48d9bb585d971b8b372f8ebb105b17076722264dfa5b3e',
    'ComscoreStreamingQuery': 'e1edae8122517d013405f237ffcc124515dc6ded82480a88daef69c83b53ac01',
    'VideoPreviewOverlay': '3006e77e51b128d838fa4e835723ca4dc9a05c5efd4466c1085215c6e437e65c',
    'PlaybackAccessToken': '0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712',
    'VideoPreviewCard__VideoMoments': '0094e99aab3438c7a220c0b1897d144be01954f8b4765b884d330d0c0893dbde',
    'VideoMetadata': 'cb3b1eb2f2d2b2f65b8389ba446ec521d76c3aa44f5424a1b1d235fe21eb4806',
    'ChatClip': '9aa558e066a22227c5ef2c0a8fded3aaa57d35181ad15f63df25bff516253a90',
    'UseLive': '639d5f11bfb8bf3053b424d9ef650d04c4ebb7d94711d644afb08fe9a0fad5d9',
    'DirectoryPage_Game': 'd5c5df7ab9ae65c3ea0f225738c08a36a4a76e4c6c31db7f8c4b8dc064227f9e',
    'ViewerDropsDashboard': 'e8b98b52bbd7ccd37d0b671ad0d47be5238caa5bea637d2a65776175b4a23a64'
};

const GraphQL = {
    Endpoint: "https://gql.twitch.tv/gql",
    ClientID: null,
    retries: 0,
    retrytimeout: 60000,
    maxretries: 4,

    SendQuery: async (QueryName, variables = null, sha256Hash = '', OAuth = '',  preset = false) => {
        let body = { variables };
        let Hash = (sha256Hash === '') ? Operation_Hashes[QueryName] : sha256Hash
    
        if (!GraphQL.ClientID)
            throw "Please make sure to fill in a ClientID";
    
        if (!preset) {
            body.query = fs.readFileSync(`${__dirname}/../queries/${QueryName}.gql`, "UTF-8");
        }
        else {
            body.operationName = QueryName;
            body.extensions = {
                "persistedQuery": {
                    "version":1,
                    "sha256Hash": Hash
                }
            };
            body = [body];
        }
        
        return axios({
            method: "POST",
            url: GraphQL.Endpoint,
            headers: {
                "Content-Type": "text/plain;charset=UTF-8",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
                "Authorization": OAuth,
                "Client-Id": GraphQL.ClientID
            },
            data: JSON.stringify(body)
        })
            .then((response) => {return response.data})
            .then(async (data) => {
                if (data.errors || (data[0] && data[0].errors) || data.error) {
                    return await errorHandler(data, QueryName, variables, sha256Hash, OAuth, preset)
                }
                    GraphQL.retries = 0;
                    return data
            })
            .catch(async function (error) {
                return await errorHandler(error, QueryName, variables, sha256Hash, OAuth, preset)
            })
    }
}

async function errorHandler(error, QueryName, variables, sha256Hash, OAuth, preset) {
    if (GraphQL.retries < GraphQL.maxretries) {
        GraphQL.retries++
        if (error instanceof Array) {
            console.log("GQL RESPONSE ERROR! " + QueryName + " Request Failed... Retrying in " + (GraphQL.retrytimeout/1000) + " seconds... Try: " + GraphQL.retries + "/" + GraphQL.maxretries)
        } else {
            console.log("GQL ERROR! " + QueryName + " Request Failed... Retrying in " + (GraphQL.retrytimeout / 1000) + " seconds... Try: " + GraphQL.retries + "/" + GraphQL.maxretries)
            console.log("With GQL Error! Errno: " + error.errno + " Code: " + error.code + " Syscall: " + error.syscall + " Hostname: " + error.hostname)
        }
        await delay(GraphQL.retrytimeout)
        return await GraphQL.SendQuery(QueryName, variables, sha256Hash, OAuth, preset);
    } else {
        if (error.code === undefined) {
            if (error instanceof Array) {
                throw JSON.stringify(error[0].errors)
            } else {
                throw error
            }
        } else {
            throw "GQL Error! Errno: " + error.errno + " Code: " + error.code + " Syscall: " + error.syscall + " Hostname: " + error.hostname
        }
    }
}

async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = GraphQL;