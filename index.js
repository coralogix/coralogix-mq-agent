

var Coralogix = require("coralogix-logger");

// global confing for application name, private key, subsystem name
const config = new Coralogix.LoggerConfig({
    applicationName: process.env.APPLICATION_NAME,
    privateKey: process.env.PRIVATE_KEY,
    subsystemName: process.env.SUBSYSTEM,
});

Coralogix.CoralogixLogger.configure(config);

// create a new logger with category
const logger = new Coralogix.CoralogixLogger("queues"); 
var http = require('https');
username = process.env.RABBITMQ_USERNAME;
password = process.env.RABBITMQ_PASSWORD;
rabbitUrl = process.env.RABBITMQ_FQDN;
auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");


exports.handler =  function(event) {
      const queuePromise = new Promise(function(resolve, reject){
          const options = {
              headers: {
                'Authorization' : auth
              }
            }
            url = rabbitUrl+'/api/queues';
            http.get(url, options, function(res) {
              res.on('data', function(body){
              const b = JSON.parse(body);
              const jsonRes = [];
              b.forEach(element => {
                  element['endpoint'] = 'queues';
                  const log = new Coralogix.Log({
                      severity: Coralogix.Severity.info,
                      text: element    
                      });
                  jsonRes.push(log);             
              });              
                          resolve(jsonRes);
                      });
            });
        });
      const overviewPromise = new Promise(function(resolve, reject){
          const options = {
              headers: {
                'Authorization' : auth
              }
          }
        url = rabbitUrl+'/api/overview'
        http.get(url, options, function(res) {
          res.on('data', function(body){
                const jsonBody = JSON.parse(body);
                jsonBody['endpoint'] = 'overview';
                delete jsonBody.listeners;  //Removing cause it generate bad record
                const log = new Coralogix.Log({
                    severity: Coralogix.Severity.info,
                    text: jsonBody
                  })
              resolve(log);
          })
        });
      })

        Promise.all([queuePromise, overviewPromise])
          .then(data => {
              // Element 0 us queuePromise data
              const logAll = data[0];
            logAll.push(data[1]);     
            logAll.forEach(element => {
                logger.addLog(element);
                //console.log(element);
            });             
          });
};


