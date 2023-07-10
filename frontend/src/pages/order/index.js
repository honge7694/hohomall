import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Order from './Order';


const OrderIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Order /> }></Route>
            </Routes>
        </>
    );
}

export default OrderIndex;