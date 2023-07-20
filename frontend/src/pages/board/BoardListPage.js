import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import BoardList from 'components/board/BoardList';


const BoardListPage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);

    const [questionList, setQuestionList] = useState([]);
    const [answerList, setAnswerList] = useState([]);

    useEffect(() => {
        const fetchQuestionList = async () => {
            try{
                const { data } = await axiosInstance.get('/board/question/')
                console.log('QuestionList : ', data);
                setQuestionList(data);
            }catch(error){
                console.log(error);
                // if (error.response.status === 403){
                //     resetUser();
                //     history('/sign-in');
                // }
            }
        }

        fetchQuestionList();

        const fetchAnswerList = async () => {
            try{
                const { data } = await axiosInstance.get('/board/answer/')
                console.log('AnswerList : ', data);
                setAnswerList(data);
            }catch(error){
                console.log(error);
                // if (error.response.status === 403){
                //     resetUser();
                //     history('/sign-in');
                // }
            }
        }

        fetchAnswerList();
    }, []);
        
    return (
        <>
            {questionList && <BoardList questionList={questionList} answerList={answerList} />}
        </>
    )
}


export default BoardListPage;