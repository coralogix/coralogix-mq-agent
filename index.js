var Coralogix = require("coralogix-logger");
const axios = require('axios');
const { LoggerConfig } = require("coralogix-logger");
const endpoint = ['all'];
const username = process.env.RABBITMQ_USERNAME;
const password = process.env.RABBITMQ_PASSWORD;
const rabbitUrl = process.env.RABBITMQ_FQDN;
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

const config = new Coralogix.LoggerConfig({
    applicationName: process.env.APPLICATION_NAME,
    privateKey: process.env.PRIVATE_KEY,
    subsystemName: process.env.SUBSYSTEM,
});

Coralogix.CoralogixLogger.configure(config);

// create a new logger with category
const logger = new Coralogix.CoralogixLogger(); 

exports.handler =  function(event) {
        const getQueues = async () => {
            try {
                const resp = await axios.get(rabbitUrl+'/api/queues', {
                    headers: {
                'Authorization': `Basic ${token}`
                },
                });
                resp.data.forEach(element => {
                    element['endpoint'] = 'queues';
                    const log = new Coralogix.Log({
                        severity: Coralogix.Severity.info,
                        text: element    
                        });
                    logger.addLog(log);
                });  
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        const getOverview = async () => {
            try {
                const resp = await axios.get(rabbitUrl+'/api/overview', {
                    headers: {
                'Authorization': `Basic ${token}`
                },
                });
                resp.data['endpoint'] = 'overview';
                delete resp.data.listeners;  //Removing cause it generate bad record
                const log = new Coralogix.Log({
                    severity: Coralogix.Severity.info,
                    text: resp.data
                    });
                logger.addLog(log);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };


        if(endpoint.includes('queues')){
            getQueues();
        };
        if(endpoint.includes('overview')){
            getOverview();
        };

        if(endpoint.includes('all')){
            getQueues();
            getOverview();
        };
    };
