import { Service } from 'typedi'

import { router } from '@/router'

@Service()
export default class RouteService {
  private _router = router

  async setRoute(name: string): Promise<void> {
    await this._router.push({ name })
  }
}
