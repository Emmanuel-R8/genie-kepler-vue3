import { Service } from 'typedi';

import { Router } from 'vue-router';
import { router } from '@/router';

@Service()
export class Router_Common_Service {
    constructor(private _router: Router) {
        this._router = router;
    }

    async setRoute(name: string): Promise<void> {
        await this._router.push({ name });
    }
}
