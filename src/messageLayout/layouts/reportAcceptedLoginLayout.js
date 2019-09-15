const {
    icon,
    reportToKntrl
} = require('../../misc/constants')

const { info } = reportToKntrl.ACCEPTED
const iconSelect = icon.GHOST
const title = `${reportToKntrl.ACCEPTED.title} ${iconSelect}`

module.exports = function reportAcceptedLoginLayout(payload) {

    const text = `*${payload.date} ${payload.time}* ${info} *${payload.user}* by *${payload.ip}*`

    return {
        type: 'mrkdwn',
        attachments: [{
            title,
            "title_link": "https://divergent.ng",
            text,
            "color": "#7CD197",
            "callback_id": "accepted_alert",
            "attachment_type": "default",
            "actions": [

                {
                    "name": "alert",
                    "text": "Send Kill Signal",
                    "type": "button",
                    "value": "accept"
                },
                {
                    "name": "alert",
                    "text": "Ban Ip",
                    "type": "button",
                    "value": "accept",
                    "style": "danger",
                    "value": "ban",
                    "confirm": {
                        "tile": `Are you sure you want to ban *${payload.ip}*`,
                        "text": `*${payload.ip}* is an alien huh? `,
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }

            ]
        }]
    }
}