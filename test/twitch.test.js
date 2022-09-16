// const { test, expect, describe } = require("@jest/globals");

const TwitchGQL = require("..").Init();
const chai = require('chai');
const chaiMatchPattern = require('chai-match-pattern');
const expect = chai.expect;
const _ = chaiMatchPattern.getLodashModule();
chai.use(chaiMatchPattern);
const USERS = ["zellsis"];
const VIDEOS = ["132195945", "1121890940"];


//Start Mocha
describe('Operations', function () {
    
        it('GetLiveStatus', async function () {
            const status = await TwitchGQL.GetLiveStatus('solaaa')
            expect(status).to.be.a('boolean')
        });

        it('GetUser', async function () {
            const UserModel = {
                id: _.isString,
                login: _.isString,
                displayName: _.isString,
                description: _.isNull,
                createdAt: _.isString,
                roles: _.isObject,
                stream: _.isNull
            };
            
            let data = await TwitchGQL.GetUser('zaarrg');
            chai.expect(data.data.user).to.matchPattern(UserModel);
        });


    it('GetTopStreams', async function () {
        const TopStreamModel = {
            id: _.isString,
            title: _.isString,
            viewersCount: _.isNumber,
            language: _.isString,
            broadcaster: _.isObject,
            tags: _.isArray,
            game: _.isObject,
        };

            let data = await TwitchGQL.GetTopStreams(10);
            let streams = data.data.streams.edges.map((i) => i.node);

            expect(streams).to.be.length(10)

            for (let i = 0; i < streams.length; i++) {
                const stream = streams[i];

                expect(stream).to.matchPattern(TopStreamModel)
            }
    });

    it('GetVideos', async function () {
        const TopStreamModel = {
            animatedPreviewURL: _.isString,
            game: _.isObject,
            id: _.isString,
            lengthSeconds: _.isNumber,
            owner: _.isObject,
            previewThumbnailURL: _.isString,
            publishedAt: _.isString,
            self: _.isObject,
            title: _.isString,
            viewCount: _.isNumber,
            resourceRestriction: _.isNull,
            contentTags: _.isArray,
            __typename: _.isString
        };

            let data = await TwitchGQL.GetVideos(
                USERS[Math.round(Math.random() * (USERS.length - 1))]
            );
            let videos = data[0].data.user.videos.edges.map((i) => i.node);
            
            expect(videos.length).to.be.greaterThan(2);

            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];
                expect(video).to.matchPattern(TopStreamModel)
            }
    });

    it('GetPlaybackAccessToken', async function () {
        const PlaybackAccessTokenModel = {
            value: String,
            signature: String,
            __typename: String
        };

            let data = await TwitchGQL.GetPlaybackAccessToken(VIDEOS[0]);
            let playback_access_token = data[0].data.videoPlaybackAccessToken;
            
            expect(playback_access_token).to.matchPattern(PlaybackAccessTokenModel)
    });

    it('GetVideoMoments', async function () {
        const VideoMomentModel = {
            id: _.isString,
            durationMilliseconds: _.isNumber,
            positionMilliseconds: _.isNumber,
            type: _.isString,
            description: _.isString,
            thumbnailURL: _.isString,
            details: _.isObject,
            __typename: _.isString,
            video: _.isObject
        };
        const expectedLengths = {
            //  index:moments
            0: 0,
            1: 2,
        };


            for (let i = 0; i < VIDEOS.length; i++) {
                const video_id = VIDEOS[i];

                let data = await TwitchGQL.GetVideoMoments(video_id);
                let moments = data[0].data.video.moments.edges.map(
                    (i) => i.node
                );

                expect(moments).to.be.length(expectedLengths[i]);

                for (let i = 0; i < moments.length; i++) {
                    const moment = moments[i];
                    expect(moment).to.matchPattern(VideoMomentModel)
                }
            }
    });

    it('GetVideoMetadata', async function () {
        const VideoMetadataModel = {
            user: _.isObject,
            currentUser: _.isNull,
            video: {
                id: _.isString,
                title: _.isString,
                description: _.isString,
                previewThumbnailURL: _.isString,
                createdAt: _.isString,
                viewCount: _.isNumber,
                publishedAt: _.isString,
                lengthSeconds: _.isNumber,
                broadcastType: _.isString,
                owner: _.isObject,
                game: _.isObject,
                __typename: _.isString
            },
        };
            let data = await TwitchGQL.GetVideoMetadata(USERS[0], VIDEOS[0]);
            let video_metadata = data[0].data;
            
        expect(video_metadata).to.matchPattern(VideoMetadataModel)
    });
    
    it('GetDirectoryPageGame', async function () {
        const UserModel = {
            id: _.isString,
            name: _.isString,
            displayName: _.isString,
            streams: {
                edges: _.isArray,
                pageInfo: _.isObject,
                __typename: _.isString
            },
            __typename: _.isString
        };

            let opts = {
                "sortTypeIsRecency":false,
                "limit":100
            }
            const directorypagegame = await TwitchGQL.GetDirectoryPageGame("tom clancy's rainbow six siege", opts)

        expect(directorypagegame[0].data.game).to.matchPattern(UserModel)
    });

    it('GetLiveStatusNull', async function () {
        const status = await TwitchGQL.GetLiveStatus('d')
        expect(status).to.be.null
    });
});

