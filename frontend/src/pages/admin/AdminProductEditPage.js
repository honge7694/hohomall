import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AdminProductEdit from 'components/admin/AdminProductEdit'; 
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';

const AdminProductEditPage = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();

    const [brandList, setBrandList] = useState();
    const [productData, setProductData] = useState();

    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
        const fetchBrandList = async () => {
            try {
                const { data } = await axiosInstance.get('product/brand/')
                console.log('brandList Data : ', data);
                setBrandList(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchBrandList();

        const fetchProductData = async () => {
            try {
                const { data } = await axiosInstance.get(`product/detail/${id}/`)
                console.log('productDetail Data : ', data);
                setProductData(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchProductData();
    }, [])

    return (
        <>
            {brandList && productData && <AdminProductEdit brandList={brandList} productData={productData} />}
        </>
    );
};

export default AdminProductEditPage;
