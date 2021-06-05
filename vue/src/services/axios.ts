import axios from 'axios'

import { Urls } from '@/enums'

export default axios.create({ baseURL: Urls.API_BASE_URL })
