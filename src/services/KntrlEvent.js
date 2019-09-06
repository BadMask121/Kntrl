const events = require('events')
const {
    eventRegistryFlag
} = require('../misc/constants').flags
const {triggerServerMessage} = require('./events/eventRegistry')

const eventEmitter = new events.EventEmitter()



class KntrlEvent {
    constructor() {
        eventEmitter.on(eventRegistryFlag.SERVER_MESSAGE, triggerServerMessage)
    }


    triggerServerMessage() {
        eventEmitter.emit(eventRegistryFlag.SERVER_MESSAGE)
    }

}
module.exports = KntrlEvent