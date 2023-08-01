import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Row, Col, Card, Typography } from 'antd';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import AdminProductList from 'components/admin/AdminProductList';


const { Title } = Typography;

const AdminProductListPage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [adminAllProducts, setAdminAllProducts] = useState();


    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const { data } = await axiosInstance.get('/product/');
                console.log("allProducts data", data);
                setAdminAllProducts(data);
            }catch(error){
                console.log('allProducts error : ', error);
            }
        }
        fetchAllProducts();
    }, [])

    return (
        <div>
            {/* 전체 상품 */}
            { adminAllProducts && <AdminProductList productList={adminAllProducts} /> }
        </div>
    );
};

export default AdminProductListPage;
