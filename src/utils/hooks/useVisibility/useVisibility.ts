import { useCallback, useState } from 'react';
import { UseVisibilityFunc } from './types';

export const useVisibility:UseVisibilityFunc = (initValue = false) => {
    const [isVisible, setVisibity] = useState(initValue);

    const setVisible = useCallback(() => { setVisibity(true)}, [setVisibity]);
    const setHidden = useCallback(() => { setVisibity(false)}, [setVisibity]);
    const toggleVisibility = useCallback(() => { setVisibity((prevValue: boolean) => !prevValue)}, [setVisibity]);

    return {
        isVisible,
        setVisible,
        setHidden,
        toggleVisibility
    }
}