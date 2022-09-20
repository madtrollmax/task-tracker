import { baseReducer, getBaseInitState } from '../../utils/actions/reducer';
import { IAction, IState, ReducerFunc } from '../../utils/actions/types';
import { IBoard } from './types';
import { boardsActions } from './consts'

const initialState = getBaseInitState<IBoard>();

export const boardsPanelReducer:ReducerFunc<IBoard> = (state = initialState, action) => {
    return baseReducer<IBoard>({action:action as IAction<IBoard>, state, initialState, actions: boardsActions});
}

export const boardsSelector = ((state: any) => state.boards as IState<IBoard>);

