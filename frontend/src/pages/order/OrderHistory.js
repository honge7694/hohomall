import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Row, Col, Typography, Divider } from 'antd';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Text } = Typography;


const OrderHistory = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    console.log('user : ', user);

    const location = useLocation();
    const orderData = location.state;
    console.log('orderData -> orderHistoryData : ', orderData);

    useEffect(() => {
        // async function fetchUserInfo(){
        // try{
        //     const { data } = await axiosInstance.get(`/account/info/${user['userId']}/`, { headers });
        //     console.log('UserInfo Data : ', data);
        //     setUserInfo(data);
        // }catch(error){
        //     console.log('UserInfo Error : ', error);
        //     resetUser();
        //     history('/sign-in');
        // }
        // }
        // fetchUserInfo();
    }, []);

    const handleHomeButton = () => {
        history('/');
    }

    return (
        <div>
            <h2>주문 상품 정보</h2>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <Row gutter={16}>
                    <Col span={4}>
                    <h3>사진</h3>
                    </Col>
                    <Col span={4}>
                    <h3>상품 정보</h3>
                    </Col>
                    <Col span={3}>
                    <h3>옵션</h3>
                    </Col>
                    <Col span={3}>
                    <h3>수량</h3>
                    </Col>
                    <Col span={3}>
                    <h3>가격</h3>
                    </Col>
                    <Col span={3}>
                    <h3>총 가격</h3>
                    </Col>
                </Row>
            </div>
            {orderData.order_data.map(item => (
                <div key={item.id} style={{ marginBottom: '16px', textAlign: 'center' }}>
                <Row gutter={16}>
                    <Col span={4}>
                    <img src={item.product_image} alt="Product" style={{ maxHeight: '60px' }} />
                    </Col>
                    <Col span={4}>
                    <p>{item.product.name} ({item.product.brand.name})</p>
                    </Col>
                    <Col span={3}>
                    <p>{item.product_option.option_color} ({item.product_option.option_size})</p>
                    </Col>
                    <Col span={3}>
                    <p>{item.quantity}</p>
                    </Col>
                    <Col span={3}>
                    <p>{item.price.toLocaleString()} 원</p>
                    </Col>
                    <Col span={3}>
                    <p>{(item.price * item.quantity).toLocaleString()} 원</p>
                    </Col>
                </Row>
                </div>
            ))}

            <Divider />
            <div style={{ margin: '16px 0' }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <h2>배송지 정보</h2>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>수령인</Text>
                            </div>
                            <div style={{ flexShrink: 0, width: 300 }}>
                                {orderData.recipient}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>연락처</Text>
                            </div>
                            <div style={{ flexShrink: 0, width: 300 }}>
                                {orderData.contact}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>우편 번호</Text>
                            </div>
                            <div style={{ marginRight: '30px', width: 300 }}>
                                {orderData.postcode}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>배송지 주소</Text>
                            </div>
                            <div>
                                {orderData.address}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>상세주소</Text>
                            </div>
                            <div>
                                {orderData.detail_address}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>배송메모</Text>
                            </div>
                            <div style={{ flexShrink: 0, width: 300 }}>
                                {orderData.memo}
                            </div>
                        </div>
                    </Col>

                    <Col span={8}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h2>결제 상세</h2>
                        </div>
                        <div style={{ fontSize: 18 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 15 }}>주문금액</Text>
                                </div>
                                <div style={{ width: '100px',textAlign: 'right'}}>
                                    +  {(orderData.total_product_price.toLocaleString())}원
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>배송비</Text>
                            </div>
                            <div style={{ width: '100px',textAlign: 'right'}}>
                                + 3,000 원
                            </div >
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 15 }}>쿠폰할인</Text>
                            </div>
                            <div style={{ width: '100px',textAlign: 'right'}}>
                            -  {orderData.discount_price.toLocaleString()}원
                            </div >
                        </div>
                        <Divider />

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 23, color: 'blue', fontSize: '20px' }}>총 결제 금액</Text>
                            </div>
                            <div style={{ width: '100px',textAlign: 'right',}}>
                            +  {orderData.total_price.toLocaleString()}원
                            </div >
                        </div>
                    </Col>
                </Row>
            </div>

            <div>
                <Button type="primary" onClick={handleHomeButton} >
                    홈으로
                </Button>
            </div>
        </div>
    );
};

export default OrderHistory;
