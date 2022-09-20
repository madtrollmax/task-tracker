import { AnyAction } from '@reduxjs/toolkit';

export interface IBaseActions {
    get: string,
    getList: string,
    create: string,
    update: string;
    delete: string;

    getSuccess: string,
    getListSuccess: string,
    createSuccess: string,
    updateSuccess: string;
    deleteSuccess: string;

    getError: string,
    getListError: string,
    createError: string,
    updateError: string;
    deleteError: string;
};

export type GetBaseActionsFunc = (reducerKey: string) => IBaseActions;

export interface IAction<T> {
    type: string;
    payload?: T | T[];

}

export interface IState<T> {
    item: T;
    data: T[];
    isLoading: boolean;
} 

export interface BaseReducerProps<T>{
    action: IAction<T>;
    state: IState<T>;
    initialState: IState<T>;
    actions: IBaseActions;
}

export type BaseReducerFunc = <T>(props: BaseReducerProps<T>) => IState<T>;

export type ReducerFunc<T> = (state:IState<T> | undefined, action: AnyAction) => IState<T>;
