import { Service } from 'typedi'

@Service()
export default class LogService {
  printConsoleError(message: string, err: Error): void {
    console.error(message, err)
  }

  printConsoleLog(message: string, data: Record<string, any>): void {
    console.log(message, data)
  }
}
