
const {
    icon,
    reportToKntrl
} = require('../../misc/constants')
    
const {info} = reportToKntrl.ACCEPTED
const iconSelect = icon.GHOST
const title = `${reportToKntrl.ACCEPTED.title} ${iconSelect}`

module.exports = function reportAcceptedLoginLayout (payload) {

    const text = `*${payload.date} ${payload.time}* ${info} *${payload.user}* by *${payload.ip}*`

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