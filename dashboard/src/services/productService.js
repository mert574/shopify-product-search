import ApiService from './ApiService';
import querystring from 'querystring';

class ProductService extends ApiService {
    constructor() {
        super(process.env.REACT_APP_API_URL);
    }

    listProducts(page, pageSize) {
        const query = querystring.stringify({ page, pageSize });
        return this.get(`/?${ query }`);
    }

    searchProducts(page, pageSize, keyword) {
        const query = querystring.stringify({ page, pageSize, keyword });
        return this.get(`/search?${ query }`);
    }
}

export default new ProductService();
