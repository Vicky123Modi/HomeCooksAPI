/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://strapi:Strapi#9012@178.128.20.185:27017/HomeCooks171?authSource=admin'
        // uri: 'mongodb://localhost:27017/HomeCooks'
    },

    FbAPP: {
        AppId: '566200570964800',
        AppSecret: '8d50d318ccbbcac250b0aba336653326',
        callbackURL: 'https://fblive.thevelocitee.com:9000/api/Oauths/facebook/callback',
        successURL: 'https://fblive.thevelocitee.com/connect/facebook',
        failURL: 'https://fblive.thevelocitee.com/login',
        Base_API_URL: 'https://graph.facebook.com',
        scope: ['pages_show_list'
            , 'pages_manage_metadata'
            , 'pages_manage_posts'
            , 'pages_read_engagement'
            , 'pages_read_user_content'
            , 'pages_messaging'
        ]
    },

// Seed database on startup
    seedDB: true,
};
