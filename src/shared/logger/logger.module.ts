import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule { }

//================================================
=======
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
// export class LoggerModule { }

//------------------------------------------------------
// import { Inject, Injectable, Module } from '@nestjs/common';
// import { createLogger, format, transports } from 'winston';
// const { combine, timestamp, printf, label, json, colorize } = format;
// import * as DailyRotateFile from 'winston-daily-rotate-file';
// import * as WinstonCloudWatch from 'winston-cloudwatch';
// import { utilities, WinstonModule } from 'nest-winston';

// @Module()
// export class Logger {
//   private readonly logger;

//   constructor(@Inject() private readonly winstonModule: WinstonModule) {
//     const logFormat = combine(
//       label({ label: 'delivery-service' }),
//       timestamp({
//         format: 'YYYY-MM-DD HH:mm:ss',
//       }),
//       json(),
//     );

//     const dailyLogFileOptions = {
//       dirname: 'logs',
//       filename: '%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       maxSize: '20m',
//       maxFiles: '10d',
//     };

//     const consoleOptions = {
//       level: 'info',
//       format: combine(
//         colorize(),
//         label({ label: '[delivery-service]' }),
//         timestamp({
//           format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         printf(
//           (info) =>
//             `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
//         ),
//       ),
//     };

//     const cloudWatchLogOptions = {
//       logGroupName: process.env.AWS_LOG_GROUP_NAME,
//       logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
//       awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
//       awsRegion: process.env.AWS_REGION,
//       messageFormatter: ({ level, message, additionalInfo }) =>
//         `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
//           additionalInfo,
//         )}}`,
//     };

//     // this.logger = createLogger({
//     //   format: logFormat,
//     // });

//     console.log('환경변수 : ', process.env.NODE_ENV);
//     // 로컬일 경우
//     if (process.env.NODE_ENV === 'local') {
//       this.logger.add(new DailyRotateFile(dailyLogFileOptions));
//       this.logger.add(new transports.Console(consoleOptions));
//     } else {
//       // 프로덕션 또는 dev일 경우
//       this.logger.add(new WinstonCloudWatch(cloudWatchLogOptions));
//     }
//   }

//   log(message: string, context?: string) {
//     this.logger.log('info', message, { context });
//   }

//   error(message: string, trace?: string, context?: string) {
//     this.logger.log('error', message, { trace, context });
//   }

//   warn(message: string, context?: string) {
//     this.logger.log('warn', message, { context });
//   }

//   debug(message: string, context?: string) {
//     this.logger.log('debug', message, { context });
//   }
// }


// ------------------dynamic module--------------------------------------------

// import { Module, DynamicModule } from '@nestjs/common';
// import { LoggerService } from './logger.service';
// import {
//   WINSTON_MODULE_NEST_PROVIDER,
//   utilities,
//   WinstonModule,
// } from 'nest-winston';
// import { createLogger, format, transports } from 'winston';
// const { combine, timestamp, printf, label, json, colorize } = format;
// import * as DailyRotateFile from 'winston-daily-rotate-file';
// import * as WinstonCloudWatch from 'winston-cloudwatch';
// // import { utilities, WinstonModule } from 'nest-winston';

// @Module({})
// export class LoggerModule {
//   static forRoot(): DynamicModule {
//     let logger;

//     const logFormat = combine(
//       label({ label: 'delivery-service' }),
//       timestamp({
//         format: 'YYYY-MM-DD HH:mm:ss',
//       }),
//       json(),
//     );

//     console.log('환경변수 : ', process.env.NODE_ENV);
//     // 로컬일 경우
//     if (process.env.NODE_ENV === 'local') {
//       const dailyLogFileOptions = {
//         dirname: 'logs',
//         filename: '%DATE%.log',
//         datePattern: 'YYYY-MM-DD',
//         maxSize: '20m',
//         maxFiles: '10d',
//       };

//       const consoleOptions = {
//         level: 'info',
//         format: combine(
//           colorize(),
//           label({ label: '[delivery-service]' }),
//           timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss',
//           }),
//           printf(
//             (info) =>
//               `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
//           ),
//         ),
//       };

//       logger = createLogger({
//         format: logFormat,
//         transports: [
//           new DailyRotateFile(dailyLogFileOptions),
//           new transports.Console(consoleOptions),
//         ],
//       });
//     } else {
//       // 프로덕션 또는 dev일 경우
//       const cloudWatchLogOptions = {
//         logGroupName: process.env.AWS_LOG_GROUP_NAME,
//         logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
//         awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
//         awsRegion: process.env.AWS_REGION,
//         messageFormatter: ({ level, message, additionalInfo }) =>
//           `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
//             additionalInfo,
//           )}}`,
//       };

//       logger = createLogger({
//         format: logFormat,
//         transports: [new WinstonCloudWatch(cloudWatchLogOptions)],
//       });
//     }

//     const winstonModuleOptions = {
//       useExisting: logger,
//     };

//     return {
//       global: true,
//       module: LoggerModule,
//       providers: [
//         LoggerService,
//         {
//           provide: WINSTON_MODULE_NEST_PROVIDER,
//           useValue: winstonModuleOptions,
//         },
//       ],
//       exports: [LoggerService],
//     };
//   }
// }
