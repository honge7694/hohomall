import React, { useState, useEffect } from 'react';
import AnswerWrite from 'components/board/AnswerWrite';

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';


const AnswerWritePage = () => {
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();

    // admin 확인
    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
    }, [])

    return (
        <>
            {<AnswerWrite />}
        </>
    );
};

export default AnswerWritePage;
