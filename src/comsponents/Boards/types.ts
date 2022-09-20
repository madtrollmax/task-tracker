import { IColumn } from "../Columns/types";

export interface IBoard {
    id: string;
    title: string;
    columns?: IColumn[];
}