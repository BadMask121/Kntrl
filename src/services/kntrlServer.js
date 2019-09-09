const fs = require('fs')
const readLine = require('readline')
const { normalizeFilePath } = require('../misc/helper')
const { fail2ban, journctl } = require('../../config')

/**
 * 
 * we will be writing a testing function to 
 *  get fail2ban and journalctl _SYSTEMD_UNIT = sshd.service | grep "Failed"
 * ip logs details
 * algorithm
 * 
 * 
 * we will be working with cento linux kernel 
 * 
 * and using the system journalctl to get all failed login attempts and all accepted login
 * attempts with below command
 * 
 * @command journalctl _SYSTEMD_UNIT = sshd.service | grep "Failed"
 * @command journalctl _SYSTEMD_UNIT = sshd.service | grep "Accepted"
 * 
 * and for  servers that has fail2ban we will be reading logs of banned ips from the default fail2ban
 * log location @command /var/log/fail2ban.log
 * 
 * but for testing we will be mocking the fail2banlog and server journctl logs with a .txt file we have
 * in root folder
 */





class kntrlServer {


    constructor() {


        this.serverSshStore = []
    }



    async readLines(FILE, LOG_TYPE) {

        const ipRegex = /\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b/
        const dateRegex = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/
        const timeRegex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/

        const fileStream = fs.createReadStream(FILE)
        const readL = readLine.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })

        let payload = []
        for await (const line of readL) {

            if (line.indexOf(LOG_TYPE) !== -1 || line.indexOf(LOG_TYPE) !== -1) {
                payload[LOG_TYPE] = {
                    ip: line.match(ipRegex)[0],
                    date: line.match(dateRegex)[0],
                    time: line.match(timeRegex)[0]
                }
                this.serverSshStore.push(...payload)
            }
        }

    }


    async init() {
        let fail2BanFile = null
        const journalctl_accepted = normalizeFilePath(`../${journctl.accepted}`)
        const journalctl_failed = normalizeFilePath(`../${journctl.failed}`)



        if (fail2ban.exists)
            fail2BanFile = normalizeFilePath(`../${fail2ban.location}`)

        if (fail2BanFile !== null && fs.existsSync(fail2BanFile)) {
            await this.readLines(fail2BanFile, 'Found')
        }


        (fs.existsSync(journalctl_accepted)) ? await this.readLines(journalctl_accepted, 'Accepted'): null(fs.existsSync(journalctl_failed)) ? await this.readLines(journalctl_failed, 'Ban') : null

        console.log(this.serverSshStore);
        return false
    }
}

module.exports = kntrlServer