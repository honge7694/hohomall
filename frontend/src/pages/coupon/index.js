import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CouponPage from './CouponPage';
import CouponNewPage from './CouponNewPage';
import CouponEditPage from './CouponEditPage';


const CouponIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <CouponPage /> } />
                <Route path='/new' element={ <CouponNewPage /> } />
                <Route path='/edit/:id' element={ <CouponEditPage /> }></Route>
            </Routes>
        </>
    );
}

export default CouponIndex;