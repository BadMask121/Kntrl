const reportToSlackMessageLayout = require('./layouts/reportToSlackMessageLayout')
const reportFailedLoginLayout = require('./layouts/reportFailedLoginLayout')
const reportAcceptedLoginLayout = require('./layouts/reportAcceptedLoginLayout')
const enterServerPasswordMessageLayout = require('./layouts/enterServerPasswordMessageLayout')


module.exports = {
    // dialogMessage,
    reportToSlackMessageLayout,
    reportFailedLoginLayout,
    reportAcceptedLoginLayout,
    enterServerPasswordMessageLayout
}