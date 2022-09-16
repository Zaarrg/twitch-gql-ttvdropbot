# TwitchGQL

### Allows interaction with Twitch via the Twitch's inner GraphQL protocol (Modified for TTVDropBot)

# Installation

Install it from [npm](https://github.com/Zaarrg/twitch-gql-ttvdropbot):

    $  npm install zaarrg/twitch-gql-ttvdropbot

# Contents
- [How to use](#how-to-use)
- [Methods](#methods)
- [About](#about)

# How to use

Head over to the `examples/` directory for examples.

```js
const TwitchGQL = require("..").Init();

(async () => {
    let CurrentTopStreams = await TwitchGQL.GetTopStreams();
    CurrentTopStreams = CurrentTopStreams.data.streams.edges;

    console.log(CurrentTopStreams);
})();
```

# Methods

## Init(clientID)

- `clientID` - An optional parameter to set the client ID

Initializes TwitchGQL en returns a client-object

## GetUser(login)

- `login` - Login of the broadcaster

Gets broadcaster information.

## GetTopStreams(amount)

- `amount` - An optional parameter to set the amount of rows you want to get

Get the current top broadcasters currently live

## GetVideos(login)

- `login` - Login of the broadcaster

Get a list of last broadcasts or videos from a broadcaster

## GetPlaybackAccessToken(videoID)

- `videoID` - The video ID you want to request the access token for

Get an access token and signature to use for an m3u8 playlist

## GetVideoMoments(videoID)

- `videoID` - The video ID you want to request the access token for

Get highlights/game changes of a vod

## GetDirectoryPageGame(game)

- `game` - The name of the Game e.g.: "tom clancy's rainbow six siege"

Get whole Directory of a Game on twitch

## GetLiveStatus(channelLogin)

- `channelLogin` - The video ID you want to request the access token for

Get the Live Status of a streamer.  
Returns True for Live, False for Offline and Null for Streamer not found.

## SetRetryTimeout(timeout)

- `timeout` - Timeout in ms, between the retries.

Set the Retry timeout.

## SetRetryAmount(amount)

- `amount` - The max amount of retries.

Set the maximum of Retries.

## _SendQuery(QueryName, variables, sha256Hash, OAuth, preset, headers, integrity)

- `QueryName` - The name of a preset query in the `queries` directory  
  In the case the `preset` parameter is true,
  this is the name of a pre-set queryname from Twitch

- `variables` - An optional object of variables you want to pass onto the query

- `sha256Hash` - Custom Hash to get specific requests without the need for it to be implemented

- `OAuth` - Ability to Provide a OAuth Token to get otherwise Inaccessible content like inventory

- `preset` - (default false) if `true` this will use provided sha256 otherwise will search

- `headers` - Add more headers to the request Format: ({'Cookie': '...'})

- `integrity` - (default false) if `true` will add the integrity check to the request

Send a raw query through GraphQL

# About

Made by poespas ( me@poespas.me ) edited by Zarg for the use with TTVDropBot
