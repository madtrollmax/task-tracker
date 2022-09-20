import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { boardsSelector } from '../reducer';
import { UseBoardRedirectFunc } from './types';

export const useBorderRedirect:UseBoardRedirectFunc = () => {
    const state = useSelector(boardsSelector);
    const boardId = useMemo(() => state.data.length ? state.data[0].id : undefined, [state]);

    return { boardId };
}