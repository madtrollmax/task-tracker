import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { boardsSelector } from '../reducer';
import { UseBoardFunc } from './types';
import { boardsActions, path } from '../consts';
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch';
import { createAction, getAction } from '../../../utils/actions/actions';
import { useVisibility } from '../../../utils/hooks/useVisibility'
import { IColumn } from '../../Columns/types';
import { path as columnsPath } from '../../Columns/consts';
import shortid from 'shortid';

export const useBoard: UseBoardFunc = () => {
    const state = useSelector(boardsSelector);
    console.log(state, useSelector);
    const {boardId} = useParams();
    const dispatch = useAppDispatch();

    const{isVisible: isAdd, setVisible: startAdd, setHidden: cancelAdd} = useVisibility(false)
    const [newColumnTitle, setNewColumnTitle ] = useState('');

    const onNewColumnTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumnTitle(event.target.value);
    }, []);

    const onCancelAddNewColumn = useCallback(() => {
        cancelAdd();
        setNewColumnTitle('');
    },[cancelAdd, setNewColumnTitle ]);
    
    useEffect(() => {
        if(!newColumnTitle) dispatch(getAction(boardsActions, boardId as string, path));
    },[dispatch, boardId, newColumnTitle]);

    const addColumn = useCallback(() => {
        dispatch(createAction<IColumn>(boardsActions, { id: shortid.generate(), boardId:(boardId as string), title: newColumnTitle }, columnsPath));
        onCancelAddNewColumn();
    }, [dispatch, newColumnTitle, onCancelAddNewColumn, boardId]);

    const columns = useMemo(() => state.item.columns || [], [state]);


    console.log(state.item.columns);
    

    return {
        isAdd,
        startAdd,
        newColumnTitle,
        onNewColumnTitleChange,
        onCancelAddNewColumn,
        addColumn,
        columns
    };
}