import { FC } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Board } from '../Boards/Board';
import { BoardRedirect } from '../Boards/BoardRedirect';
import { BoardsPanel } from '../Boards/BoardsPanel';
import { Footer } from '../Footer';
import { Header } from '../Header';

import styles from './Layout.module.scss';

export const Layout: FC = () => <>
    <Header />
    <div className={styles['boards-layout']}>
        <Router>
            <BoardsPanel />
            <Routes>
                <Route path='/' element={<BoardRedirect/>} />
                <Route path='/:boardId' element={<Board />} />
            </Routes>
        </Router>
    </div>
    <Footer />
</>