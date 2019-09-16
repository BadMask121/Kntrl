
module.exports = {

    error: {
        NOT_FOUND: {
            code: 404,
            message: "Request not found"
        }
    },
    flags: {
        eventRegistryFlag: {
            SERVER_MESSAGE: 'serverMessage',
        }
    },
    icon: {
        ANGER: ':anger:',
        SMILE: ':smile:',
        GHOST: ':ghost:',
        FIRE: '🔥'
    },
    reportToKntrl: {
        ACCEPTED: {
            info: `logged into`,
            title: 'Kntrl Intruder Alert'
           
        },
        FAILED: {
            info: `intruder alert from`,
            title: 'Kntrl Intruder Alert'
        }
    },
    KNTRL_URL_ACCESS: {
        postMessage: "postMessage",
        dialogMessage: "dialogMessage"
    },
    commands : (cmd) => {
        return {
            getPts: `echo "${cmd.password}" | sudo - S - k who | grep ${cmd.ip} | grep pts | awk '{print $2}'`
        }
    }
}