import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Carousel, Row, Col, Card, Typography } from 'antd';


import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import AdminBrandList from './../../components/admin/AdminBrandList';


const { Title } = Typography;

const AdminBrandListPage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();
    

    const [brandList, setBrandList] = useState();


    useEffect(() => {
        const fetchBrandList = async () => {

            if (!user['isAdmin']){
                resetUser();
                history('/sign-in');
            }

            try{
                const { data } = await axiosInstance.get('/product/brand/');
                console.log("BrandList data", data);
                setBrandList(data);
            }catch(error){
                console.log('BrandList error : ', error);
            }
        }
        fetchBrandList();
    }, [])

    return (
        <div>
            {/* 전체 상품 */}
            { brandList && <AdminBrandList brandList={brandList} /> }
        </div>
    );
};

export default AdminBrandListPage;
