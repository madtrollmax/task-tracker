import { ChangeEvent, EventSimple } from '../../../utils/commonTypes';
import { IColumn } from '../../Columns/types';

export interface IUseBoardViewProps {
    isAdd: boolean;
    startAdd: EventSimple;
    onNewColumnTitleChange: ChangeEvent;
    newColumnTitle: string;
    onCancelAddNewColumn: EventSimple;
    addColumn: EventSimple;
    columns: IColumn[];
};

export type UseBoardFunc = () => IUseBoardViewProps;