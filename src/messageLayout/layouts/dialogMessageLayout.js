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