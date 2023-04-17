import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class AxiosClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, headers?: Record<string, string>) {
        this.axiosInstance = axios.create({
            baseURL,
            headers,
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }
}

export default AxiosClient;
