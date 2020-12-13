import shopifyProductService from '../ShopifyProductService';
import Paginated from '../../models/Paginated';
import fetch from 'node-fetch';
import mockFetchWith from '../../tests/helpers/mockFechFactory';

jest.mock('node-fetch');

describe('ShopifyProductService', () => {
    const products = [
        { id: 1, title: 'Test Product 1' },
        { id: 2, title: 'Test Product 2' },
    ];

    let mockFetchFn: (() => any);

    beforeEach(() => {
        shopifyProductService.invalidateCache();
        mockFetchFn = mockFetchWith({ products });
        (fetch as unknown as jest.Mock).mockImplementation(mockFetchFn);
    });

    it('should return all products', async () => {
        /** given **/
        // none.

        /** when **/
        const response = await shopifyProductService.getAllProducts();

        /** then **/
        expect(response).toHaveLength(2);
        expect(response).toEqual(products);
    });

    it('should return as paginated', async () => {
        /** given **/
        const page = 1;
        const pageSize = 1;
        const expected = Paginated.buildPage(products, page, pageSize);

        /** when **/
        const response = await shopifyProductService.getProducts(page, pageSize);

        /** then **/
        expect(response).toBeInstanceOf(Paginated);
        expect(response).toStrictEqual(expected);
    });

    it('should respond recurring requests from cache', async () => {
        /** given **/
        const page = 1;
        const pageSize = 1;
        const mockFn = jest.fn();

        /** when **/
        mockFn.mockImplementation(mockFetchFn);
        (fetch as unknown as jest.Mock).mockImplementation(mockFn);

        const promises = [];
        for (let i = 0; i < 32; i++) {
            promises.push(shopifyProductService.getProducts(page, pageSize));
        }
        await Promise.all(promises);

        /** then **/
        expect(mockFn).toHaveBeenCalledTimes(2);
    });
})
;
