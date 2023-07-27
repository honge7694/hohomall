import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { axiosInstance } from 'api';
import ProductList from 'components/product/ProductList';


const ProductSubType = () => {
    const { type } = useParams();
    console.log('type : ', type)
    const [productList, setProductList] = useState([]);
    const apiUrl = `/product/subtype/?subtype=${type}`;

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
    }, [type]);

    return (
        <div>
            {productList && <ProductList productList={productList} type={type} />}
        </div>
    );
};

export default ProductSubType;