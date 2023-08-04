import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import AdminBrandNew from 'components/admin/AdminBrandNew';


const AdminBrandNewPage = () => {
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();
    
    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
    }, [])

    return (
        <>
            {<AdminBrandNew />}
        </>
    );
};

export default AdminBrandNewPage;
