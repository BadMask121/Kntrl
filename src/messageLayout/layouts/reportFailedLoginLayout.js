const {
    icon,
    reportToKntrl
} = require('../../misc/constants')

const {info} = reportToKntrl.FAILED
const iconSelect = icon.FIRE
const title = `${reportToKntrl.FAILED.title} ${iconSelect}`

module.exports = function reportFailedLoginLayout (payload) {

    const text = `*${payload.date} ${payload.time}* ${info} *${payload.ip}* on *${payload.user}*`

    return {
        type: 'mrkdwn',
        attachments: [
            {
                title,
                "title_link": "https://divergent.ng",
                text,
                "color": "#7CD197"
            }
        ]
    }
}