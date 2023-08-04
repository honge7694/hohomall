import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, Typography, Divider, notification, Select } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';


const { Text } = Typography;
const { Option } = Select;

const AdminOrderDetailPage = () => {
    const { id } = useParams();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    
    const [orderDetail, setOrderDetail] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [api, setApi] = notification.useNotification();

    // OrderHistoryDetail Data 가져오기
    useEffect(() => {
        
        if (!user['isAdmin']){
            resetUser();
            history('/sign-in');
        }

        const fetchOrderDetail = async () => {
            try {
                const { data } = await axiosInstance.get(`/order/detail/${id}/`, { headers });
                setOrderDetail(data);
                console.log(data);

                 // orderDetail이 정의된 후에 orderStatus를 설정
                if (data) {
                    data.order_details.map((detail) => (
                        setOrderStatus(detail.status)
                    ))
                    setOrderStatus(data.order_details[0].status[0]);
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchOrderDetail();
    }, []);

    // 주문금액 총 합 함수
    const totalPrice = orderDetail?.order_details.reduce(
        (sum, detail) => sum + (detail.price * detail.quantity),
        0
    ) || 0;


    // 주문 배송상태 수정
    const handleUpdateOrderStatus = () => {
        const fetchOrderStatus = async () => {
            try {
                console.log('orderDetail : ', orderDetail);
                const response = await axiosInstance.patch(`/order/detail/${id}/`, orderDetail, { headers });
                console.log(response);

                api.info({
                    message: '배송상태 수정이 완료되었습니다.',
                    icon: <SmileOutlined style={{ color: "#108ee9" }}/>  
                });

                const updatedOrderDetail = response.data;
                setOrderDetail(updatedOrderDetail);
                
                // history('/order/list');
            }catch(error){
                console.log(error);
            }
        }
        fetchOrderStatus();
    };
    
    // 이전으로 버튼
    const handleGoHome = () => {
        // 홈으로 이동하는 로직을 구현
        history('/admin/order');
    };

    // 배송 상태 변경
    const handleOrderStatusMethodChange = (orderId, newStatus) => {
        setOrderDetail(prevOrderDetail => {
            // orderDetail의 각 항목을 확인하면서 orderId에 해당하는 데이터의 status를 업데이트
            const updatedOrderDetails = prevOrderDetail.order_details.map(item => {
                if (item.id === orderId) {
                    // 기존 item의 status 배열이 아닌 새로운 status 배열을 생성하여 업데이트
                    const updatedStatus = [{ ...item.status[0], status: newStatus }];
                    return { ...item, status: updatedStatus };
                }
                return item;
            });
        
            return { ...prevOrderDetail, order_details: updatedOrderDetails };
        });
    };

    return (
        <>
            {setApi}
            <h2>주문 내역</h2>
            <div style={{ marginBottom: '16px' }}>
                <div style={{ textAlign: 'center'}}>
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
                        <Col span={3}>
                            <h3>배송상태</h3>
                        </Col>
                    </Row>
                </div>
                {orderDetail && orderDetail.order_details.map(item => (
                    <div key={item.id} style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <Row gutter={16}>
                            <Col span={4}>
                                <img src={item.product.image_src} alt="Product" style={{ maxHeight: '60px' }} />
                            </Col>
                            <Col span={4}>
                                <p>{item.product.name} ({item.brand.name})</p>
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
                            <Col span={3}>
                            {/* item.status[0].status */}
                                <Select defaultValue={item.status[0].status} onChange={(value) => handleOrderStatusMethodChange(item.id, value)} style={{ width: '200px' }}>
                                    <Option value="배송준비중">배송준비중</Option>
                                    <Option value="배송중">배송중</Option>
                                    <Option value="배송완료">배송완료</Option>
                                </Select>
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
                                    {orderDetail && orderDetail.recipient}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 15 }}>연락처</Text>
                                </div>
                                <div style={{  width: 300 }}>
                                    {orderDetail && orderDetail.contact}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 15 }}>우편 번호</Text>
                                </div>
                                <div style={{ marginRight: '30px', width: 300 }}>
                                    {orderDetail && orderDetail.postcode}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 15 }}>배송지 주소</Text>
                                </div>
                                <div>
                                    {orderDetail && orderDetail.address}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 15 }}>상세주소</Text>
                                </div>
                                <div>
                                    {orderDetail && orderDetail.detail_address}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 15 }}>배송메모</Text>
                                </div>
                                <div style={{ flexShrink: 0, width: 300 }}>
                                    {orderDetail && orderDetail.memo}
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
                                        +  {totalPrice.toLocaleString()} 원
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
                                -  {orderDetail && orderDetail.discount_price.toLocaleString()}원
                                </div >
                            </div>
                            <Divider />

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ flexShrink: 0, width: 200 }}>
                                    <Text style={{ fontSize: 23, color: 'blue', fontSize: '20px' }}>총 결제 금액</Text>
                                </div>
                                <div style={{ width: '100px',textAlign: 'right',}}>
                                +  {orderDetail && orderDetail.total_price.toLocaleString()}원
                                </div >
                            </div>
                        </Col>
                    </Row>
                    <Divider/>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button type="primary" onClick={handleUpdateOrderStatus} style={{ marginRight: '8px' }} >배송 상태 수정</Button>
                    <Button onClick={handleGoHome}>이전으로</Button>
                </div>
            </div>
        </>
    )
}

export default AdminOrderDetailPage;