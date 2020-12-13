import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import shopifyProductSearchService from '../../services/ShopifyProductSearchService';
import shopifyProductService from '../../services/ShopifyProductService';

/**
 * List all products paginated.
 * @route GET /
 */
export async function listProducts(req: Request, res: Response): Promise<void> {
    const { page, pageSize } = matchedData(req);
    const response = await shopifyProductService.getProducts(page, pageSize);
    res.json(response);
}

/**
 * Search products by title.
 * @route GET /searchProducts
 */
export async function searchProducts(req: Request, res: Response): Promise<void> {
    const { page, pageSize, keyword } = matchedData(req);
    const response = await shopifyProductSearchService.searchByTitle(keyword, page, pageSize);
    res.json(response);
}
