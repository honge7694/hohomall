import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { deleteToken, useAppContext } from 'store';

import { FiLogOut } from "react-icons/fi";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "")
  const [TSHIRTSSubMenuVisible, setTSHIRTSSubMenuVisible] = useState(false);
  const [SHIRTSSubMenuVisible, setSHIRTSSubMenuVisible] = useState(false);
  const [PANTSSubMenuVisible, setPANTSSubMenuVisible] = useState(false);


  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const qna = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
      d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
      fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      />
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  const logout = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z" fill="#1890ff"></path>
    </svg>,
  ];

  // 유저상태
  const user = useRecoilValue(userState);  
  let linkElement;

  const resetUser = useResetRecoilState(userState);
  const { dispatch } = useAppContext();

  if (user['userId'] !== null){
    linkElement = (
      <>
        <Menu.Item key="10">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="9">
          <NavLink to="/sign-in" onClick={() => {resetUser(); dispatch(deleteToken());}}>
            <span className="icon">{logout}</span>
            <span className="label">Logout</span>
          </NavLink>
        </Menu.Item>
      </>
    )
  }else {
    linkElement = (
      <>
        <Menu.Item key="8">
          <NavLink to="/sign-in">
            <span className="icon">{signin}</span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item>
      </>
    )
  }

   // 상의 하위 메뉴 데이터 정의
  const T_SHIRTSMenuData = [
    { key: '1-1', label: 'SHORT SLEEVE' },
    { key: '1-2', label: 'LONG SLEEVE' },
    { key: '1-3', label: 'SLEEVE LESS' },
    { key: '1-4', label: 'PK T-SHIRTS' },
    { key: '1-5', label: 'HOOD T-SHIRTS' },
    { key: '1-6', label: 'MTM' },
    { key: '1-7', label: 'KNIT' },
  ];

  // 상의 하위 메뉴 보이기/숨기기 상태를 토글
  const handleT_SHIRTSMenuDataClick = () => {
    setTSHIRTSSubMenuVisible((prevVisible) => !prevVisible);
  };

  // 셔츠 하위 메뉴 데이터 정의
  const SHIRTSMenuData = [
    { key: '2-1', label: 'BASIC SHIRTS'},
    { key: '2-2', label: 'CHECK SHIRTS'},
    { key: '2-3', label: '1/2 SHIRTS'},
  ];

  // 셔츠 하위 메뉴 보이기/숨기기 상태를 토글
  const handleSHIRTSMenuDataClick = () => {
    setSHIRTSSubMenuVisible((prevVisible) => !prevVisible);
  };

  // 하의 하위 메뉴 데이터 정의
  const PANTSMenuData = [
    { key: '3-1', label: 'JEANS'},
    { key: '3-2', label: 'COTTON PANTS'},
    { key: '3-3', label: 'SLACKS'},
    { key: '3-4', label: 'SHORT PANTS'},
    { key: '3-5', label: 'TRAINING PANTS'},
  ];

  // 하의 하위 메뉴 보이기/숨기기 상태를 토글
  const handlePANTSMenuDataClick = () => {
    setPANTSSubMenuVisible((prevVisible) => !prevVisible);
  };
  

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>HoHoMall</span>
      </div>
      <hr />

      <Menu theme="light" mode="inline" className='scroll box1' style={{ maxHeight: '700px', overflowY: 'auto' }}>        
        {user['isAdmin'] === true ? (
          <>
            <Menu.Item className="menu-item-header" key="5">
              Admin Pages
            </Menu.Item>

              <Menu.Item key="13">
                <NavLink to="/admin/order">
                  <span
                    className="icon"
                    style={{
                      background: page === "/admin/order" ? color : "",
                    }}
                  >
                    {dashboard}
                  </span>
                  <span className="label">Order</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="16">
                <NavLink to="/admin/product">
                  <span
                    className="icon"
                    style={{
                      background: page === "/admin/product" ? color : "",
                    }}
                  >
                    {dashboard}
                  </span>
                  <span className="label">Product</span>
                </NavLink>
              </Menu.Item>
              
              <Menu.Item key="15">
                <NavLink to="/admin/brand">
                  <span
                    className="icon"
                    style={{
                      background: page === "/admin/brand" ? color : "",
                    }}
                  >
                    {dashboard}
                  </span>
                  <span className="label">Brand</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="17">
                <NavLink to="/admin/user">
                  <span
                    className="icon"
                    style={{
                      background: page === "/admin/user" ? color : "",
                    }}
                  >
                    {dashboard}
                  </span>
                  <span className="label">User</span>
                </NavLink>
              </Menu.Item>

             

            <Menu.Item className="menu-item-header" key="5">
              User Pages
            </Menu.Item>
          </>
        ) : (
          null
        )
      }


      
        <Menu.Item key="1">
          <NavLink to="/">
            <span
              className="icon"
              style={{
                background: page === "/" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Main</span>
          </NavLink>
        </Menu.Item>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="2" onClick={handleT_SHIRTSMenuDataClick}>
            <NavLink to="product/T-SHIRTS">
              <span className="icon" style={{ background: page.startsWith('product/T-SHIRTS') ? color : '' }}>
                {dashboard}
              </span>
              <span className="label">T-SHIRTS</span>
            </NavLink>
          </Menu.Item>
          {/* 하위 메뉴 렌더링 */}
          {TSHIRTSSubMenuVisible && (
            <Menu.Item key="sub1">
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1-1']}>
                {T_SHIRTSMenuData.map((item) => (
                  <Menu.Item key={item.key}>
                    <NavLink to={`/product/T-SHIRTS/${item.label}`}>
                      <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu>
            </Menu.Item>
          )}
        </Menu>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
          <Menu.Item key="3" onClick={handleSHIRTSMenuDataClick}>
            <NavLink to="product/SHIRTS">
              <span className="icon" style={{ background: page.startsWith('product/SHIRTS') ? color : '' }}>
                {dashboard}
              </span>
              <span className="label">SHIRTS</span>
            </NavLink>
          </Menu.Item>
          {/* 하위 메뉴 렌더링 */}
          {SHIRTSSubMenuVisible && (
            <Menu.Item key="sub2">
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['2-1']}>
                {SHIRTSMenuData.map((item) => (
                  <Menu.Item key={item.key}>
                    <NavLink to={`/product/SHIRTS/${item.label}`}>
                      <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu>
            </Menu.Item>
          )}
        </Menu>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
          <Menu.Item key="4" onClick={handlePANTSMenuDataClick}>
            <NavLink to="product/PANTS">
              <span className="icon" style={{ background: page.startsWith('product/PANTS') ? color : '' }}>
                {dashboard}
              </span>
              <span className="label">PANTS</span>
            </NavLink>
          </Menu.Item>
          {/* 하위 메뉴 렌더링 */}
          {PANTSSubMenuVisible && (
            <Menu.Item key="sub3">
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['3-1']}>
                {PANTSMenuData.map((item) => (
                  <Menu.Item key={item.key}>
                    <NavLink to={`/product/PANTS/${item.label}`}>
                      <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu>
            </Menu.Item>
          )}
        </Menu>
                        
        <Menu.Item className="menu-item-header" key="6">
          Account Pages
        </Menu.Item>
        { linkElement }

        <Menu.Item className="menu-item-header" key="5">
          ECT Pages
        </Menu.Item>

        <Menu.Item key="12">
          <NavLink to="/coupon">
            <span
              className="icon"
              style={{
                background: page === "coupon" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Coupon</span>
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="11">
          <NavLink to="/qna">
            <span
              className="icon"
              style={{
                background: page === "qna" ? color : "",
              }}
            >
              {qna}
            </span>
            <span className="label">QnA</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sign-in">
            <span className="icon">{signin}</span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item> */}
      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;
