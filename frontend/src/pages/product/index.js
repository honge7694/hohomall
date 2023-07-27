import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './Product';
import ProductDetail from './ProductDetail';
import ProductSubType from './ProductSubType';


const ProductIndex = () => {
    return (
        <>
            <Routes>
                {/* <Route path='/' element={ <Product /> }></Route> */}
                <Route path='/:type' element={ <Product /> } />
                <Route path='/:maintype/:type' element={ <ProductSubType /> } />
                <Route path='/detail/:id' element={ <ProductDetail /> }></Route>
            </Routes>
        </>
    );
}

export default ProductIndex;