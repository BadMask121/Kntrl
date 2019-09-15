const assert = require('chai').assert
const expect = require('chai').expect

const kntrlServer = require('../../src/services/kntrlServer')
const KntrolBot = require('../../src/controllers/kntrlBot')

const kntrl = new KntrolBot()

const serverLog = new kntrlServer()

it('Return Log from fail2banexample file ', () => {
    assert.isTrue(serverLog.init(), true)
});

it('filterJournalLog', async() => {
    const filter = await serverLog.filterJournalLog('Sep 01 10:52:23 vps sshd[23577]: Accepted password for root from 209.58.139.34 port 64667 ssh2', 'Accepted')
    expect(filter).to.not.be.empty;
});

it('Test Sending Ssh Login Activity Report To Slack', () => {
   
    //testing
    const report = kntrl.reportToSlack([
            {
                ip: '66.154.110.198',
                time: '23:11:43',
                date: 'Sep 08 ',
                LOG_TYPE: 'Accepted'
            }
    ])

    assert.isTrue(report);
});