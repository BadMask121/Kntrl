const crypto = require('crypto');
const timingSafeCompare = require('tsscmp');
const path = require('path')


const {
    SLACK_SIGNING_SECRET
} = require('../../config')

const isVerified = (req) => {
    const signature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const hmac = crypto.createHmac('sha256', SLACK_SIGNING_SECRET);
    const [
        version,
        hash
    ] = signature.split('=');

    // check if the timestamp is too old
    const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
    if (timestamp < fiveMinutesAgo) return false;

    hmac.update(`${version}:${timestamp}:${req.rawBody}`);

    // check that the request signature matches expected value
    return timingSafeCompare(hmac.digest('hex'), hash);
};


function normalizeFilePath(FILE) {
    return path.normalize(path.resolve(FILE))
}

function filterAcceptedIp() {

}

function filterBanIp() {

}

module.exports = {
    isVerified,
    normalizeFilePath,
    filterAcceptedIp,
    filterBanIp
};