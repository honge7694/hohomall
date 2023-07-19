import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Space } from 'antd';
import Rating from 'react-rating-stars-component';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Meta } = Card;
const { Title, Text } = Typography;

const ProductList = ({productList}) => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        console.log(id);

        async function fetchRecentViewed() {
            const data = { 
                'product_id': id
            }
            try{
                const response = await axiosInstance.post('/account/recent/viewed/', data, { headers });
                console.log('ProductList RecentViewed response : ', response);
            }catch(error){
                console.log('error : ', error);
            }
        }
        fetchRecentViewed();
        
        history(''+id);
    };

    return (
        <>
            <h1>쇼핑몰 메인 페이지</h1>
            <Row gutter={[16, 16]}>
                {productList.map((product) => (
                    <Col span={6} key={product.id}>
                        <a href="#" onClick={ (e) => handlerOnClick(e, product.id) }>
                            <Card
                                hoverable
                                cover={<img alt={product.name} src={product.images[0].image_src} style={{ height: '280px', objectFit: 'cover' }} />}
                                style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
                            >
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Title level={5}>{product.name}</Title>
                                    <Title level={5} style={{ marginBottom: 0 }}> ₩ {product.price}</Title>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Rating
                                        count={5}
                                        value={product.rating}
                                        size={24}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />
                                    <Text type="secondary">{product.view_count} hits</Text> 
                                </div>
                                <div>
                                    <Text type="secondary">{product.review_count} reviews</Text> 
                                </div>
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ProductList;