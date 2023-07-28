import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';

import Coupon from 'components/coupon/Coupon';


const CouponPage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    const [couponList, setCouponList] = useState([]);
    const [couponUserList, setCouponUserList] = useState([]);

    
    useEffect(() => {
        const fetchCouponList = async () => {
            try{
                const { data } = await axiosInstance.get('coupon/');
                console.log('coupon_data : ', data);
                setCouponList(data);
            }catch(error){
                console.log('couponList error : ', error)
            }
        }
        fetchCouponList();

        const fetchCouponUserList = async () => {
            try{
                const { data } = await axiosInstance.get('coupon/user/', { headers });
                console.log('couponUser_data : ', data);
                setCouponUserList(data);
            }catch(error){
                console.log('couponUserList error : ', error);
            }
        }
        fetchCouponUserList();
    }, [])

    return (
        <div>
            {couponList && <Coupon couponList={couponList} couponUserList={couponUserList} setCouponUserList={setCouponUserList}/>}
        </div>
    );
};

export default CouponPage;
