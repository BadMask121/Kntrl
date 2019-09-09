const assert = require('chai').assert
const expect = require('chai').expect

const kntrlServer = require('../../src/services/kntrlServer')

it('Return Log from fail2banexample file ', () => {
    const serverLog = new kntrlServer()

    assert.isTrue(serverLog.init(), true)
});