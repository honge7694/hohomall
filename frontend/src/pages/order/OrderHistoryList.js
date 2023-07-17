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
            const { data } = await axiosInstance.get('/order/', { headers })
            console.log('Order List : ', data);
            setOrderList(data);
        }

        fetchOrderList();
    }, []);

    const orderData = [
        {
        id: 39,
        product: {
            id: 39,
            name: '새로운 상품',
            price: '10000',
            view_count: 286,
            image_src: 'http://127.0.0.1:8000/media/product/2023/07/04/slide_image_03.png',
        },
        product_option: {
            id: 6,
            option_size: 95,
            option_color: 'Red',
            price: 8000.0,
            delivery_fee: 2.99,
            quantity: 30,
        },
        brand: {
            id: 1,
            name: '나이키',
            description: '운동복 전문점',
            logo_img: 'http://127.0.0.1:8000/media/product/2023/07/02/profile.jpg',
            links: '1',
        },
        quantity: 1,
        price: 18000.0,
        },
        {
        id: 40,
        product: {
            id: 39,
            name: '새로운 상품',
            price: '10000',
            view_count: 286,
            image_src: 'http://127.0.0.1:8000/media/product/2023/07/04/slide_image_03.png',
        },
        product_option: {
            id: 5,
            option_size: 100,
            option_color: 'Blue',
            price: 5000.0,
            delivery_fee: 2.99,
            quantity: 30,
        },
        brand: {
            id: 1,
            name: '나이키',
            description: '운동복 전문점',
            logo_img: 'http://127.0.0.1:8000/media/product/2023/07/02/profile.jpg',
            links: '1',
        },
        quantity: 4,
        price: 15000.0,
        },
    ];
    
    
    return (
        <>
            {orderList && <OrderList orderList={orderList} />}
        </>
    )
}


export default OrderHistoryList;