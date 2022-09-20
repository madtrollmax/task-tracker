import { FC } from "react";
import { useBoard } from "./useBoard";
import styles from './Board.module.scss';
import { Check, XCircle } from 'react-feather'
import { Column } from "../../Columns/Column/Column";

export const Board: FC = () => {
    const {
        isAdd,
        startAdd,
        newColumnTitle,
        onNewColumnTitleChange,
        onCancelAddNewColumn,
        addColumn,
        columns
    } = useBoard();
    return (<div className={styles.board}>
        {columns.map(el => <Column key={el.id} column={el} />)}
        {isAdd && <div className={styles.column}>
            <input value={newColumnTitle} onChange={onNewColumnTitleChange}/>
            <span>
                <Check onClick={addColumn}/>
                <XCircle onClick={onCancelAddNewColumn}/>
            </span>
        </div>}
        <div className={styles.column} onClick={startAdd}>Создать колонку</div>
    </div>);
}