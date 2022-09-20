import { BaseReducerFunc, BaseReducerProps, IState  } from './types'

export const getBaseInitState = <T>():IState<T> => ({
    item: {} as T,
    data: [],
    isLoading: false
}); 


export const baseReducer: BaseReducerFunc = <T>({action, state, initialState, actions }: BaseReducerProps<T>) => {
    switch(action.type){
        case actions.get: 
        case actions.getList:
        case actions.create:
        case actions.update:
        case actions.delete: {
            return {...state, isLoading: true};
        }
        
        case actions.getSuccess: {
            return {...state, item: action.payload as T, isLoading: false};
        }

        case actions.getError:
        case actions.getListError:
        case actions.createSuccess:
        case actions.createError:
        case actions.updateSuccess:
        case actions.updateError:
        case actions.deleteSuccess:
        case actions.deleteError: {
            return {...state, isLoading: false};
        }

        
        case actions.getListSuccess: {
            return {...state, data: action.payload as T[], isLoading: false};
        }
        default: {
            return state;
        }
    }
}

