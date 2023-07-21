import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography } from 'antd';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import QuestionEdit from 'components/board/QuestionEdit';

const { Title, Text } = Typography;

const QuestionEditPage = () => {
    const { id } = useParams();
    const resetUser = useResetRecoilState(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    
    const [questionData, setQuestionData] = useState();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        async function fetchQuestionDetail() {
            try{
                const { data } = await axiosInstance.get(`/board/question/detail/${id}/`, { headers });
                console.log("questionData :", data);
                setQuestionData(data);
            }catch(error){
                console.log('error : ', error);
                if (error.response.status === 403){
                    resetUser();
                    history('/sign-in');
                }
            }
        }
        fetchQuestionDetail();
    }, []);

    return (
        <>
            {questionData && <QuestionEdit questionData={questionData}/>}
        </>
    );
};

export default QuestionEditPage;
