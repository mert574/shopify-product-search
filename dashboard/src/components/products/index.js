import './products.scss';
import Loader from '../loader';

const Products = ({ products = [], loading }) => {
    const noResults = !loading && !products.length &&
        <tr>
            <td colSpan="2" className="column--no-results">No results found.</td>
        </tr>;

    return (
        <div className="products">
            <Loader visible={ loading } />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                { noResults }
                { products.map((it) =>
                    <tr key={ it.id }>
                        <td className="column--id">{ it.id }</td>
                        <td className="column--title">{ it.title }</td>
                    </tr>,
                ) }
                </tbody>
            </table>
        </div>
    );
};

export default Products;
