const axios = require('axios')
const {isVerified} = require('../misc/helper')
const KntrlEvent = require('../services/KntrlEvent')
const {SLACK_OAUTH_ACCESS_TOKEN,SLACK_POST_MESSAGE} = require('../../config')

const kntrlServerMessage = new KntrlEvent()

module.exports.kntrlBot = (req, res) => {

    const {
        token,
        text
    } = req.body
    
    if (!isVerified(req))
        return res.sendStatus(404)

    return res.json("hello")
}


const dialogData = {
    token: SLACK_OAUTH_ACCESS_TOKEN,
    trigger_id: 'sds',
    dialog: JSON.stringify({
        title: 'Save it to ClipIt!',
        callback_id: 'clipit',
        submit_label: 'ClipIt',
        elements: [{
                label: 'Message Text',
                type: 'textarea',
                name: 'message',
                value: 'ds'
            },
            {
                label: 'Importance',
                type: 'select',
                name: 'importance',
                value: 'Medium 💎',
                options: [{
                        label: 'High',
                        value: 'High 💎💎✨'
                    },
                    {
                        label: 'Medium',
                        value: 'Medium 💎'
                    },
                    {
                        label: 'Low',
                        value: 'Low ⚪️'
                    }
                ],
            },
        ]
    })
};

const header = {
    'Authorization': `Bearer ${SLACK_OAUTH_ACCESS_TOKEN}`
}

// open the dialog by calling the dialogs.open method and sending the payload
axios.post(
    SLACK_POST_MESSAGE,
    dialogData,
    header
    )
    .then((result) => {
       console.log('====================================');
       console.log(result.data);
       console.log('====================================');
    })
    .catch((err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        // res.sendStatus(500);
    });