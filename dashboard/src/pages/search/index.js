import './searchPage.scss';

import { useFormInput } from '../../hooks/useFormInput';
import { useState } from 'react';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import productService from '../../services/productService';
import Pagination from '../../components/pagination';
import Products from '../../components/products';

const SearchPage = () => {
    const [ keyword, setKeyword ] = useFormInput('');
    const [ loading, setLoading ] = useState(false);
    const [ pagination, setPagination ] = useState({ page: 1, pageSize: 20 });
    const [ products, setProducts ] = useState({ totalItems: 0, results: [] });

    useDebouncedEffect(() => {
        (async function () {
            setLoading(true);
            const { results, page, pageSize, totalItems } = await productService.searchProducts(
                pagination.page,
                pagination.pageSize,
                keyword,
            );

            setProducts({ results, totalItems });
            setPagination({ page, pageSize });
            setLoading(false);
        })();
    }, 340, [ keyword, pagination.pageSize, pagination.page ]);

    const handleKeywordChange = (event) => {
        setKeyword(event);
        setPagination(it => ({ ...it, page: 1 }));
    };

    return (
        <div className="search-page">
            <h1 className="search-page--title">Shopify Product Search</h1>
            <div className="search-page--top">
                <Pagination
                    loading={ loading }
                    totalItems={ products.totalItems }
                    pagination={ pagination }
                    onPaginate={ setPagination } />
                <input
                    className="search-page--keyword-input"
                    type="text"
                    value={ keyword }
                    onChange={ handleKeywordChange }
                    placeholder="Enter a keyword to search..." />
            </div>
            <Products products={ products.results } loading={ loading } />
            <footer className="search-page--footer">found total of { products.totalItems } items.</footer>
        </div>
    );
};

export default SearchPage;
