import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardListPage from './BoardListPage';


const BoardIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <BoardListPage /> }></Route>
            </Routes>
        </>
    );
}

export default BoardIndex;