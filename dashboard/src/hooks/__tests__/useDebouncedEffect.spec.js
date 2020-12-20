import { useDebouncedEffect } from '../useDebouncedEffect';
import { renderHook } from '@testing-library/react-hooks';

describe('useDebouncedEffect', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    it('calls callback on first render', () => {
        // arrange
        const fn = jest.fn();
        const time = 1000;

        // act
        renderHook(() => useDebouncedEffect(fn, time, []));

        // assert
        expect(fn).toBeCalledTimes(1);
    });

    it('does not call the callback without dependency change', () => {
        // arrange
        const fn = jest.fn();
        const time = 1000;
        const { rerender } = renderHook(
            ({ value }) => useDebouncedEffect(() => {
                fn();
            }, time, [ value ]),
            { initialProps: { value: 1 } },
        );

        // act
        rerender({ value: 1 });
        jest.advanceTimersByTime(time * 10);

        // assert
        expect(fn).toBeCalledTimes(1);
    });

    it('does not calls callback before timeout', () => {
        // arrange
        const fn = jest.fn();
        const time = 1000;
        const { rerender } = renderHook(
            ({ value }) => useDebouncedEffect(() => {
                fn();
            }, time, [ value ]),
            { initialProps: { value: 1 } },
        );

        // act
        rerender({ value: 2 });
        jest.advanceTimersByTime(time / 2);

        // assert
        expect(fn).toBeCalledTimes(1);
    });

    it('calls callback after timeout', () => {
        // arrange
        const fn = jest.fn();
        const time = 1000;
        const { rerender } = renderHook(
            ({ value }) => useDebouncedEffect(() => {
                fn();
            }, time, [ value ]),
            { initialProps: { value: 1 } },
        );

        // act
        rerender({ value: 2 });
        jest.advanceTimersByTime(time);

        // assert
        expect(fn).toBeCalledTimes(2);
    });
});
