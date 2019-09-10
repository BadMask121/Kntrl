const express = require('express');
const bodyParser = require('body-parser')

const {
    port
} = require('../config')


const KntrlBot = require('./controllers/kntrlBot')
const KntrlServer = require('./services/kntrlServer')

const app = express()
const kntrl = new KntrlBot()

const kntrlServer = new KntrlServer()
kntrlServer.init()

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

app.post('/', kntrl.mainKntrlBot)
app.post('/slack/event', kntrl.eventVerification)

const server = app.listen(port, () => {
    console.log("Server Started on port " + server.address().port)
})