/* eslint-disable global-require */
const {KNTRL_URL_ACCESS} = require('../misc/constants')
const {
    enterServerPasswordMessageLayout
} = require('../messageLayout/KntrlBotMessageStore')




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
                    console.log(payload);
    
                    this.killSignal(payload)
                        break;
                default:
                    
                    break; 
            } 
    } 
    

    killSignal(action) {

        if (action.value !== null)
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