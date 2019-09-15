const crypto = require('crypto');
const timingSafeCompare = require('tsscmp');
const path = require('path')
const fs = require('fs')


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


/**
 * 
 * @param {*} dir 
 * @param {*} callback 
 */
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        let dirPath = path.join(dir, file);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        
        isDirectory
            ? walkDir(dirPath, callback) : callback(path.join(dir, file));
    });
}

function normalizeFilePath(FILE) {
    return path.normalize(path.resolve(FILE))
}

function hmsToSecondsOnly(str) {
    let p = str.split(':'),
        s = 0,
        m = 1

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

function getMilliSeconds(num) {
    return num * 1000
}

module.exports = {
    isVerified,
    normalizeFilePath,
    walkDir,
    hmsToSecondsOnly,
    getMilliSeconds
};