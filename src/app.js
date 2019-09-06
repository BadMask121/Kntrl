const express = require('express');
const bodyParser = require('body-parser')

const {
    port,
    SLACK_OAUTH_ACCESS_TOKEN,
    SLACK_POST_MESSAGE
} = require('../config')


const { eventVerification } = require('./controllers/events/eventVerification')
const {kntrlBot} = require('./controllers/kntrlBot')

const app = express()




/**
 * 
 * make express use body parsers and other middlewares
 */
const rawBodyBuffer = (req, _res, buf, encoding) => {
    if (buf && buf.length)
        req.rawBody = buf.toString(encoding || 'utf8');
};

app.use(bodyParser.urlencoded({
    verify: rawBodyBuffer,
    extended: true
}));
app.use(bodyParser.json({
    verify: rawBodyBuffer
}));


/**
 * controllers and router communication (endpoints)
 */

app.post('/', kntrlBot)

app.post('/slack/event', eventVerification)





const server = app.listen(port, () => {
    console.log("Server Started on port " + server.address().port)
})