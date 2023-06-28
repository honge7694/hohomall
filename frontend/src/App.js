import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "./index.scss";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  // TODO: 삭제 예정.
  return (
    <div className="App">
        <Routes>
          <Route path="/sign-up" element={<SignUp/> }/>
          <Route path="/sign-in" element={<SignIn/> }/>
          <Route element={<Main />}>
              <Route path="/dashboard" element={<Home/> }/>
              <Route path="/tables" element={<Tables/> }/>
              <Route path="/billing" element={<Billing/> }/>
              <Route path="/profile" element={<Profile/> }/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
