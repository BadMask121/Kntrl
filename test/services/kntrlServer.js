const assert = require('chai').assert
const expect = require('chai').expect

const kntrlServer = require('../../src/services/kntrlServer')

it('Return Log from fail2banexample file ', () => {
    const serverLog = new kntrlServer()
    serverLog.init()
    
    // assert.isTrue(serverLog.init(), true)
});