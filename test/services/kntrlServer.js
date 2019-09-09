const assert = require('chai').assert
const expect = require('chai').expect

const kntrlServer = require('../../src/services/kntrlServer')


const serverLog = new kntrlServer()

it('Return Log from fail2banexample file ', () => {
    assert.isTrue(serverLog.init(), true)
});

it('filterJournalLog', async() => {
    console.log('====================================');
    console.log(await serverLog.filterJournalLog('Sep 04 10:52:23 vps sshd[23577]: Accepted password for root from 209.58.139.34 port 64667 ssh2', 'Accepted'));
    console.log('====================================');
});