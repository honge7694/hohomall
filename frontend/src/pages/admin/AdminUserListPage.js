import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Table } from 'antd';
import OrderList from 'components/order/OrderHistoryList';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import moment from "moment";
import axios from 'axios';
import AdminUserList from 'components/admin/AdminUserList';

const AdminUserListPage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
        
        const fetchUserList = async () => {
            try{
                const { data } = await axiosInstance.get('/account/signup/')
                console.log('Admin User List : ', data);
                setUserList(data);
            }catch(error){
                console.log(error);
            }
        }

        fetchUserList();
    }, []);
        
    return (
        <>
            {userList && <AdminUserList userList={userList} />}
        </>
    )
}


export default AdminUserListPage;