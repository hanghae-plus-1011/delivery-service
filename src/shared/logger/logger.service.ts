// import { Injectable, Inject, Logger, Optional } from '@nestjs/common';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger as WinstonLogger } from 'winston';

// @Injectable()
// export class LoggerService {
//   constructor(
//     @Inject(WINSTON_MODULE_PROVIDER)
//     private readonly logger?: WinstonLogger,
//   ) { }

//   log(message: string, context?: string) {
//     this.logger.info(message, { context });
//   }

//   error(message: string, trace?: string, context?: string) {
//     this.logger.error(message, { context, trace });
//   }

//   warn(message: string, context?: string) {
//     this.logger.warn(message, { context });
//   }

//   debug(message: string, context?: string) {
//     this.logger.debug(message, { context });
//   }
// }
import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports, format } from 'winston';
const { combine, timestamp, printf, label, json, colorize } = format;
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as WinstonCloudWatch from 'winston-cloudwatch';
// import { utilities, WinstonModule } from 'nest-winston';

// We inject a transient instance of the Logger into our feature modules
// so that each one has its own custom context.

@Injectable({ scope: Scope.TRANSIENT })
// export class AppLogger extends Logger {}
export class AppLogger implements LoggerService {
  private context?: string;

  private winstonLogger: Logger;

  public setContext(context: string) {
    this.context = context;
  }

  constructor() {
    const logFormat = combine(
      label({ label: 'delivery-service' }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      json(),
    );

    console.log('환경변수 : ', process.env.NODE_ENV);
    // 로컬일 경우
    if (process.env.NODE_ENV === 'local') {
      const dailyLogFileOptions = {
        dirname: 'logs',
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '10d',
      };

      const consoleOptions = {
        level: 'info',
        format: combine(
          colorize(),
          label({ label: 'delivery-service' }),
          timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          printf(
            (info) =>
              `${info.timestamp} - ${info.level}: [${info.label} ${info.context}] ${info.message}`,
          ),
        ),
      };

      this.winstonLogger = createLogger({
        format: logFormat,
        transports: [
          new DailyRotateFile(dailyLogFileOptions),
          new transports.Console(consoleOptions),
        ],
      });
    } else {
      // 프로덕션 또는 dev일 경우
      const cloudWatchLogOptions = {
        logGroupName: process.env.AWS_LOG_GROUP_NAME,
        logStreamName: `${process.env.AWS_LOG_GROUP_NAME}-application-stream`,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
        awsRegion: process.env.AWS_REGION,
        messageFormatter: ({ level, message, additionalInfo }) =>
          `[${level}] message: ${message} \nadditionalInfo: ${additionalInfo} }`,
        awsOptions: {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
          region: process.env.AWS_REGION,
        },
      };

      this.winstonLogger = createLogger({
        format: logFormat,
        transports: [new WinstonCloudWatch(cloudWatchLogOptions)],
      });
    }
  }

  log(message: any, context?: string) {
    return this.winstonLogger.info(message, {
      context: context || this.context,
    });
  }

  error(message: any, trace?: string, context?: string): any {
    return this.winstonLogger.error(message, {
      trace,
      context: context || this.context,
    });
  }

  warn(message: any, context?: string): any {
    return this.winstonLogger.warn(message, {
      context: context || this.context,
    });
  }

  debug(message: any, context?: string): any {
    return this.winstonLogger.debug(message, {
      context: context || this.context,
    });
  }

  verbose(message: any, context?: string): any {
    return this.winstonLogger.verbose(message, {
      context: context || this.context,
    });
  }
}
