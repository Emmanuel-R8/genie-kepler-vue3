import { Service } from 'typedi'

import { LogData } from '@/types'

@Service()
export default class LogService {
  printConsoleError(message: string, err: Error): void {
    console.error(message, err)
  }

  printConsoleLog(message: string, data: LogData): void {
    console.log(message, data)
  }
}
