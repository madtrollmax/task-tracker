import { GetBaseActionsFunc, IBaseActions } from './types';
import {AnyAction} from '@reduxjs/toolkit'
import {ThunkAction} from 'redux-thunk';
import { RootState } from '../../store';

export const getBaseActions: GetBaseActionsFunc = reducerKey => ({
    get: `${reducerKey}-ACTION-GET`,
    getList: `${reducerKey}-ACTION-GETLIST`,
    create: `${reducerKey}-ACTION-CREATE`,
    update: `${reducerKey}-ACTION-UPDATE`,
    delete: `${reducerKey}-ACTION-CREATE`,

    getSuccess: `${reducerKey}-ACTION-GET-SUCCESS`,
    getListSuccess: `${reducerKey}-ACTION-GETLIST-SUCCESS`,
    createSuccess: `${reducerKey}-ACTION-CREATE-SUCCESS`,
    updateSuccess: `${reducerKey}-ACTION-UPDATE-SUCCESS`,
    deleteSuccess: `${reducerKey}-ACTION-CREATE-SUCCESS`,

    getError: `${reducerKey}-ACTION-GET-ERROR`,
    getListError: `${reducerKey}-ACTION-GETLIST-ERROR`,
    createError: `${reducerKey}-ACTION-CREATE-ERROR`,
    updateError: `${reducerKey}-ACTION-UPDATE-ERROR`,
    deleteError: `${reducerKey}-ACTION-CREATE-ERROR`,
});

export const getActionBase = (actions: IBaseActions):AnyAction => ({
    type: actions.get,
});

export const getActionError = (actions: IBaseActions):AnyAction => ({
    type: actions.getError,
});

export const getActionSuccess = <T>(actions: IBaseActions ,value: T):AnyAction => ({
    type: actions.getSuccess,
    payload: value,
});

export const getAction = <T>(actions: IBaseActions, id: string, path: string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(getActionBase(actions));
    const responce = await fetch(`${path}/${id}`)
    if(responce.status === 200){
        const data = await responce.json();
        dispatch(getActionSuccess(actions, data as T));
    }else {
        dispatch(getActionError(actions));
    }
};

export const getListActionBase = (actions: IBaseActions):AnyAction => ({
    type: actions.getList,
});

export const getListActionError = (actions: IBaseActions):AnyAction => ({
    type: actions.getListError,
});

export const getListActionSuccess = <T>(actions: IBaseActions, value: T[]):AnyAction => ({
    type: actions.getListSuccess,
    payload: value,
});

export const getListAction = <T>(actions: IBaseActions, path: string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(getListActionBase(actions));
    const responce = await fetch(path);
    if(responce.status === 200){
        const data = await responce.json();
        dispatch(getListActionSuccess(actions, data as T[]));
    }else {
        dispatch(getListActionError(actions));
    }
};


export const createActionBase = (actions: IBaseActions):AnyAction => ({
    type: actions.create,
});

export const createActionError = (actions: IBaseActions):AnyAction => ({
    type: actions.createError,
});

export const createActionSuccess = (actions: IBaseActions):AnyAction => ({
    type: actions.createSuccess,
});

export const createAction = <T extends {id: string}>(actions: IBaseActions, value: T, path: string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(createActionBase(actions));
    const responce = await fetch(path, {method: 'PUT', body:JSON.stringify(value)})
    if(responce.status === 200){
        dispatch(getAction(actions, value.id, path));
        dispatch(getListAction(actions, path));
    }else {
        dispatch(createActionError(actions));
    }
};

export const updateActionBase = (actions: IBaseActions):AnyAction => ({
    type: actions.update,
});

export const updateActionError = (actions: IBaseActions):AnyAction => ({
    type: actions.updateError,
});

export const updateActionSuccess = (actions: IBaseActions):AnyAction => ({
    type: actions.updateSuccess,
});

export const updateAction = <T extends {id: string}>(actions: IBaseActions, value: T, path: string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(updateActionBase(actions));
    const responce = await fetch(path, {method: 'POST', body:JSON.stringify(value)})
    if(responce.status === 200){
        dispatch(getAction(actions, value.id, path));
        dispatch(getListAction(actions, path));
    }else {
        dispatch(updateActionError(actions));
    }
};

export const deleteActionBase = (actions: IBaseActions):AnyAction => ({
    type: actions.delete,
});

export const deleteActionError = (actions: IBaseActions):AnyAction => ({
    type: actions.deleteError,
});

export const deleteActionSuccess = (actions: IBaseActions):AnyAction => ({
    type: actions.deleteSuccess,
});

export const deleteAction = (actions: IBaseActions, id: string, path: string):ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(deleteActionBase(actions));
    const responce = await fetch(`${path}/${id}`, { method: 'DELETE' })
    if(responce.status === 200){
        dispatch(getListAction(actions, path));
    }else {
        dispatch(deleteActionError(actions));
    }
};