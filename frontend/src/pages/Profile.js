import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import { axiosInstance } from 'api';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useAppContext } from 'store';
import { userState } from 'state';
import UserInfoEdit from 'components/profile/UserInfoEdit';
import UserPasswordEdit from 'components/profile/UserPasswordEdit';
import UserProfile from 'components/profile/UserProfile';
import RecentViewed from 'components/profile/RecentViewed';

function Profile() {
  const [selectedTab, setSelectedTab] = useState("a"); // Tab State

  const [userInfo, setUserInfo] = useState([]); // UserInfo State
  const [recentView, setRecentView] = useState([]); // UserInfo State
  const user = useRecoilValue(userState);
  const user_id = user['userId'];
  const resetUser = useResetRecoilState(userState);
  const history = useNavigate();

  const apiUrl = `/account/info/${user_id}`;
  const { store: token } = useAppContext();
  const headers = { Authorization: `Bearer ${token['jwtToken']}`};
  

  useEffect(() => {
    // 유저 정보 불러오기.
    async function fetchUserInfo() {
      try{
        const { data } = await axiosInstance.get(apiUrl, {headers});
        console.log("user_data :", data);
        setUserInfo(data);
      }catch(error){
        console.log('user_data error : ', error);
        resetUser();
        history('/sign-in');
      }
    }
    fetchUserInfo();

    // 최근 본 상품 불러오기
    async function fetchRecentViewed() {
      try{
        const { data } = await axiosInstance.get('account/recent/viewed/', {headers});
        console.log("recent_data :", data);
        setRecentView(data);
      }catch(error){
        console.log('recent_data error : ', error);
        resetUser();
        history('/sign-in');
      }
    }
    fetchRecentViewed();
  }, []);

  const handleTabChange = (e) => {
    setSelectedTab(e.target.value);
  };

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={userInfo.image_src} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{userInfo.email}</h4>
                  <p>{userInfo.nickname}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue={selectedTab} onChange={handleTabChange}>
                <Radio.Button value="a">Profile</Radio.Button>
                <Radio.Button value="b">회원정보 수정</Radio.Button>
                <Radio.Button value="c">비밀번호 변경</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      >
      </Card>


      {selectedTab === "a" && <UserProfile data={{userInfo}}  />}
      {selectedTab === "b" && <UserInfoEdit data={{userInfo, setUserInfo}} />}
      {selectedTab === "c" && <UserPasswordEdit data={{userInfo}}/>}

      {recentView && <RecentViewed recentView={recentView} />}

    </>
  );
}

export default Profile;
