import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { axiosInstance } from 'api';
import ProductList from 'components/product/ProductList';


const ProductSearchPage = () => {
    const history = useNavigate();
    const location = useLocation();
    const searchQuery = location.state;

    const [searchList, setSearchList] = useState();

    useEffect(() => {
        async function fetchProduct() {
            try{
                const { data } = await axiosInstance.get(`/product/search/?search=${searchQuery}`);
                console.log("search_data :", data);
                setSearchList(data);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchProduct();
    }, [searchQuery]);

    return (
        <div>
            {searchList && <ProductList productList={searchList} type={searchQuery} />}
        </div>
    );
};

export default ProductSearchPage;