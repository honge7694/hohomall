import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Carousel, Row, Col, Card, Typography } from 'antd';


import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import AdminBrandDetail from './../../components/admin/AdminBrandDetail';


const AdminBrandDetailPage = () => {
    const { id } = useParams();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();
    

    const [brandProductList, setBrandProductList] = useState();


    useEffect(() => {
        const fetchBrandList = async () => {

            if (!user['isAdmin']){
                resetUser();
                history('/sign-in');
            }

            try{
                const { data } = await axiosInstance.get(`/product/brand/product/?brand_id=${id}`);
                console.log("BrandProductList data", data);
                setBrandProductList(data);
            }catch(error){
                console.log('BrandProductList error : ', error);
            }
        }
        fetchBrandList();
    }, [])

    return (
        <div>
            {/* 전체 상품 */}
            { brandProductList && <AdminBrandDetail brandProductList={brandProductList} /> }
        </div>
    );
};

export default AdminBrandDetailPage;
