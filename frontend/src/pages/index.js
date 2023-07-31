import { Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import Profile from "pages/Profile";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import Main from "components/layout/Main";
import { RecoilRoot } from 'recoil';
import "../index.scss";
import "assets/styles/main.css";
import "assets/styles/responsive.css";
import ProductIndex from './product/index';
import CartIndex from './cart';
import OrderIndex from './order/index';
import BoardIndex from './board';
import CouponIndex from './coupon'
import AdminIndex from './admin/index';


const Root = () => {
    return (
        <RecoilRoot>
        <div className="App">
            <Routes>
                <Route path="/sign-up" element={<SignUp/> }/>
                <Route path="/sign-in" element={<SignIn/> }/>
                <Route  path="/" element={<Main/> }>
                    <Route index element={<HomePage/> }/>
                    <Route path="/profile" element={<Profile/> }/>
                    <Route path="/product/*" element={<ProductIndex/> }/>
                    <Route path="/cart/*" element={<CartIndex/> }/>
                    <Route path="/order/*" element={<OrderIndex/> }/>
                    <Route path="/qna/*" element={<BoardIndex/> }/>
                    <Route path="/coupon/*" element={<CouponIndex/> }/>
                    <Route path="/admin/*" element={ <AdminIndex />}/>
                </Route>
            </Routes>
        </div>
        </RecoilRoot>
    );
};

export default Root;
