import { ChangeEvent, EventSimple } from '../../../utils/commonTypes';
import { IBoard } from '../types';

export interface IUseBoardsPanelViewProps {
    isVisible: boolean;
    toggleVisibility: EventSimple;
    name: string;
    boards: IBoard[];
    isAddingStart: boolean;
    onStartAdd: EventSimple;
    newBoardTitle: string;
    onNewTitleChange: ChangeEvent;
    onCancelAddNew: EventSimple;
    addBoard: EventSimple;
    deleteBoard: (id: string) => EventSimple;
};

export type UseBoardsPanelFunc = () => IUseBoardsPanelViewProps;