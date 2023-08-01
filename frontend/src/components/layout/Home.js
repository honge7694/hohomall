import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Row, Col, Card, Typography } from 'antd';
import Rating from 'react-rating-stars-component';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const Home = ({productList}) => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [popularProductList, setPopularProductList] = useState();


    // 인기상품 sort 8개
    useEffect(() => {
        let sortedList = [...productList];
        sortedList.sort((a, b) => b.view_count - a.view_count);
        
        const popularProductsToShow = sortedList.slice(0, 8); // 상위 8개
        setPopularProductList(popularProductsToShow);
    }, [productList])

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        
        history('/product/detail/'+id);
    }

    return (
        <div>    
            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d3d3d33b', padding: "15px", marginBottom: '20px', marginTop: '200px'}}>
                    <h3>인기 상품</h3>
                </div>
                <Row gutter={[16, 16]}>
                    {popularProductList && popularProductList.map((product) => (
                        <Col span={6} key={product.id}>
                            <a href="#" onClick={ (e) => handlerOnClick(e, product.id) }>
                            {/* <a> */}
                                <Card
                                    hoverable
                                    cover={<img alt={product.name} src={product.images[0] ? product.images[0].image_src : null} style={{ height: '280px', objectFit: 'cover' }} />}
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
            </div>



            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d3d3d33b', padding: "15px", marginBottom: '20px', marginTop: '200px'}}>
                    <h3>전체 상품</h3>
                </div>
                <Row gutter={[16, 16]}>
                    {productList.map((product) => (
                        <Col span={6} key={product.id}>
                            <a href="#" onClick={ (e) => handlerOnClick(e, product.id) }>
                                <Card
                                    hoverable
                                    cover={<img alt={product.name} src={product.images[0] ? product.images[0].image_src : null} style={{ height: '280px', objectFit: 'cover' }} />}
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
            </div>
        </div>
    );
};

export default Home;
