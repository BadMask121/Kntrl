/* eslint-disable camelcase */
const dialogData = (payload) => {
    return {
            token: payload.token,
            trigger_id: `${payload.trigger_id}`,
            dialog: JSON.stringify({
                title: 'Confirm server password',
                callback_id: 'KillConfirm',
                submit_label: 'KillSession',
                state: `${payload.ip}`,
                elements: [
                    {
                        label: 'Enter server password',
                        type: 'text',
                        name: 'KillConfirm',
                        value: '',
                        placeholder: "**********",
                        min_length: 5,
                        hint: `Kntrl will kill this ${payload.ip} session on server`
                    }
                ],
                actions: [
                    {
                        "name": "cancel",
                        "text": "Cancel",
                        "type": "button",
                        "value": "cancel"
                    },
                    {
                        "name": "kill",
                        "text": "Kill",
                        "type": "button",
                        "value": `${payload.ip}`
                    }
                ]
            })
   }
};

module.exports = dialogData