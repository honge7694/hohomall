import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartList from './CartList';


const CartIndex = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={ <CartList /> }></Route>
            </Routes>
        </>
    );
}

export default CartIndex;