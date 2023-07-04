import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import Rating from 'react-rating-stars-component';

import { axiosInstance } from 'api';


const { Meta } = Card;
const { Title, Text } = Typography;

const Product = () => {
    const [productList, setProductList] = useState([]);
    const apiUrl = `/product/`;

    useEffect(() => {
        async function fetchProduct() {
            try{
                const { data } = await axiosInstance.get(apiUrl);
                console.log("product_data :", data);
                setProductList(data);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchProduct();
    }, []);

    return (
        <div>
            
        <h1>쇼핑몰 메인 페이지</h1>
        <Row gutter={[16, 16]}>
            {productList.map((product) => (
                <Col span={6} key={product.id}>
                    <Card
                        hoverable
                        cover={<img alt={product.name} src={product.images[0].image_src} />}
                        style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
                    >
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Title level={5}>{product.name}</Title>
                            <Title level={5} style={{ marginBottom: 0 }}> ₩ {product.price}</Title>
                        </div>
                        {/* TODO: rating, review 개수 가져오기 */}
                        <div>
                            <Rating
                                count={5}
                                value={product.rating}
                                size={24}
                                activeColor="#ffd700"
                                edit={false}
                            />
                        </div>
                        <div>
                            <Text type="secondary">{product.reviewCount}</Text> reviews
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
        </div>
    );
};

export default Product;