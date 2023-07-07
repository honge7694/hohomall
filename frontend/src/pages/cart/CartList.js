import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { List, Checkbox, InputNumber, Button, Row, Col, Divider, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Text } = Typography;

const CartList = () => {
  const [cartList, setCartList] = useState([]);
  const apiUrl = `order/cart/`;
  const { store: token } = useAppContext();
  const headers = { Authorization: `Bearer ${token['jwtToken']}`};
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    async function fetchCart() {
        try{
            const { data } = await axiosInstance.get(apiUrl, { headers });
            console.log("cart_data :", data);
            setCartList(data);
        }catch(error){
            console.log('error : ', error);
        }
    }
    fetchCart();
  }, []);

  const handleOrderClick = () => {
    // TODO: 주문하기
    console.log("Order Click : ", selectedItems)
  }

  const handleQuantityChange = (productId, value) => {
    setQuantities(prevState => ({
      ...prevState,
      [productId]: value,
    }));
  };

  const handleCheckboxChange = (productId) => {
    if (checkedItems.includes(productId)) { // 체크를 해제한 경우 (checkedItems에 productId가 있는지 검사)
      setCheckedItems(prevState => prevState.filter(id => id !== productId)); // 이전 상태값에 productId와 일치하지 않는 값만 필터링
      setSelectedItems(prevState => prevState.filter(item => item.id !== productId));
    } else {
      const selectedItem = cartList.find(item => item.id === productId);
      setSelectedItems(prevState => [...prevState, selectedItem]);
      setCheckedItems(prevState => [...prevState, productId]);
    }
  };

  const handleRemoveClick = (productId) => {
    console.log('remove_button : ', productId);
    async function fetchRemoveCartItem() {
      try{
          const response = await axiosInstance.delete(`/order/cart/detail/${productId}/`, { headers });
          console.log('CartList RemoveCartItem response : ', response);
          const { data } = await axiosInstance.get(apiUrl, { headers });
          setCartList(data);
      }catch(error){
          console.log('error : ', error);
      }
  }
  fetchRemoveCartItem();
  };

  const handleDecreaseClick = (productId) => {
    setQuantities(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] || 1) - 1,
    }));
  };

  const handleIncreaseClick = (productId) => {
    setQuantities(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] || 1) + 1,
    }));
  };

  const handleMoveProductPage = (productId) => {
    console.log('MoveProductPage : ', productId);
    history(`/product/${productId}`);
  }

  const totalPrice = cartList
    .filter(item => checkedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * (quantities[item.id] || item.quantity), 0);

  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={cartList}
        renderItem={item => (
          <List.Item key={item.id}>
            <Row gutter={16} align="middle" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
              <Col span={2}>
                <div
                  className="checkbox-container"
                  onClick={() => handleCheckboxChange(item.id)}
                  style={{
                    width: '100%',
                    height: '160px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Checkbox checked={checkedItems.includes(item.id)} />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <img src={item.product_image} alt="Product" style={{ maxHeight: '160px', maxWidth: '100%', cursor: 'pointer', }} onClick={() => handleMoveProductPage(item.product.id)}/>
                </div>
              </Col>

              <Col span={8}>
                <div>
                    <Text level={2} style={{ fontSize: 25 }}>{item.product.name}</Text>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, marginTop: 10 }}>
                  <div style={{ flexShrink: 0, width: 200 }}>
                      <Text style={{ fontSize: 15 }}>옵션</Text>
                  </div>
                  <div>
                      <Text style={{ fontSize: 15 }}>{item.product_option.option_color} {item.product_option.option_size}</Text>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ flexShrink: 0, width: 200 }}>
                      <Text style={{ fontSize: 15 }}>가격</Text>
                  </div>
                  <div>
                      <Text style={{ fontSize: 15 }}>{item.price}</Text>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ flexShrink: 0, width: 200 }}>
                      <Text style={{ fontSize: 15 }}>수량</Text>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        type="text"
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => handleDecreaseClick(item.id)}
                      /> &nbsp;&nbsp;&nbsp;&nbsp;
                      <InputNumber
                        value={quantities[item.id] || item.quantity}
                        onChange={value => handleQuantityChange(item.id, value)}
                      /> &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        type="text"
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => handleIncreaseClick(item.id)}
                      />
                    </div>
                  </div>
                </div>
                {/*                 
                <h3>{item.product.name}</h3>
                <p>Price: {item.price}</p>
                <p>Quantity:</p> */}
              </Col>
              <Col span={4}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Button onClick={() => handleRemoveClick(item.id)}>Remove</Button>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <div style={{ textAlign: 'right', marginRight: '100px', marginTop: '16px' }}>
        <h3>Total Price: {totalPrice}</h3>
        <Button onClick={() => handleOrderClick()} type="primary" disabled={checkedItems.length === 0}>
          주문하기
        </Button>
      </div>
    </div>
  );
};

export default CartList;
