import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Typography, Select, Button, Divider } from 'antd';
import ImageGallery from 'react-image-gallery';
import WishListModal from 'components/product/WishListModal';
import 'react-image-gallery/styles/css/image-gallery.css';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;
const { Option } = Select;

const ProductDetail = ({productData}) => {
    console.log('productData : ', productData)
    const { id } = useParams();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [wishlistModalVisible, setWishlistModalVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    // options
    const options = productData.option.map((option) => (
        <Option key={option.id} value={option.id}>
            {option.color}, {option.size}  (+{option.price})
        </Option>
    ));

    const handleImageSelect = (index) => {
        setSelectedImage(productData.images[index].original);
    };

    const handleOptionSelect = (value) => {
        setSelectedOption(value);
        const selectOption = productData.option.find((option) => option.id === value);
        if (selectOption) {
            const colorPrice = selectOption.price;
            // 색상 옵션의 가격을 totalPrice에 추가하여 업데이트
            const priceWithoutComma = productData.productInfo.price.replace(/,/g, ''); // 쉼표 제거
            const totalPrice = parseInt(priceWithoutComma) + parseInt(colorPrice);
            setTotalPrice(totalPrice);
        }
    }

    const handleAddToWishlist = () => {
        // 찜하기 버튼 동작
        const selectOption = productData.option.find((option) => option.id === selectedOption);

        if (selectOption) {
            const wishlistItem = {
                product_id: productData.productInfo.id,
                product_option_id: selectedOption,
                price: totalPrice,
            };
            console.log(wishlistItem);

            async function fetchCart() {
                try{
                    const response = await axiosInstance.post('/order/cart/', wishlistItem, { headers });
                    console.log('ProductList Cart response : ', response);
                }catch(error){
                    console.log('error : ', error);
                }
            }
            fetchCart();

            setWishlistModalVisible(true);
        } else {
            console.log('선택되지 않았습니다.');
        }
    };

    const handleBuyNow = () => {
        // TODO: 구매하기 버튼 동작
    };

    const handleWishlistModalConfirm = () => {
        // TODO: 찜목록 확인 모달에서 예 버튼 클릭시 찜목록 이동.
    
        // 모달 창 닫기
        setWishlistModalVisible(false);
    };
    
    const handleWishlistModalCancel = () => {
        // 모달 창 닫기
        setWishlistModalVisible(false);
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <ImageGallery
                        items={productData.images}
                        showThumbnails={true}
                        onClickThumbnail={handleImageSelect}
                    />
                </Col>
                <Col span={12}>
                    <Card>
                        <div>
                            <Title level={4} style={{ fontSize: 25 }}>{productData.productInfo.name}</Title>
                            <Text style={{ fontSize: 19 }}>{productData.productInfo.brand.name}</Text>
                        </div>
                        <Divider />

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 19 }}>판매가</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 25, color: 'red', fontWeight: 'bold' }}> ₩ {productData.productInfo.price}</Text>
                            </div>
                        </div>
                        <Divider />

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 19 }}>배송방법</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 19 }}>택배</Text>
                            </div>
                        </div>
                        <Divider />

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 19 }}>상품 정보</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 19 }}></Text>
                            </div>
                        </div>
                        <Divider />

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 19 }}>옵션</Text>
                            </div>
                            <div>
                                <Select value={selectedOption} style={{ width: 200 }} onChange={handleOptionSelect}>
                                    {options}
                                </Select>
                            </div>
                        </div>
                        <Divider />

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: 19 }}>결제 금액</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: 19 }}>₩ {totalPrice.toLocaleString()}</Text>
                            </div>
                        </div>
                        <Divider />

                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={handleAddToWishlist}>찜하기</Button>
                            <WishListModal
                                visible={wishlistModalVisible}
                                onConfirm={handleWishlistModalConfirm}
                                onCancel={handleWishlistModalCancel}
                            />
                            <Button type="primary" onClick={handleBuyNow} style={{ marginLeft: 8 }}>
                                구매하기
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetail;
