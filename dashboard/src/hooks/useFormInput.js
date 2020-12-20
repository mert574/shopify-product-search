import { useCallback, useState } from 'react';

export const useFormInput = (initialValue) => {
    const [ value, setValue ] = useState(initialValue);
    const handleOnChange = useCallback((e) => setValue(e.target.value), [ setValue ]);

    return [
        value,
        handleOnChange,
    ];
};
