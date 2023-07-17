// import { Module } from '@nestjs/common';
// import { WinstonModule } from 'nest-winston';
// // import * as winston from 'winston';
// import { format } from 'winston';
// const { combine, timestamp, printf, label, colorize } = format;
// const logFormat = printf((info) => {
//   return `${info.timestamp} [${info.level}] : ${info.message}`;
// });
// import * as DailyRotateFile from 'winston-daily-rotate-file';

// @Module({
//   imports: [
//     WinstonModule.forRootAsync({
//       useFactory: () => ({
//         transports: [
//           new DailyRotateFile({
//             level: 'debug',
//             dirname: 'logs',
//             filename: `%DATE%.log`,
//             datePattern: 'YYYY-MM-DD',
//             zippedArchive: true,
//             maxFiles: '10d',
//             format: combine(
//               label({ label: '[my-server]' }),
//               timestamp({
//                 format: 'YYYY-MM-DD HH:mm:ss',
//               }),
//               colorize(),
//               printf(
//                 (info) =>
//                   `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
//               ),
//             ),
//             // json: true,
//           }),

//         ],
//       }),
//     }),
//   ],
// })
// export class LoggerService { }
import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, label, json, colorize } = format;
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as WinstonCloudWatch from 'winston-cloudwatch';

@Injectable()
export class LoggerService {
  private readonly logger;

  constructor() {
    const transport = new DailyRotateFile({
      dirname: 'logs',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '10d',
    });

    const logFormat = combine(
      label({ label: 'delivery-service' }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      json(),
    );

    const consoleOptions = {
      level: 'info',
      format: combine(
        colorize(),
        label({ label: '[delivery-service]' }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        printf(
          (info) =>
            `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
        ),
      ),
    };

    let transportList;
    console.log('환경변수 : ', process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'local') {
      transportList = [transport, new transports.Console(consoleOptions)];
    }
    // else {
    //   transportList.push(
    //     new WinstonCloudWatch({
    //       logGroupName: 'YOUR_LOG_GROUP_NAME',
    //       logStreamName: 'YOUR_LOG_STREAM_NAME',
    //       awsAccessKeyId: 'YOUR_ACCESS_KEY_ID',
    //       awsSecretKey: 'YOUR_SECRET_ACCESS_KEY',
    //       awsRegion: 'YOUR_AWS_REGION',
    //     }),
    //   );
    // }

    this.logger = createLogger({
      format: logFormat,
      transports: transportList,
    });
  }

  log(message: string, context?: string) {
    this.logger.log('info', message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.log('error', message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.log('warn', message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.log('debug', message, { context });
  }
}
