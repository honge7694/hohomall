import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, Image, Typography } from 'antd';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import AnswerDetail from 'components/board/AnswerDetail';


const { Title, Text } = Typography;

const AnswerPage = () => {
    const { id } = useParams();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    
    const [answerData, setAnswerData] = useState();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        async function fetchQuestionDetail() {
            try{
                const { data } = await axiosInstance.get(`/board/answer/detail/${id}/`);
                console.log("answerData :", data);
                setAnswerData(data);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchQuestionDetail();
    }, []);

    return (
        <>
            {answerData && <AnswerDetail answerData={answerData}/>}
        </>
    );
};

export default AnswerPage;
