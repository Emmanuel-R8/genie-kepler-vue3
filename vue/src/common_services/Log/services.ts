import { Service } from 'typedi'

import { LogData } from '@/types'

@Service()
export class Log_Common_Service {
    consoleError(message: string, err: Error): void {
        console.error(message, err)
    }

    consoleLog(message: string, data: LogData): void {
        console.log(message, data)
    }
}
