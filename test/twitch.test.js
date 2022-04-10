// const { test, expect, describe } = require("@jest/globals");

const TwitchGQL = require("../index").Init();
const chai = require('chai');
const chaiMatchPattern = require('chai-match-pattern');
const expect = chai.expect;
const _ = chaiMatchPattern.getLodashModule();
chai.use(chaiMatchPattern);
const USERS = ["XQCOW"];
const VIDEOS = ["132195945", "1121890940"];
const CLIPS = ["OutstandingUninterestedNewtCeilingCat-hY-I9SEIwIbTitYJ"];


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
                description: _.isString,
                createdAt: _.isString,
                roles: {
                    isPartner: _.isBoolean,
                },
                stream: _.isNull || _.isObject
            };
            
            let data = await TwitchGQL.GetUser(
                USERS[Math.round(Math.random() * (USERS.length - 1))]
            );
            chai.expect(data.data.user).to.matchPattern(UserModel);
        });


    it('GetTopStreams', async function () {
        const TopStreamModel = {
            id: _.isString,
            title: _.isString,
            viewersCount: _.isNumber,
            language: _.isString,
            broadcaster: {
                displayName: _.isString,
            },
            tags: _.isArray,
            game: {
                name: _.isString,
            },
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
            game: {
                boxArtURL: _.isString,
                id: _.isString,
                displayName: _.isString,
                name: _.isString,
                __typename: _.isString
            },
            id: _.isString,
            lengthSeconds: _.isNumber,
            owner: {
                displayName: _.isString,
                id: _.isString,
                login: _.isString,
                profileImageURL: _.isString,
                primaryColorHex: _.isString,
                __typename: _.isString
            },
            previewThumbnailURL: _.isString,
            publishedAt: _.isString,
            self: {
                isRestricted: _.isBoolean,
                viewingHistory: _.isNull || _.isArray,
                __typename: _.isString
            },
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
            video: {
                id: _.isString,
                lengthSeconds: _.isNumber,
                __typename: _.isString
            },

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
            user: {
                id: _.isString,
                primaryColorHex: _.isString,
                isPartner: _.isBoolean,
                profileImageURL: _.isString,
                lastBroadcast: _.isObject,
                __typename: _.isString
            },
            currentUser: _.isNull,
            video: {
                id: _.isString,
                title: _.isString,
                description: _.isString,
                previewThumbnailURL: _.isString,
                createdAt: _.isString,
                viewCount: _.isNumber,
                publishedAt: _.isString,
                viewCount: _.isNumber,
                publishedAt: _.isString,
                lengthSeconds: _.isNumber,
                broadcastType: _.isString,
                owner: {
                    id: _.isString,
                    login: _.isString,
                    displayName: _.isString,
                    __typename: _.isString
                },
                game: {
                    id: _.isString,
                    boxArtURL: _.isString,
                    name: _.isString,
                    displayName: _.isString,
                    __typename: _.isString
                },
                __typename: _.isString
            },
        };
            let data = await TwitchGQL.GetVideoMetadata(USERS[0], VIDEOS[0]);
            let video_metadata = data[0].data;
            
        expect(video_metadata).to.matchPattern(VideoMetadataModel)
    });

    it('GetChatClip', async function () {
        const ChatClipModel = {
            id: _.isString,
            videoOffsetSeconds: _.isNumber,
            durationSeconds: _.isNumber,
            video: {
                id: _.isString,
                __typename: _.isString
            },
            __typename: _.isString
        };

            let data = await TwitchGQL.GetChatClip(CLIPS[0]);
            let clip = data[0].data.clip;

        expect(clip).to.matchPattern(ChatClipModel)
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
            description: _.isString,
            createdAt: _.isString,
            roles: {
                isPartner: _.isBoolean,
            },
            stream: _.isNull || _.isObject
        };
            let data = await TwitchGQL._SendQuery("GET_USER", {
                login: USERS[Math.round(Math.random() * (USERS.length - 1))],
            });
            const user = data.data.user;
            
        expect(user).to.matchPattern(UserModel)
    });

    it('DROPCAMPAIGNDETAILS', async function () {
        const UserModel = {
            id: String,
            name: String,
            owner: {
                id: String,
                name: String,
                __typename: String
            },
            game: {
                id: String,
                displayName: String,
                boxArtURL: String,
                __typename: String
            },
            status: String,
            startAt: String,
            endAt: String,
            detailsURL: String,
            accountLinkURL: String,
            self: Object,
            __typename: String
        };

            const data = await TwitchGQL._SendQuery("ViewerDropsDashboard", {}, '', process.env.TWITCH_OAUTH_TOKEN, true)
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

            const Inventory = await TwitchGQL._SendQuery("Inventory", {}, '27f074f54ff74e0b05c8244ef2667180c2f911255e589ccd693a1a52ccca7367', process.env.TWITCH_OAUTH_TOKEN, true)
            let user = Inventory[0].data.currentUser

        expect(user).to.matchPattern(UserModel)
    });
});

describe('ERRORS', function () {
    it('Error Test', async function () {
        this.timeout(8000);
        await TwitchGQL.SetRetryTimeout(1000)

        try {
            await TwitchGQL._SendQuery("", {}, '', '', true)
            chai.should().fail("Query Should have failed...")
        } catch (e) {}

    });
});