describe('Queries', function () {

    it('GET_USER', async function () {
        const UserModel = {
            id: _.isString,
            login: _.isString,
            displayName: _.isString,
            description: _.isNull,
            createdAt: _.isString,
            roles: _.isObject,
            stream: _.isNull
        };
            let data = await TwitchGQL._SendQuery("GET_USER", {
                login: 'zaarrg',
            }, null, null, false, {}, false);
            const user = data.data.user;
            
        expect(user).to.matchPattern(UserModel)
    });

    it('DROPCAMPAIGNDETAILS', async function () {
        const UserModel = {
            id: String,
            name: String,
            owner: _.isObject,
            game: _.isObject,
            status: String,
            startAt: String,
            endAt: String,
            detailsURL: String,
            accountLinkURL: String,
            self: Object,
            __typename: String
        };

            const data = await TwitchGQL._SendQuery("ViewerDropsDashboard", {}, '', process.env.TWITCH_OAUTH_TOKEN, true, {}, false)
            const campaign = data[0].data.currentUser.dropCampaigns;

        expect(campaign[0]).to.matchPattern(UserModel)
    });

    it('INVENTORY', async function () {
        const UserModel = {
            id: String,
            inventory: {
                dropCampaignsInProgress: Array,
                gameEventDrops: Array,
                __typename: String
            },
            __typename: String
        };

            const Inventory = await TwitchGQL._SendQuery("Inventory", {}, '27f074f54ff74e0b05c8244ef2667180c2f911255e589ccd693a1a52ccca7367', process.env.TWITCH_OAUTH_TOKEN, true, {}, false)
            let user = Inventory[0].data.currentUser

        expect(user).to.matchPattern(UserModel)
    });
    
    it('Integrity', async function () {
        const UserModel = {
            data: _.isObject,
            extensions: _.isObject
        };

        let variable = {
            "input": {
                "channelID": "49891804",
                "claimID": "66d685be-daf6-44a5-b135-b0d7086592c8"
            }
        }
        const Claim = await TwitchGQL._SendQuery("ClaimCommunityPoints", variable, '46aaeebe02c99afdf4fc97c7c0cba964124bf6b0af229395f1f6d1feed05b3d0', process.env.TWITCH_OAUTH_TOKEN, true, {}, true)
        expect(Claim[0]).to.matchPattern(UserModel)
    });
});

describe('ERRORS', function () {
    it('Error Test', async function () {
        this.timeout(9000);
        await TwitchGQL.SetRetryTimeout(1000)

        try {
            await TwitchGQL._SendQuery("", {}, '', '', true)
            chai.should().fail("Query Should have failed...")
        } catch (e) {}

    });
});

