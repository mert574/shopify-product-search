import './util/readEnv';
import createServer from './server';
import ShopifyProductSearchApp, { AppConfiguration } from './app';
import logger from './util/logger';

const server = createServer();
const config: AppConfiguration = {
    port: Number(process.env.APP_PORT),
    // @ts-expect-error environment variables are expected to be set.
    url: process.env.APP_URL,
};

const app = new ShopifyProductSearchApp(server, config);

try {
    app.start().then(() => {
        logger.info(`Shopify Product Search started on: http://${ config.url }:${ config.port }`);
    });
} catch (error) {
    logger.error('Failed to start the app.', error);
}
