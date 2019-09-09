
const redis = require('./src/services/redisClient')

const dotenv = require('dotenv')
dotenv.config()

const env = process.env



String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

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
    SLACK_POST_MESSAGE: 'https://slack.com/api/chat.postMessage',


    /**
     *  custom fail2ban setting for scraping ssh login access logs
     *   the location for fail2ban will change once we start interaction with server\
     *      for testing we are using a mock .txt file
     *  */
    fail2ban: {
        exists: true,
        location: './fail2banexample.txt'
    },

    /**
     * custom journctl setting
     for scraping ssh login access logs
     *   the location for fail2ban will change once we start interaction with server\
     *      for testing we are using a mock .txt file
     * '/var/log/journal'
     *  */
    journctl: {
        location: env.KNTRL_JOURNAL_LOG,
        type: {
            ACCEPTED: "Accepted",
            FAILED: "Failed",
            FAILURE: "Failure"
        },
        command: env.KNTRL_JOURNAL_COMMAND
    },

    redis,

    REDIS_URL: env.REDIS_URL,

    REDIS_KEY: env.REDIS_KEY
}