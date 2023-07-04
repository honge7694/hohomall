import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './Product';
import ProductDetail from './ProductDetail';


const ProductIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Product /> }></Route>
                <Route path='/:id' element={ <ProductDetail /> }></Route>
            </Routes>
        </>
    );
}

export default ProductIndex;