import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Typography, Select, Button, Divider } from 'antd';
import ImageGallery from 'react-image-gallery';
import { axiosInstance } from 'api';
import 'react-image-gallery/styles/css/image-gallery.css';

const { Title, Text } = Typography;
const { Option } = Select;

const ProductDetail = ({productData}) => {
    console.log('productData : ', productData)
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);


    // Color options
    const colorOptions = productData.optionColor.map((option) => (
        <Option key={option.id} value={option.value}>
            {option.value} (+ {option.price})
        </Option>
    ));
    
    // Size options
    const sizeOptions = productData.optionSize.map((option) => (
        <Option key={option.id} value={option.option_size}>
            {option.value} 
        </Option>
    ));

    const handleImageSelect = (index) => {
        setSelectedImage(productData.images[index].original);
    };

    const handleColorSelect = (value) => {
        setSelectedColor(value);
        const selectedOption = productData.optionColor.find((option) => option.value === value);
        if (selectedOption) {
            const colorPrice = selectedOption.price;
            // 색상 옵션의 가격을 totalPrice에 추가하여 업데이트
            const priceWithoutComma = productData.productInfo.price.replace(/,/g, ''); // 쉼표 제거
            const totalPrice = parseInt(priceWithoutComma) + parseInt(colorPrice);
            setTotalPrice(totalPrice);
        }
    };

    const handleSizeSelect = (value) => {
        setSelectedSize(value);
    };

    const handleAddToWishlist = () => {
        // 찜하기 버튼 동작
    };

    const handleBuyNow = () => {
        // 구매하기 버튼 동작
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
                            <div style={{ flexShrink: 0, width: 80}}>
                                <Text style={{ fontSize: 19 }}>Color</Text>
                            </div>
                            <div>
                                <Select value={selectedColor} style={{ width: 160 }} onChange={handleColorSelect}>
                                    {colorOptions}
                                </Select>
                            </div>
                            <div style={{ flexShrink: 0, width: 80, marginLeft: 50 }}>
                                <Text style={{ fontSize: 19 }}>Size</Text>
                            </div>
                            <div>
                                <Select value={selectedSize} style={{ width: 120 }} onChange={handleSizeSelect}>
                                    {sizeOptions}
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
