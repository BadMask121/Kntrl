const fs = require('fs'),
    path = require('path');
      
const readLine = require('readline')
const {
    walkDir,
    hmsToSecondsOnly,
    getMilliSeconds
} = require('../misc/helper')
const {
    journctl,
    redis,
    REDIS_KEY
} = require('../../config')

let fileWatcher = require('filewatcher')
let fw = fileWatcher()
const $ = require('yargs')
const _ = require('node-cmd')


const KntrlBot = require('../controllers/kntrlBot')
const kntrl = new KntrlBot()

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
 * @command journalctl_SYSTEMD_UNIT = sshd.service | grep "Accepted"
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
        this.journctl = journctl.command
    }

    /**
     * 
     * first to filter the logs we need to first check if journal log date in miliseconds
     * already exists in mem cache if it doesnt scrap get new access login log 
     * and set memcache time in miliseconds
     */

    async filterJournalLog(DATA, LOG_TYPE) {
        let payload = []
        const ipRegex = /\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b/
        const timeRegex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/
        Date.shortMonths = [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ];

    
        const ip = DATA.match(ipRegex)[0]
        const time = DATA.match(timeRegex)[0]

        // get date backwards from the position of time
        let date = DATA.substr(DATA.indexOf(time) - 7, DATA.indexOf(time)).trim()
     
        //get current year as year is not set in journal log we fix in our our year which is the current year
        let dateCurrent = new Date()
        let year = parseInt(dateCurrent.getFullYear())

        // short month e.g Jan, Feb from log
        let shortMonth = date.substring(0, 3) 

        // get day int from log
        let day = parseInt(date.substring(4, date.length))
        
         // storing month in integer 
        let monthInInt = null

        Date.shortMonths.forEach((element, index) => {
            // adding + 1 to complete the month
            if (element === shortMonth)
                monthInInt = parseInt(index + 1)
        });
        
        
        if (
            typeof year !== "number"
            || typeof monthInInt !== "number"
            || typeof day !== "number"
        ) 
            return []

            
        
        const getDateFromLog = new Date(year, monthInInt, day)
       
        // cache our activity time to avoid repeating alerts
        let miliSecondsOfActivityTime = getMilliSeconds(hmsToSecondsOnly(time)) + getDateFromLog.getTime()
        
        let cachedActivityTime = await redis
                                .getAsync(REDIS_KEY)
            
            // check if our current cache time is equal to our recent activity time
            // eslint-disable-next-line radix
            if (parseInt(cachedActivityTime) === miliSecondsOfActivityTime) 
                return []
            
                
        
        await redis
            .setAsync(REDIS_KEY, miliSecondsOfActivityTime)
        
        // reformating date to yyyy-mm-dd
        date = `${year}-${monthInInt}-${day}`

        // gather our payload
        payload = {
            ip,
            time,
            date,
            LOG_TYPE
        }
        // push to global store if activity is new 
        this.serverSshStore.push(payload)

    return this.serverSshStore
    }



    async Fail2BanReadLines(FILE, LOG_TYPE) {

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



    /**
     * 
     * we will be getting our journal ssh login logs on @var config.journal and watch the changes to the files
     * so we can track the ssh activities
     */
    init() {
        
        if (!fs.existsSync(journctl.location))
            return false

        /**
         * recursively read and register all journal logs to be watched by fileWatcher
         */
        walkDir(journctl.location, (filePath) => {
            fw.add(filePath)
        });

           // on file journal folder files change the file last ssh login activity 
        fw.on('change', (file, stat) => {
            // run bash journal log command on host machine to retrieve failed or accepted ssh login
            _.get(
                this.journctl,
                (err, data, stderr) => {
                    
                    /**
                     * @var filterJournalLog will return the ip,time, date and log_type specified
                     * 
                     * format [{
                            ip: '66.154.110.198',
                            time: '23:11:43',
                            date: 'Sep 08 ',
                            LOG_TYPE: 'Failed'
                        }]
                    */

                    let value = null
                    Object.keys(journctl.type)
                        .forEach((val) =>{
                            value = journctl.type[val]
                               // eslint-disable-next-line no-magic-numbers
                               if (data.indexOf(value) !== -1)
                                    kntrl.reportToSlack(this.filterJournalLog(data, value))
                        })
                   
                }
            );

        })

        /**
         * 
         * we will be enabling fail2ban feature when journal log system works file
         */

        // let fail2BanFile = null



        // if (fail2ban.exists)
        //     fail2BanFile = normalizeFilePath(`../${fail2ban.location}`)

        // if (fail2BanFile !== null && fs.existsSync(fail2BanFile)) {
        //     await this.readLines(fail2BanFile, 'Found')
        // }


        // console.log(this.serverSshStore);
        
        return false
    }
}

module.exports = kntrlServer