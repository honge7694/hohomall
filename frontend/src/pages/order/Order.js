import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { List, Checkbox, InputNumber, Button, Row, Col, Input, Select, Modal, Typography, Divider } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import moment from "moment";

const { Option } = Select;
const { confirm } = Modal;
const { Text } = Typography;

const Order = () => {
  const { store: token } = useAppContext();
  const headers = { Authorization: `Bearer ${token['jwtToken']}`};
  const history = useNavigate();
  const user = useRecoilValue(userState);
  console.log('user : ', user);

  const location = useLocation();
  const cartData = location.state;
  console.log('cartList -> orderData : ', cartData);

  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [couponInfo, setCouponInfo] = useState(); // 쿠폰의 정보 상태관리
  const [brandCoupon, setBrandCoupon] = useState(); // 주문 목록의 브랜드.id와 쿠폰의 브랜드.id 일치하는 쿠폰 상태관리
  const [totalProductPrice, setTotalProductPrice] = useState(0); // 선택한 상품의 가격 상태관리
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    async function fetchUserInfo(){
      try{
        const { data } = await axiosInstance.get(`/account/info/${user['userId']}/`, { headers });
        console.log('UserInfo Data : ', data);
        setUserInfo(data);
      }catch(error){
        console.log('UserInfo Error : ', error);
      }
    }
    fetchUserInfo();

    async function fetchCouponInfo(){
      try{
        const { data } = await axiosInstance.get(`/coupon/user/`, { headers });
        console.log('Coupon Data : ', data);
        setCouponInfo(data);
      }catch(error){
        console.log('Coupon Data Error : ', error);
      }
    }
    fetchCouponInfo();

    const totalPrice = cartData.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
    console.log(totalPrice);
    setTotalProductPrice(totalPrice);
  }, [])

  const handleCouponApply = () => {
    // setSelectedProductPrice(price*quantity); // 선택한 상품의 가격 저장
    // const filteredCoupons = couponInfo.filter(coupon => coupon.coupon.brand_id === brandId); // 쿠폰의 목록 (Coupon.filter(brand_id = 상품의 brand_id))
    // setBrandCoupon(filteredCoupons);
    setCouponModalVisible(true);
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleCouponCancel = () => {
    setSelectedCoupon(null);
    setCouponModalVisible(false);
  };

  const handleCouponApplyConfirm = () => {
    confirm({
      title: '쿠폰 적용',
      content: '쿠폰을 적용하시겠습니까?',
      onOk: () => {
        const discountPrice = selectedCoupon ? selectedCoupon.coupon.discount_rate : 0;
        // const totalPrice = selectedProductPrice; // 해당 항목의 총 가격 계산
        const totalPrice = totalProductPrice; // 해당 항목의 총 가격 계산
        const newDiscountedPrice = totalPrice * (discountPrice / 100);

        setDiscountedPrice(newDiscountedPrice);
        setCouponModalVisible(false);
      },
      onCancel: () => {},
    });
  }; 
  
  const handleShippingAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleOrderClick = () => {
    // Handle order click
  };

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
            {/* <Col span={3}>
              <h3>할인가</h3>
            </Col>
            <Col span={3}>
              <h3>쿠폰</h3>
                Discount information
            </Col> */}
          </Row>
        </div>
      {cartData.map(item => (
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
            {/* <Col span={3}>
              <p>{discountedPrice ? discountedPrice : '할인가 없음'}</p>
            </Col>
            <Col span={3}>
              <Button onClick={() => handleCouponApply(item.product.brand.id, item.price, item.quantity)}>쿠폰 적용</Button>
              {/* Discount information 
            </Col> */}
          </Row>
        </div>
      ))}

      <Divider />
      <div style={{ margin: '16px 0' }}>
        <Row gutter={16}>
          <Col span={16}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2>배송지 정보</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 15 }}>수령인</Text>
                </div>
                <div>
                  <Input
                    placeholder="수령인"
                    value={shippingAddress}
                    onChange={handleShippingAddressChange}
                    style={{ margin: '2px 0' }}
                  />
                </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 15 }}>연락처 1 </Text>
                </div>
                <div>
                  <Input placeholder="연락처1" style={{ margin: '2px 0' }} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 15 }}>우편번호</Text>
                </div>
                <div>
                  <Input placeholder="우편번호" style={{ margin: '2px 0' }} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 15 }}>배송지 주소</Text>
                </div>
                <div>
                  <Input placeholder="배송지 주소" style={{ margin: '2px 0' }} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 15 }}>상세주소</Text>
                </div>
                <div>
                  <Input placeholder="상세주소" style={{ margin: '2px 0' }} />
                </div>
            </div>
            
          </Col>
          <Col span={8}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2>유저 정보</h2>
            </div>
            {/* User information */}
            <div style={{ fontSize: 18 }}>
              <div>
                {userInfo && userInfo.email}
              </div>
              <div>
                {userInfo && userInfo.nickname}
              </div>
            </div>
          </Col>
        </Row>

        <div style={{ margin: '16px 0' }}>
        <Row gutter={16}>
          <Col span={16}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2>쿠폰 할인</h2>
            </div>
            <div style={{ marginBottom: '16px' }}>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ flexShrink: 0, width: 200 }}>
                      <Text style={{ fontSize: 15 }}>상품/쿠폰 정보</Text>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, width: 200, borderBottom: 'solid 1px gray', marginTop: '35px', marginRight: '30px' }}>
                    {discountedPrice.toLocaleString()} 원
                  </div>
                  <Button onClick={() => handleCouponApply()}>쿠폰 적용</Button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 15 }}>배송지 쿠폰</Text>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, width: 200, borderBottom: 'solid 1px gray', marginTop: '20px', marginRight: '30px' }}>
                    0 원
                </div>
                <div>
                  <Button disabled='false'>쿠폰 적용</Button>
                </div>
            </div>


            </div>
          </Col>
          <Col span={8}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h2>결제 상세</h2>
            </div>
            {/* User information */}
            <div style={{ fontSize: 18 }}>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ flexShrink: 0, width: 200 }}>
                      <Text style={{ fontSize: 15 }}>주문금액</Text>
                  </div>
                  <div style={{ width: '100px',textAlign: 'right'}}>
                    + { totalProductPrice && totalProductPrice.toLocaleString() } 원
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
                  - { discountedPrice.toLocaleString() } 원
                </div >
              </div>

              <Divider />

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 200 }}>
                    <Text style={{ fontSize: 23, color: 'blue', fontSize: 'bold' }}>총 결제 금액</Text>
                </div>
                <div style={{ width: '100px',textAlign: 'right',}}>
                  + { (totalProductPrice + 3000 - discountedPrice).toLocaleString()} 원
                </div >
              </div>
            </div>
          </Col>
        </Row>
        </div>
        
        <div style={{ margin: '16px 0' }}>
          <h2>결제 수단</h2>
          <Select value={paymentMethod} onChange={handlePaymentMethodChange} style={{ width: '200px' }}>
            <Option value="credit-card">신용카드</Option>
            <Option value="bank-transfer">계좌이체</Option>
            <Option value="paypal">페이팔</Option>
          </Select>
        </div>
      </div>

      <div>
        <Button type="primary" onClick={handleOrderClick}>
          주문하기
        </Button>
      </div>

      <Modal
        title="쿠폰 목록"
        visible={couponModalVisible}
        onCancel={handleCouponCancel}
        footer={null}
        style={{ width: '300px', maxWidth: '500px' }}
      >
        <List
          dataSource={couponInfo && couponInfo}
          renderItem={(coupon) => (
            <List.Item>
              <Checkbox
                onChange={() => handleCouponSelect(coupon)}
                checked={selectedCoupon && selectedCoupon.id === coupon.id}
                disabled={(selectedCoupon && selectedCoupon.id !== coupon.id)}
              >
                <Row gutter={50} align="middle">
                  <Col span={7}>
                    <img src={coupon.coupon.image_src} alt="Product" style={{ maxWidth: '100%', maxHeight: '60px' }} />
                  </Col>
                  <Col span={10}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: 16, fontWeight: 'bold' }}>{coupon.coupon.name}</p>
                      <p style={{ fontSize: 14 }}>{coupon.coupon.description}</p>
                    </div>
                  </Col>
                  <Col span={7}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: 12, marginBottom: 0 }}>
                        {moment(coupon.coupon.start_date, "YYYY-MM-DD").format("YYYY-MM-DD")} ~ 
                      </p>
                      <p>
                        {moment(coupon.coupon.end_date, "YYYY-MM-DD").format("YYYY-MM-DD")}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Checkbox>
            </List.Item>
          )}
        />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={handleCouponApplyConfirm} disabled={!selectedCoupon}>
            적용
          </Button>
        </div>
      </Modal>

    </div>
    
  );
};

export default Order;
