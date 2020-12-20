import { render, screen } from '@testing-library/react';
import Products from './index';

describe('Products component', () => {
    it('renders items properly', () => {
        const products = [
            { id: 'id-1', title: 'title-1' },
            { id: 'id-2', title: 'title-2' },
        ];
        render(<Products products={ products } loading={ false } />);

        products.forEach(it => {
            expect(screen.getByText(it.title)).toBeInTheDocument();
        });
    });

    it('shows loader when loading', () => {
        const products = [
            { id: 'id-1', title: 'title-1' },
            { id: 'id-2', title: 'title-2' },
        ];
        render(<Products products={ products } loading={ true } />);

        expect(screen.getByTestId('loader')).toHaveClass('visible');
    });

    it('shows no results text when no products', () => {
        render(<Products products={ [] } loading={ false } />);

        expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
});
