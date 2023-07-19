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

    useEffect(() => {
        const fetchQuestionList = async () => {
            try{
                const { data } = await axiosInstance.get('/question/', { headers })
                console.log('BoardList : ', data);
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
    }, []);
        
    return (
        <>
            {questionList && <BoardList questionList={questionList} />}
        </>
    )
}


export default BoardListPage;