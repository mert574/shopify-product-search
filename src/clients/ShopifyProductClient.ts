import { Headers } from 'node-fetch';
import { TOO_MANY_REQUESTS } from 'http-status-codes';
import querystring from 'querystring';
import ApiClient from './ApiClient';
import logger from '../util/logger';
import { Product } from '../models/Product';
import HttpHandlerError from '../models/errors/HttpHandlerError';

class ShopifyProductClient extends ApiClient {
    private apiLimitReached: boolean;

    constructor(shop: string, apiKey: string, password: string) {
        const apiVersion = '2020-10';
        const baseUrl = `https://${ apiKey }:${ password }@${ shop }.myshopify.com/admin/api/${ apiVersion }`;
        super(baseUrl);

        this.apiLimitReached = false;
    }

    async list(query?: { [key: string]: string | number }): Promise<Product[]> {
        const qs = querystring.stringify({ limit: 250, ...query });
        const path = `/products.json?${ qs }`;

        const response = await this.get(path);
        logger.debug(`sent request to ${ path }`, { service: 'ShopifyProductClient.listProducts', status: response.status, response: response.body });

        this.parseApiLimit(response.headers);
        return response.body.products;
    }

    private parseApiLimit(headers: Headers) {
        const limit = headers.get('x-shopify-shop-api-call-limit');
        if (!limit) {
            return;
        }
        const [ curr, max ] = limit.split('/').map(it => Number(it));
        if (curr >= max) {
            throw new HttpHandlerError('API Limit exceeded.', TOO_MANY_REQUESTS);
        } else if (curr / max >= 0.5) {
            logger.warn(`api limit exceeded 50% (${ curr } / ${ max })`, { service: 'ShopifyProductClient.parseApiLimit' });
        }
        this.apiLimitReached = curr >= max;
    }
}

export default ShopifyProductClient;
