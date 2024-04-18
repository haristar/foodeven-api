import { Injectable ,Logger} from '@nestjs/common';
import * as winston from 'winston';
const  LokiTransport=require('winston-loki')
// const LokiTransport = require("winston-loki");

@Injectable()
export class LoggerService {
  logger=new Logger()
  constructor() {} 

  //logger using grafana credentials
  Loggly=winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports:[
        winston.add(
            new LokiTransport({
            host: process.env.GRAFFANA_URL,
            basicAuth:`${process.env.USER_ID}:${process.env.GRAFFANA_PASSWORD}`,
            json: true,
            labels: { app:'foodeven'},
            timeout: 5000,
            format: winston.format.json(),
            replaceTimestamp: true,
            })
        ),
    ]
})

  log(label,message) {
    this.logger.log(label,message)
    this.Loggly.info({message:message,labels:{origin:label}})
  }
  error(label,message) {
    this.logger.error(label,message)
    this.Loggly.error({message:message,label:{origin:label}});
    }
  debug(label,message) {
    this.logger.log('info',label,message)
  }
}
