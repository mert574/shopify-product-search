import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './index';

describe('Pagination component', () => {
    it('renders properly', () => {
        // arrange
        render(<Pagination pagination={ { page: 1, pageSize: 20 } } totalItems={ 100 } />);
        const prevBtn = screen.getByText(/</);
        const nextBtn = screen.getByText(/>/);
        const display = screen.getByText(/\//);

        // assert
        expect(prevBtn).toBeDisabled();
        expect(nextBtn).not.toBeDisabled();
        expect(display).toHaveTextContent('1 / 5');
    });

    it('calls onPaginate when page changed', () => {
        // arrange
        const onPaginate = jest.fn();
        render(<Pagination onPaginate={ onPaginate } pagination={ { page: 1, pageSize: 20 } } totalItems={ 100 } />);
        const nextBtn = screen.getByText(/>/);

        // act
        userEvent.click(nextBtn);

        // assert
        expect(onPaginate).toBeCalledTimes(1);
        expect(onPaginate).toBeCalledWith({ page: 2, pageSize: 20 });
    });
});
