
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { createAction, deleteAction, getListAction } from '../../../utils/actions/actions';
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch';
import { useVisibility } from '../../../utils/hooks/useVisibility'
import { boardsActions, path } from '../consts';
import { boardsSelector } from '../reducer';
import { IBoard } from '../types';
import { UseBoardsPanelFunc } from './types'
import shortid from 'shortid';

export const useBoardsPanel: UseBoardsPanelFunc = () => {
    const dispatch = useAppDispatch();
    const { isVisible, toggleVisibility, setVisible } = useVisibility(true);
    const { isVisible: isAddingStart, setVisible: startAdd, setHidden: stopAdd } = useVisibility(false);
    const [newBoardTitle, setBoardTitle] = useState('');

    const name = useMemo(() => isVisible ? 'Скрыть' : 'Показать', [isVisible]);
    const state = useSelector(boardsSelector);

    const boards = useMemo(() => state.data, [state]);
    useEffect(() => {
        dispatch(getListAction(boardsActions, path));
    }, [dispatch]);

    const onStartAdd = useCallback(() => {
        setVisible();
        startAdd();
    }, [setVisible, startAdd]);

    const onNewTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(event.target.value);
    }, []);

    const onCancelAddNew = useCallback(() => {
        stopAdd();
        setBoardTitle('')
    }, [stopAdd, setBoardTitle]);

    const addBoard = useCallback(() => {
        dispatch(createAction<IBoard>(boardsActions, { id: shortid.generate(), title: newBoardTitle }, path));
        onCancelAddNew();
    }, [dispatch, newBoardTitle, onCancelAddNew]);

    const deleteBoard = useCallback((id: string) => () => {
        dispatch(deleteAction(boardsActions, id, path));
    }, [dispatch]);




    return {
        isVisible,
        toggleVisibility,
        name,
        boards,
        isAddingStart,
        onStartAdd,
        newBoardTitle,
        onNewTitleChange,
        onCancelAddNew,
        addBoard,
        deleteBoard
    };
}