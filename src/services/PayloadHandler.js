/* eslint-disable global-require */
const {KNTRL_URL_ACCESS, commands} = require('../misc/constants')
const {
    enterServerPasswordMessageLayout
} = require('../messageLayout/KntrlBotMessageStore')

const escape = require('lodash.escaperegexp')
const _ = require('node-cmd')
const Promise = require('bluebird')

const getAsync = Promise.promisify(_.get, {
    multiArgs: true,
    context: _
})

class PayloadHandler {
 


    actionBasedMessage(payload) {
        const KntrlBot = require('../controllers/kntrlBot')

        if (typeof payload.actions !== "undefined") {
            const action = payload.actions
            payload.ip = action.value
        }
        

        const {
            sendPostMessageToKntrlSlack
        } = new KntrlBot()

            switch (payload.callback_id) {
                
                case 'Killalert':
                        sendPostMessageToKntrlSlack(enterServerPasswordMessageLayout(payload), KNTRL_URL_ACCESS.dialogMessage)
                        break; 
                case 'Banalert':
                    this.banSignal(payload) 
                        break; 
                case 'KillConfirm':
                    this.killSignal(payload)
                        break;
                default:
                    
                    break; 
            } 
    } 
    

    killSignal(payload) {

        if (payload.submission === null)
                return false
        
        const sudoPassword = payload.submission.KillConfirm

        // console.log(escape(`"${sudoPassword}"`));
        
        getAsync(commands({
            password: sudoPassword,
            ip: payload.state
        }).getPts)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        
            return
    }

    banSignal(action) {

        if (action.value !== null)
            return
    }
        
    requestPayloadFactory(payload) {
        
        payload = JSON.parse(payload) 

        if (typeof payload.actions !== "undefined" && typeof payload.callback_id !== "undefined") {
            payload.actions 
                .forEach(element => {

                    let actions = element
                        payload.actions = actions                         
                            this.actionBasedMessage(payload) 
                }) 
        }else
            this.actionBasedMessage(payload)
    }
}

module.exports = PayloadHandler