import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Order from './Order';
import OrderHistory from './OrderHistory';


const OrderIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Order /> }></Route>
                <Route path='/history' element={ <OrderHistory /> }></Route>
            </Routes>
        </>
    );
}

export default OrderIndex;