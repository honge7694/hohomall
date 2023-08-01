import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Order from './Order';
import OrderHistory from './OrderHistory';
import OrderHistoryList from './OrderHistoryList';
import OrderHistoryDetail from './OrderHistoryDetail';


const OrderIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <Order /> }></Route>
                <Route path='/history' element={ <OrderHistory /> }></Route>
                <Route path='/list' element= { <OrderHistoryList /> }></Route>
                <Route path='/detail/:id' element={ <OrderHistoryDetail /> }></Route>
            </Routes>
        </>
    );
}

export default OrderIndex;