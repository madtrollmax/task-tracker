import {configureStore} from '@reduxjs/toolkit'
import { boardsPanelReducer } from './comsponents/Boards/reducer'

const reducer = {
    boards: boardsPanelReducer
}
export const store = configureStore({reducer});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;