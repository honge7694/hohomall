import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Tables from "pages/Tables";
import Billing from "pages/Billing";
import Profile from "pages/Profile";
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import Main from "components/layout/Main";
import { RecoilRoot } from 'recoil';
import "../index.scss";
import "assets/styles/main.css";
import "assets/styles/responsive.css";

const Root = () => {
    return (
        <RecoilRoot>
        <div className="App">
            <Routes>
                <Route path="/sign-up" element={<SignUp/> }/>
                <Route path="/sign-in" element={<SignIn/> }/>
                <Route  path="/" element={<Main />}>
                    <Route path="/dashboard" element={<Home/> }/>
                    <Route path="/tables" element={<Tables/> }/>
                    <Route path="/billing" element={<Billing/> }/>
                    <Route path="/profile" element={<Profile/> }/>
                </Route>
            </Routes>
        </div>
        </RecoilRoot>
    );
};

export default Root;
