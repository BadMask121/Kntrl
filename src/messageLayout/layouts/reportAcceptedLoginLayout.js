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
            "callback_id": "Killalert",
            "attachment_type": "default",
            "actions": [

                {
                    "name": "Killalert",
                    "text": "Send Kill Signal",
                    "type": "button",
                    "value": `${payload.ip}`
                },
                {
                    "name": "Banalert",
                    "text": "Ban Ip",
                    "type": "button",
                    "style": "danger",
                    "value": `${payload.ip}`,
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