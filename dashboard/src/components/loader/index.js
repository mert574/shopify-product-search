import './loader.scss';
import classnames from 'classnames';

const Loader = ({ visible = false }) => {
    return <div data-testid="loader" className={ classnames('loader', { visible }) } />;
};

export default Loader;
