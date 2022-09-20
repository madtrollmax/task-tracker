import { FC } from 'react';
import styles from './BoardsPanel.module.scss';
import { useBoardsPanel } from './useBoardsPanel';
import cn from 'classnames';
import { ArrowRightCircle, ArrowLeftCircle, PlusCircle, Check, XCircle, Edit, Trash } from 'react-feather'
import {
    Link
} from "react-router-dom";

export const BoardsPanel: FC = () => {
    const {
        isVisible,
        toggleVisibility,
        onStartAdd,
        isAddingStart,
        onNewTitleChange,
        newBoardTitle,
        onCancelAddNew,
        addBoard,
        boards,
        deleteBoard,

    } = useBoardsPanel();

    return <div className={cn(styles['boards-panel'], { [styles.hide]: !isVisible })}>
        <div className={cn(isVisible ? styles['arrow-left'] : styles['arrow-right'] )} onClick={toggleVisibility}>
            {isVisible ? <ArrowLeftCircle /> : <ArrowRightCircle />}
        </div>
        <div className={cn(styles.title, styles.item, {[styles.minimaized]: !isVisible})}>
            {isVisible &&<span>Доски</span>}
            {(!isAddingStart) && <span className={styles.actions}>
                <PlusCircle onClick={onStartAdd} />
            </span>}
        </div>
        <div className={styles['boards-list']}>
            {boards.map(board => <div key={board.id} className={cn(styles.item, {[styles.minimaized]: !isVisible})} >
                <Link to={`/${board.id}/`}>{board.title}</Link>
                {isVisible && <span className={styles.actions}>
                    <Edit />
                    <Trash onClick={deleteBoard(board.id)} />
                </span>}
            </div>)}

            {isAddingStart && <div className={cn(styles.item)}>
                <input onChange={onNewTitleChange} value={newBoardTitle} autoFocus/>
                <span>
                    {newBoardTitle && <Check onClick={addBoard} />}
                    <XCircle onClick={onCancelAddNew} />
                </span>
            </div>}
        </div>
    </div>
}