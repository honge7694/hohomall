import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography } from 'antd';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import AnswerEdit from 'components/board/AnswerEdit';

const { Title, Text } = Typography;

const AnswerEditPage = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    
    const [answerData, setAnswerData] = useState();

    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
        
        async function fetchAnswerDetail() {
            
            try{
                const { data } = await axiosInstance.get(`/board/answer/detail/${id}/`, { headers });
                console.log("answerData :", data);
                setAnswerData(data);
                if (!user['isAdmin']){
                    resetUser();
                    history('/sign-in');
                }
            }catch(error){
                console.log('error : ', error);
                if (error.response.status === 403){
                    resetUser();
                    history('/sign-in');
                }
            }
        }
        fetchAnswerDetail();
    }, []);

    return (
        <>
            {answerData && <AnswerEdit answerData={answerData}/>}
        </>
    );
};

export default AnswerEditPage;
