import { Service } from 'typedi'

import { LogData } from '@/types'

@Service()
export default class LogService {
    consoleError(message: string, err: Error): void {
        console.error(message, err)
    }

    consoleLog(message: string, data: LogData): void {
        console.log(message, data)
    }
}
