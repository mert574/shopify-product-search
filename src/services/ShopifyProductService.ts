import { Product } from '../models/Product';
import ShopifyProductClient from '../clients/ShopifyProductClient';
import Paginated from '../models/Paginated';
import CacheClient from '../clients/CacheClient';
import logger from '../util/logger';

class ShopifyProductService {
    private readonly client: ShopifyProductClient;
    private readonly cacheEnabled: boolean;
    private cache: CacheClient<Product[]>;
    private fields;

    constructor(fields = [ 'id', 'title' ], cacheTTLMs = 35_000) {
        this.client = new ShopifyProductClient(
            // @ts-expect-error environment variables are expected to be set
            process.env.SHOPIFY_SHOP,
            process.env.SHOPIFY_APIKEY,
            process.env.SHOPIFY_PASSWORD,
        );

        this.cacheEnabled = cacheTTLMs > 0;
        this.fields = fields;
        this.cache = new CacheClient<Product[]>(cacheTTLMs, () => this.fetchAllProducts());
    }

    async getProducts(page: number, pageSize: number = 20): Promise<Paginated<Product>> {
        const products = await this.getAllProducts();
        return Paginated.buildPage(products, page, pageSize);
    }

    getAllProducts(): Promise<Product[]> {
        if (this.cacheEnabled) {
            return this.cache.getData();
        }
        return this.fetchAllProducts();
    }

    setFields(fields: string[]) {
        this.fields = fields;
        this.invalidateCache();
    }

    invalidateCache(): void {
        this.cache.invalidate();
    }

    private async fetchAllProducts(): Promise<Product[]> {
        const fields = this.fields.join(', ');
        let lastProductId = 0;
        let currentPage: Product[];
        let results: Product[] = [];

        do {
            currentPage = await this.client.list({ since_id: lastProductId, fields });
            if (currentPage.length) {
                results = results.concat(currentPage);
                const lastIndex = currentPage.length - 1;
                lastProductId = currentPage[lastIndex].id;
            }
        } while (currentPage.length);

        logger.debug(`found ${ results.length } products in total.`,
            { service: 'ShopifyProductService.fetchAllProducts' });
        return results;
    }
}

export default new ShopifyProductService();
