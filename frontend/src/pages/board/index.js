import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardListPage from './BoardListPage';
import QuestionPage from './QuestionPage';
import QuestionEditPage from './QuestionEditPage';
import AnswerPage from './AnswerPage';
import QuestionWritePage from './QuestionWritePage';
import AnswerWritePage from './AnswerWritePage';
import AnswerEditPage from './AnswerEditPage';


const BoardIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <BoardListPage /> }></Route>
                <Route path="/new" element={ <QuestionWritePage /> }></Route>
                <Route path="/question/:id" element={ <QuestionPage /> }></Route>
                <Route path="/question/:id/edit" element={ <QuestionEditPage /> }></Route>
                <Route path="/answer/:id" element={ <AnswerPage /> }></Route>
                <Route path="/question/:id/answer" element={ <AnswerWritePage /> }></Route>
                <Route path="/answer/:id/edit" element={ <AnswerEditPage />}></Route>
            </Routes>
        </>
    );
}

export default BoardIndex;