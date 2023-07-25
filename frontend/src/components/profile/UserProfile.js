import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { axiosInstance } from 'api';
import { useAppContext } from 'store';

import {
    Row,
    Col,
    Card,
    Button,
    List,
    Descriptions,
    Avatar,
    Radio,
    Switch,
    Upload,
    message,
} from "antd";
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";

import UserProfileCartList from './UserProfileCartList';
import UserProfileReviewList from './UserProfileReviewList';
import UserProfileOrderList from './UserProfileOrderList';
const UserProfile = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const [cartList, setCartList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [reviewList, setReviewList] = useState([]);

    const pencil = [
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
        <path
            d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
            className="fill-gray-7"
        ></path>
        <path
            d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
            className="fill-gray-7"
        ></path>
        </svg>,
    ];
    

    useEffect(() => {
        async function fetchCart() {
            try{
                const apiUrl = `order/cart/`;
                const { data } = await axiosInstance.get(apiUrl, { headers });
                console.log("cart_data :", data);
                setCartList(data);
            }catch(error){
                console.log('cart_error : ', error);
            }
        }
        fetchCart();

        const fetchOrder = async () => {
            try{
                const apiUrl = `order/`
                const { data } = await axiosInstance.get(apiUrl, { headers });
                console.log("order_data : ", data);
                setOrderList(data)
            }catch(error){
                console.log('order_error : ', error);
            }
        }
        fetchOrder();

        const fetchReview = async () => {
            try{
                const apiUrl = `review/list/`
                const { data } = await axiosInstance.get(apiUrl, { headers });
                console.log("review_data : ", data);
                setReviewList(data)
            }catch(error){
                console.log('review_error : ', error);
            }
        }
        fetchReview();
    }, []);

    return (
        <>
            <Row gutter={[24, 0]}>
                
                {cartList && <UserProfileCartList cartList={cartList} />}

                {orderList && <UserProfileOrderList orderList={orderList} />}

                {reviewList && <UserProfileReviewList reviewList={reviewList} />}
            </Row>

        </>
    )
}

export default UserProfile;