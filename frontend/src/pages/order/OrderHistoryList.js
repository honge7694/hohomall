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

const OrderHistoryList = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const fetchOrderList = async () => {
            try{
                const { data } = await axiosInstance.get('/order/', { headers })
                console.log('Order List : ', data);
                setOrderList(data);
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
            {orderList && <OrderList orderList={orderList} />}
        </>
    )
}


export default OrderHistoryList;