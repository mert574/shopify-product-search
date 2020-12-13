import shopifyProductSearchService from '../ShopifyProductSearchService';
import mockFetchWith from '../../tests/helpers/mockFechFactory';
import fetch from 'node-fetch';
import Paginated from '../../models/Paginated';
import searchString from '../../util/searchString';

jest.mock('node-fetch');

describe('ShopifyProductSearchService', () => {
    const products = [
        { id: 1, title: 'Test Product 1' },
        { id: 2, title: 'Test Product 2' },
        { id: 2, title: 'Test Product 3' },
        { id: 2, title: 'Test FINDME Product 4' },
        { id: 2, title: 'Test Product FiNdMe 5' },
    ];

    let mockFetchFn: (() => any);

    beforeEach(() => {
        mockFetchFn = mockFetchWith({ products });
        (fetch as unknown as jest.Mock).mockImplementation(mockFetchFn);
    });

    it('should return proper products', async () => {
        /** given **/
        const keyword = 'findme';
        const page = 1;
        const pageSize = 2;
        const expectedProducts = products.filter(it => searchString(it.title, keyword));
        const expectedResponse = Paginated.buildPage(expectedProducts, page, pageSize);

        /** when **/
        const found = await shopifyProductSearchService.searchByTitle(keyword, page, pageSize);

        /** then **/
        expect(found).toStrictEqual(expectedResponse);
    });
});
