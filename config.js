const dotenv = require('dotenv')
dotenv.config()

const env = process.env



module.exports = {

    /**
     * @var port specify the working server port
     */
    port: env.PORT,

    /**
     * @var SLACK_SIGNING_SECRET specify the slack signing secret for verfiication on slack
     */
    SLACK_SIGNING_SECRET: env.SLACK_SIGNING_SECRET,

    /**
     * @var SLACK_CLIENT_ID slack account id
     */
    SLACK_CLIENT_ID: env.SLACK_CLIENT_ID,

    /**
     * @var SLACK_CLIENT_SECRET slack account secret key
     */
    SLACK_CLIENT_SECRET: env.SLACK_SIGNING_SECRET,

    SLACK_OAUTH_ACCESS_TOKEN: env.SLACK_OAUTH_ACCESS_TOKEN,


    // url for posting message to slack
    SLACK_POST_MESSAGE: 'https://slack.com/api/chat.postMessage'
}