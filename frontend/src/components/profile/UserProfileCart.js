import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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


import convesionImg from "assets/images/face-3.jpg";
import convesionImg2 from "assets/images/face-4.jpg";
import convesionImg3 from "assets/images/face-5.jpeg";
import convesionImg4 from "assets/images/face-6.jpeg";
import convesionImg5 from "assets/images/face-2.jpg";
import "../../assets/styles/scroll.css";


const UserProfileCart = ({cartList}) => {
    console.log('cartList : ', cartList);
    const history = useNavigate();

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
        {
            title: "Nick Daniel",
            avatar: convesionImg5,
            description: "Hi! I need more information…",
        },
        {
            title: "Nick Daniel",
            avatar: convesionImg5,
            description: "Hi! I need more information…",
        },
        {
            title: "Nick Daniel",
            avatar: convesionImg5,
            description: "Hi! I need more information…",
        },
    ];

    return (
        <>
            <Col span={24} md={8} className="mb-24 ">
                <Card
                    bordered={false}
                    className="header-solid h-full"
                    extra={<Button type="link">이동</Button>}
                    title={<h6 className="font-semibold m-0">찜 목록</h6>}
                >
            <div className='scroll box1' style={{ maxHeight: '470px', overflowY: 'auto' }}> {/* 스크롤 스타일 적용 */}
                    <List
                        itemLayout="horizontal"
                        dataSource={cartList}
                        split={false}
                        className="conversations-list"
                        renderItem={(item) => (
                            <List.Item actions={[<Button type="link" onClick={() => history('/product/' + item.product.id)}>이동</Button>]}>
                            <List.Item.Meta
                                avatar={
                                <Avatar shape="square" size={48} src={item.product_image} />
                                }
                                title={item.product.name}
                                description={
                                    <>
                                        {item.product_option.option_color}  {item.product_option.option_size}  {item.price.toLocaleString() }원
                                    </>
                                } 
                            />
                            </List.Item>
                        )}
                        />
                </div>
                </Card>
            </Col>
        </>
    )
}

export default UserProfileCart;