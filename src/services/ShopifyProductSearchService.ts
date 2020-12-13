import logger from '../util/logger';
import { Product } from '../models/Product';
import searchString from '../util/searchString';
import Paginated from '../models/Paginated';
import shopifyProductService from './ShopifyProductService';

class ShopifyProductSearchService {
    async searchByTitle(keyword: string, page: number, pageSize: number): Promise<Paginated<Product>> {
        const allProducts = await shopifyProductService.getAllProducts();
        const filteredProducts = allProducts.filter(it => searchString(it.title, keyword));

        logger.debug(`found ${ filteredProducts.length } products for ${ keyword }`,
            { service: 'ShopifyProductSearchService.searchByTitle' });

        return Paginated.buildPage(filteredProducts, page, pageSize);
    }
}

export default new ShopifyProductSearchService();
