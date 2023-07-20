import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, Image, Typography } from 'antd';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import QuestionDetail from 'components/board/QuestionDetail';


const { Title, Text } = Typography;

const QuestionPage = () => {
    const { id } = useParams();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    
    const [questionData, setQuestionData] = useState();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        async function fetchQuestionDetail() {
            try{
                const { data } = await axiosInstance.get(`/board/question/detail/${id}/`);
                console.log("questionData :", data);
                setQuestionData(data);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchQuestionDetail();
    }, []);

    return (
        <>
            {questionData && <QuestionDetail questionData={questionData} userInfo={userInfo}/>}
        </>
    );
};

export default QuestionPage;
