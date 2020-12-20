import './pagination.scss';

import { useCallback } from 'react';

const Pagination = ({ pagination, totalItems, loading, onPaginate }) => {
    const setPage = useCallback((incr) => {
        onPaginate({ ...pagination, page: pagination.page + incr });
    }, [ pagination, onPaginate ]);

    const totalPages = Math.ceil(totalItems / pagination.pageSize);

    return (
        <div className="pagination">
            <button
                className="pagination--button"
                disabled={ pagination.page <= 1 || loading }
                onClick={ () => setPage(-1) }>
                &lt;
            </button>
            <button
                className="pagination--button"
                disabled={ pagination.page >= totalPages || loading }
                onClick={ () => setPage(+1) }>
                &gt;
            </button>
            <span className="pagination--display">{ pagination.page } / { totalPages }</span>
        </div>
    );
};

export default Pagination;
