import fetch, { BodyInit, Headers, RequestInit } from 'node-fetch';

export type ApiResponse = { headers: Headers, status: number, body: any };

class ApiClient {
    private readonly BASE_URL: string;

    constructor(baseUrl: string) {
        this.BASE_URL = baseUrl;
    }

    request(path: string, options: RequestInit): Promise<ApiResponse> {
        return fetch(`${ this.BASE_URL }${ path }`, options).then(async (response) => {
            if (!response.ok) {
                if (response.body) {
                    const responseText = await response.text();
                    throw Error(responseText || response.statusText);
                } else {
                    throw Error(response.statusText);
                }
            }
            const ret: ApiResponse = { status: response.status, headers: response.headers, body: null };
            try {
                ret.body = await response.json();
                return ret;
            } catch (e) {
                return ret;
            }
        });
    }

    get(path: string, options: RequestInit = {}): Promise<ApiResponse> {
        options.method = 'GET';
        return this.request(path, options);
    }

    post(path: string, body: BodyInit, options: RequestInit = {}): Promise<ApiResponse> {
        options.method = 'POST';
        options.body = body;
        options.timeout = 10_000;
        options.compress = true;
        options.headers = {
            Accept: 'application/json',
            ...options.headers,
        };
        return this.request(path, options);
    }
}

export default ApiClient;
