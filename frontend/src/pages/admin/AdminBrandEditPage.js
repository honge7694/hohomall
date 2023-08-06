import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AdminBrandEdit from 'components/admin/AdminBrandEdit'; 
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';

const AdminBrandEditPage = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();

    const [brandData, setBrandData] = useState();
    // const [productData, setProductData] = useState();

    useEffect(() => {
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }
        const fetchBrandList = async () => {
            try {
                const { data } = await axiosInstance.get(`product/brand/${id}/`)
                console.log('brandData : ', data);
                setBrandData(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchBrandList();

        // const fetchProductData = async () => {
        //     try {
        //         const { data } = await axiosInstance.get(`product/detail/${id}/`)
        //         console.log('productDetail Data : ', data);
        //         setProductData(data);
        //     }catch(error){
        //         console.log(error);
        //     }
        // }
        // fetchProductData();
    }, [])

    return (
        <>
            {brandData && <AdminBrandEdit brandData={brandData} />}
        </>
    );
};

export default AdminBrandEditPage;
