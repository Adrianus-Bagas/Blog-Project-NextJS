import { DEFAULT_API_CONFIG } from "@/service/api-config";
import defaultAxios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
    baseURL: DEFAULT_API_CONFIG.url,
    timeout: 30000,
    headers: { "Content-Type": "application/json" }
}

const axios = defaultAxios.create(config)

export { axios }