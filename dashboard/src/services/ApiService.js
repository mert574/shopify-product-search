class ApiService {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl;
    }

    request(path, options) {
        return fetch(`${ this.BASE_URL }${ path }`, options).then(async (response) => {
            if (!response.ok) {
                if (response.body) {
                    const responseText = await response.text();
                    throw Error(responseText || response.statusText);
                } else {
                    throw Error(response.statusText);
                }
            }
            try {
                return await response.json();
            } catch (e) {
                return response.status;
            }
        });
    }

    get(path, options = {}) {
        options.method = 'GET';
        return this.request(path, options);
    }

    post(path, body, options = {}) {
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

export default ApiService;
