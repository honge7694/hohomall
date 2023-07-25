import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Card, Button, List, Avatar } from "antd";
import "../../assets/styles/scroll.css";


const UserProfileCartList = ({cartList}) => {
    console.log('cartList : ', cartList);
    const history = useNavigate();

    return (
        <>
            <Col span={24} md={8} className="mb-24 ">
                <Card
                    bordered={false}
                    className="header-solid h-full"
                    extra={<Button type="link" onClick={() => history('/cart')}>이동</Button>}
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

export default UserProfileCartList;