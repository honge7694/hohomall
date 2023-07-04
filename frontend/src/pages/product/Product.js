import React, { useEffect, useState } from 'react';
import { axiosInstance } from 'api';
import ProductList from 'components/product/ProductList';


const Product = () => {
    const [productList, setProductList] = useState([]);
    const apiUrl = `/product/`;

    useEffect(() => {
        async function fetchProduct() {
            try{
                const { data } = await axiosInstance.get(apiUrl);
                console.log("product_data :", data);
                setProductList(data);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchProduct();
    }, []);

    return (
        <div>
            {productList && <ProductList productList={productList} />}
        </div>
    );
};

export default Product;