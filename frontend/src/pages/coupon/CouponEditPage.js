import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography } from 'antd';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import CouponEdit from 'components/coupon/CouponEdit';


const { Title, Text } = Typography;

const CouponEditPage = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    
    const [couponData, setCouponData] = useState();

    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
        
        async function fetchCouponDetail() {
            
            try{
                const { data } = await axiosInstance.get(`/coupon/${id}/`, { headers });
                console.log("couponData :", data);
                setCouponData(data);
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
        fetchCouponDetail();
    }, []);

    return (
        <>
            {couponData && <CouponEdit couponData={couponData}/>}
        </>
    );
};

export default CouponEditPage;
