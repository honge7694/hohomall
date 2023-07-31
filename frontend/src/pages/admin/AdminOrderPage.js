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
import AdminOrderList from 'components/admin/AdminOrderList';

const AdminOrderPage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);

    const [adminOrderList, setAdminOrderList] = useState([]);

    useEffect(() => {
        const fetchOrderList = async () => {
            try{
                const { data } = await axiosInstance.get('/order/admin/', { headers })
                console.log('Admin Order List : ', data);
                setAdminOrderList(data);
            }catch(error){
                console.log(error);
                if (error.response.status === 403){
                    resetUser();
                    history('/sign-in');
                }
            }
        }

        fetchOrderList();
    }, []);
        
    return (
        <>
            {adminOrderList && <AdminOrderList orderList={adminOrderList} />}
        </>
    )
}


export default AdminOrderPage;