import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardListPage from './BoardListPage';
import QuestionPage from './QuestionPage';
import AnswerPage from './AnswerPage';


const BoardIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <BoardListPage /> }></Route>
                <Route path="/question/:id" element={ <QuestionPage /> }></Route>
                <Route path="/answer/:id" element={ <AnswerPage /> }></Route>
                {/* <Route path="/detail/:id/edit" element={ <QuestionPage /> }></Route> */}
            </Routes>
        </>
    );
}

export default BoardIndex;