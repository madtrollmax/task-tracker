import { FC } from 'react';
import { IColumnProps } from './types';
import styles from './Column.module.scss';


export const Column: FC<IColumnProps> = ({column}) => {
    return (<div className={styles.column}>{column.title}</div>)
}