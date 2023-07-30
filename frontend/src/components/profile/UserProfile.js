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
import RecentViewed from 'components/profile/RecentViewed';


const UserProfile = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const [cartList, setCartList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [recentView, setRecentView] = useState([]); // UserInfo State


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

        // 최근 본 상품 불러오기
        async function fetchRecentViewed() {
            try{
                const { data } = await axiosInstance.get('account/recent/viewed/', {headers});
                console.log("recent_data :", data);
                setRecentView(data);
            }catch(error){
                console.log('recent_data error : ', error);
            }
        }
        fetchRecentViewed();
    }, []);

    return (
        <>
            <Row gutter={[24, 0]}>
                {cartList && <UserProfileCartList cartList={cartList} />}

                {orderList && <UserProfileOrderList orderList={orderList} />}

                {reviewList && <UserProfileReviewList reviewList={reviewList} />}

            </Row>

            {recentView && <RecentViewed recentView={recentView} />}
        </>
    )
}

export default UserProfile;