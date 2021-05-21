import axios from 'axios'

import { Urls } from '@/enums'

export default axios.create({ baseURL: Urls.BASE_URL })
