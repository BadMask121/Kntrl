const axios = require('axios')
const {isVerified} = require('../misc/helper')
const {
    error,
} = require('../misc/constants')

const {
    KNTRL_DEFAULT_SLACK_CHANNEL,
    SLACK_BOT_ACCESS_TOKEN,
    journctl
} = require('../../config')

const {
    reportAcceptedLoginLayout,
    reportFailedLoginLayout
} = require('../messageLayout/KntrlBotMessageStore')

class KntrlBot {

    // starting up event Verification for slack
    eventVerification (req, res) {
        const payload = req.body
        const {
            challenge
        } = payload

        const data = {
            challenge
        }

        return res.json(data)
    }


    // main kntrl Bot controller for interacting with our slack bot and user
    mainKntrlBot(req, res) {
        const {
             token,
             text
             } = req.body

        if (!isVerified(req))
            return res.sendStatus(error.NOT_FOUND.code)

        return res.json("hello")
    }


    // send ssh activities to slack bot
    reportToSlack(payload) {
        payload
            .then((data) => {

                if (!(data instanceof Array) || data === [])
                    return false
                
                let message = null
                
                data.forEach((element) => {
                    switch (element.LOG_TYPE) {
                        case journctl.type.ACCEPTED:
                            message = reportAcceptedLoginLayout(element)
                            break;

                        case journctl.type.FAILED:
                            message = reportFailedLoginLayout(element)
                            break;

                        default:
                            break;
                    }

                    if (this.sendPostMessageToKntrlSlack(message))
                        return true
                })

                return false
            })
            .catch(err => {
                console.log(err);
            })
        
        return false
    }

    // make request to slack
    sendPostMessageToKntrlSlack(message) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SLACK_BOT_ACCESS_TOKEN}`
        }

        if (!(KNTRL_DEFAULT_SLACK_CHANNEL instanceof Array)) {
             return false
        }

        KNTRL_DEFAULT_SLACK_CHANNEL
            .forEach(element => {
                axios.post(
                        element,
                        message, {
                            headers
                        }
                    )
                    .then((res) => {
                        if (res.data === 'ok')
                            return true
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
           
        return false
    }
}

module.exports = KntrlBot