const axios = require('axios')
const { isVerified } = require('../misc/helper')
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



const PayloadHandler = require('../services/PayloadHandler')
class KntrlBot {


    // starting up event Verification for slack
    eventVerification(req, res) {

        const payload = req.body
        const {
            challenge
        } = payload

        const data = {
            challenge
        }

        return res.json(data)
    }



    /**
     * 
     * @param {
     * token: 
         team_id: ,
         team_domain: '
         channel_id: 
         channel_name: 'privategroup',
         user_id: 
         user_name: 
         command: '/kntrl',
         text: 
     }
     req
     * @param {*} res 
     */
    // main kntrl Bot controller for interacting with our slack bot and user
    mainKntrlBot(req, res) {
        const {
            token,
            text,
            channel_id
        } = req.body


        const payload = new PayloadHandler()

        if (!isVerified(req))
            return res.sendStatus(error.NOT_FOUND.code)

        if (typeof req.body.payload !== "undefined")
            payload.requestPayloadFactory(req.body.payload)
            
        return false
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

                    if (this.sendPostMessageToKntrlSlack(message, 'postMessage'))
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
    sendPostMessageToKntrlSlack(message, type) {

        const headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${SLACK_BOT_ACCESS_TOKEN}`
        }

        if (!(KNTRL_DEFAULT_SLACK_CHANNEL instanceof Array)) {
            return false
        }

        KNTRL_DEFAULT_SLACK_CHANNEL
            .forEach(element => {
                
                if (element.hasOwnProperty(type)) {
                    axios.post(
                        element[type],
                        message, {
                        headers
                        }
                    )
                    .then((res) => {
                            if (res.data === 'ok')
                                return res.data
                        })
                    .catch((err) => {
                        console.log(err);
                    });       
                }
            })

        return false
    }
}

module.exports = KntrlBot