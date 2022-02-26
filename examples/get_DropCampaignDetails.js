const TwitchGQL = require("..").Init();

(async () => {
    let opts = {}
    let activecampaings = []
    
    const DropCampaignDetails = await TwitchGQL._SendQuery("ViewerDropsDashboard", opts, '', process.env.TWITCH_OAUTH_TOKEN, true)
    let alldrops = DropCampaignDetails[0].data.currentUser.dropCampaigns
    
    console.log(alldrops[0])
    
    alldrops.forEach(e => {
        if (e.game.id === '490100') {
            activecampaings.push(e)
        }
    })
    
    activecampaings.forEach(e => {
        console.log(e.name)
    })
})();