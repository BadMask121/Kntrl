module.exports.reportToSlackMessage = (payload) => {
    return {
        type: 'mrkdwn',
        attachments: [
            {
                title: payload.title,
                "title_link": "https://divergent.ng",
                text: payload.text,
                "color": "#7CD197"
            }
        ]
    }
}