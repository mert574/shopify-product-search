import { ServerInfo } from './server';
import api from './api';

export type AppConfiguration = {
    port: number;
    url: string;
}

class ShopifyProductSearchApp {
    private server: ServerInfo;
    private configuration: AppConfiguration;

    constructor(server: ServerInfo, configuration: AppConfiguration) {
        this.server = server;
        this.configuration = configuration;
    }

    start(): Promise<void> {
        this.server.instance.use(api);
        return this.server.listen(this.configuration.port, this.configuration.url);
    }
}

export default ShopifyProductSearchApp;
