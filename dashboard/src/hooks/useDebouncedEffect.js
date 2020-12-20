import { useCallback, useEffect, useRef } from 'react';

export const useDebouncedEffect = (effect, delay, deps) => {
    const isInitial = useRef(true);
    const cleanupFn = useRef(null);

    // eslint-disable-next-line
    const callback = useCallback(effect, deps);

    useEffect(() => {
        if (isInitial.current === true) {
            isInitial.current = false;
            cleanupFn.current = callback();
            return;
        }

        const handler = setTimeout(() => {
            cleanupFn.current = callback();
        }, delay);

        return () => {
            clearTimeout(handler);
            if (typeof cleanupFn.current === 'function') {
                cleanupFn.current();
            }
        };
    }, [ callback, delay ]);
};
