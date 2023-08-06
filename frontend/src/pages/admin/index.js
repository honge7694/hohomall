import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOrderPage from './AdminOrderPage';
import AdminOrderDetailPage from './AdminOrderDetailPage';
import AdminProductListPage from './AdminProductListPage';
import AdminProductNewPage from './AdminProductNewPage'
import AdminProductEditPage from './AdminProductEditPage'
import AdminUserListPage from './AdminUserListPage';
import AdminBrandListPage from './AdminBrandListPage';
import AdminBrandDetailPage from './AdminBrandDetailPage';
import AdminBrandNewPage from './AdminBrandNewPage';
import AdminBrandEditPage from './AdminBrandEditPage';


const AdminIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/order' element={ <AdminOrderPage /> }></Route>
                <Route path='/order/detail/:id' element={ <AdminOrderDetailPage /> }></Route>
                <Route path='/product' element={ <AdminProductListPage /> }></Route>
                <Route path='/product/new' element={ <AdminProductNewPage /> }></Route>
                <Route path='/product/edit/:id' element={ <AdminProductEditPage /> }></Route>
                <Route path='/user' element={ <AdminUserListPage /> }></Route>
                <Route path='/brand' element={ <AdminBrandListPage />}></Route>
                <Route path='/brand/detail/:id' element={ <AdminBrandDetailPage />}></Route>
                <Route path='/brand/new' element={ <AdminBrandNewPage /> }></Route>
                <Route path='/brand/:id/edit' element={ <AdminBrandEditPage /> }></Route>
            </Routes>
        </>
    );
}

export default AdminIndex;