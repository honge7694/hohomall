import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CouponPage from './CouponPage';
import CouponNewPage from './CouponNewPage';


const CouponIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <CouponPage /> } />
                <Route path='/new' element={ <CouponNewPage /> } />
                {/* <Route path='/:maintype/:type' element={ <ProductSubType /> } />
                <Route path='/detail/:id' element={ <ProductDetail /> }></Route> */}
            </Routes>
        </>
    );
}

export default CouponIndex;