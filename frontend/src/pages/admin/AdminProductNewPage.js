import React, { useState, useEffect } from 'react';
import AdminProductNew from 'components/admin/AdminProductNew'; 

import { axiosInstance } from 'api';
import { useAppContext } from 'store';

const AdminProductNewPage = () => {

    const [brandList, setBrandList] = useState();

    useEffect(() => {
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
