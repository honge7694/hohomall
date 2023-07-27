import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Card, Button, List, Avatar } from "antd";
import Rating from 'react-rating-stars-component';
import moment from "moment";
import "../../assets/styles/scroll.css";


const UserProfileReviewList = ({reviewList}) => {
    console.log('reviewList : ', reviewList);
    const history = useNavigate();

    return (
        <>
            <Col span={24} md={8} className="mb-24 ">
                <Card
                    bordered={false}
                    className="header-solid h-full"
                    title={<h6 className="font-semibold m-0">리뷰 목록</h6>}
                >
            <div className='scroll box1' style={{ maxHeight: '470px', overflowY: 'auto' }}> {/* 스크롤 스타일 적용 */}
                    <List
                        itemLayout="horizontal"
                        dataSource={reviewList}
                        split={false}
                        className="conversations-list"
                        renderItem={(item) => (
                            <List.Item actions={[<Button type="link" onClick={() => history('/product/detail/' + item.product.id)}>이동</Button>]}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar shape="square" size={48} src={item.images[0] ? item.images[0].image_src : null} />
                                }
                                title={
                                    <>
                                    <Rating
                                        count={5}
                                        value={item.rating}
                                        size={24}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />
                                    {moment(item.created_at, "YYYY-MM-DD").format("YYYY-MM-DD")}
                                    </>
                                }
                                
                                description={
                                    <>
                                        {item.content}
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

export default UserProfileReviewList;