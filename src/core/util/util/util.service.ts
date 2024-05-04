import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UtilService {

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    createLogger(controllerName: string) {
        return {
            info: (message: string) => {
                this.logger.info(
                    `${controllerName} | ${message}`,
                );
            },
            error: (message: string, error?: unknown) => {
                this.logger.error(
                    `${controllerName} | ${message} | ${error}`
                );
            }
        }


    }

}
