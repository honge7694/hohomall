import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOrderPage from './AdminOrderPage';
import AdminOrderDetailPage from './AdminOrderDetailPage';
import AdminProductListPage from './AdminProductListPage';
import AdminProductNewPage from './AdminProductNewPage'


const AdminIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/order' element={ <AdminOrderPage /> }></Route>
                <Route path='/order/detail/:id' element={ <AdminOrderDetailPage /> }></Route>
                <Route path='/product' element={ <AdminProductListPage /> }></Route>
                <Route path='/product/new' element={ <AdminProductNewPage /> }></Route>
            </Routes>
        </>
    );
}

export default AdminIndex;