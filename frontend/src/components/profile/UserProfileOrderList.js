import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Card, Button, List, Avatar } from "antd";
import Rating from 'react-rating-stars-component';
import moment from "moment";
import "../../assets/styles/scroll.css";


const UserProfileOrderList = ({orderList}) => {
    console.log('orderList : ', orderList);
    const history = useNavigate();

    return (
        <>
            <Col span={24} md={8} className="mb-24 ">
                <Card
                    bordered={false}
                    className="header-solid h-full"
                    extra={<Button type="link" onClick={() => history('/order/list/')}>이동</Button>}
                    title={<h6 className="font-semibold m-0">주문 목록</h6>}
                >
            <div className='scroll box1' style={{ maxHeight: '470px', overflowY: 'auto' }}> {/* 스크롤 스타일 적용 */}
                    <List
                        itemLayout="horizontal"
                        dataSource={orderList}
                        split={false}
                        className="conversations-list"
                        renderItem={(item) => (
                            <List.Item actions={[<Button type="link" onClick={() => history('/order/list/' + item.id)}>이동</Button>]}>
                            <List.Item.Meta
                                title={
                                    <>
                                        {item.order_details[0].product.name}{' '}
                                        {item.order_details.length > 1 ? `외 ${item.order_details.length - 1}` : null}  
                                    </>
                                }
                                
                                description={
                                    <>
                                        {item.total_price.toLocaleString()} 원
                                        <div>
                                            {moment(item.created_at, "YYYY-MM-DD").format("YYYY-MM-DD")}
                                        </div>
                                        {/* {item.content} */}
                                        {/* {item.product_option.option_color}  {item.product_option.option_size}  {item.price.toLocaleString() }원 */}
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

export default UserProfileOrderList;