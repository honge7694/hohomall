import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AdminProductNew from 'components/admin/AdminProductNew'; 

import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';


const AdminProductNewPage = () => {
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const history = useNavigate();
    
    const [brandList, setBrandList] = useState();

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
    }, [])

    return (
        <>
            {brandList && <AdminProductNew brandList={brandList} />}
        </>
    );
};

export default AdminProductNewPage;
