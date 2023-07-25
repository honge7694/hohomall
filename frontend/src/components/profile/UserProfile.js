import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { axiosInstance } from 'api';
import { useAppContext } from 'store';

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
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";

import convesionImg from "assets/images/face-3.jpg";
import convesionImg2 from "assets/images/face-4.jpg";
import convesionImg3 from "assets/images/face-5.jpeg";
import convesionImg4 from "assets/images/face-6.jpeg";
import convesionImg5 from "assets/images/face-2.jpg";
import UserProfileCart from './UserProfileCart';
const UserProfile = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const [cartList, setCartList] = useState([]);

    const pencil = [
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
        <path
            d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
            className="fill-gray-7"
        ></path>
        <path
            d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
            className="fill-gray-7"
        ></path>
        </svg>,
    ];
    
    const data = [
        {
            title: "Sophie B.",
            avatar: convesionImg,
            description: "Hi! I need more information…",
        },
        {
            title: "Anne Marie",
            avatar: convesionImg2,
            description: "Awesome work, can you…",
        },
        {
            title: "Ivan",
            avatar: convesionImg3,
            description: "About files I can…",
        },
        {
            title: "Peterson",
            avatar: convesionImg4,
            description: "Have a great afternoon…",
        },
        {
            title: "Nick Daniel",
            avatar: convesionImg5,
            description: "Hi! I need more information…",
        },
    ];

    useEffect(() => {
        async function fetchCart() {
            try{
                const apiUrl = `order/cart/`;
                const { data } = await axiosInstance.get(apiUrl, { headers });
                console.log("cart_data :", data);
                setCartList(data);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchCart();
    }, []);

    return (
        <>
            <Row gutter={[24, 0]}>
                
                {cartList && <UserProfileCart cartList={cartList} />}

                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">주문 목록</h6>}
                        className="header-solid h-full card-profile-information"
                        extra={<Button type="link">{pencil}</Button>}
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        {/* {selectedTab === "a" && <ProfileContent />} */}
                        
                        <p className="text-dark">
                        {" "}
                        Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
                        is no. If two equally difficult paths, choose the one more painful
                        in the short term (pain avoidance is creating an illusion of
                        equality).{" "}
                        </p>
                        <hr className="my-25" />
                        <Descriptions title="Oliver Liam">
                        <Descriptions.Item label="Full Name" span={3}>
                            Sarah Emily Jacob
                        </Descriptions.Item>
                        <Descriptions.Item label="Mobile" span={3}>
                            (44) 123 1234 123
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={3}>
                            sarahjacob@mail.com
                        </Descriptions.Item>
                        <Descriptions.Item label="Location" span={3}>
                            USA
                        </Descriptions.Item>
                        <Descriptions.Item label="Social" span={3}>
                            <a href="#pablo" className="mx-5 px-5">
                            {<TwitterOutlined />}
                            </a>
                            <a href="#pablo" className="mx-5 px-5">
                            {<FacebookOutlined style={{ color: "#344e86" }} />}
                            </a>
                            <a href="#pablo" className="mx-5 px-5">
                            {<InstagramOutlined style={{ color: "#e1306c" }} />}
                            </a>
                        </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">작성글 목록</h6>}
                        className="header-solid h-full"
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <List
                        itemLayout="horizontal"
                        dataSource={data}
                        split={false}
                        className="conversations-list"
                        renderItem={(item) => (
                            <List.Item actions={[<Button type="link">REPLY</Button>]}>
                            <List.Item.Meta
                                avatar={
                                <Avatar shape="square" size={48} src={item.avatar} />
                                }
                                title={item.title}
                                description={item.description}
                            />
                            </List.Item>
                        )}
                        />
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default UserProfile;