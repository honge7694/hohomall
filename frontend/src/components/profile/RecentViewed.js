import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Rating from 'react-rating-stars-component';

import project1 from "../../assets/images/home-decor-1.jpeg";

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const RecentViewed = ({recentView}) => {
    console.log('recentView : ', recentView);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();
    const carouselRef = useRef(null);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

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
        
        history('/product/detail/'+id);
    };
    

    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleNext = () => {
        carouselRef.current.next();
    };
    

    return (
        <>
        <Card
            bordered={false}
            className="header-solid mb-24"
            title={
            <>
                <h6 className="font-semibold">최근 본 상품</h6>
                <p>최근 하루동안 본 상품</p>
            </>
            }
        >
            <Carousel ref={carouselRef} {...settings}>
                {recentView.map((recent) => (
                    // <Col span={6} key={recent.id}>
                        <a href="#" onClick={ (e) => handlerOnClick(e, recent.product.id) }>
                            <Card
                                hoverable
                                cover={<img alt={recent.product.name} src={recent.product.images[0] ? (recent.product.images[0].image_src) : (null)} style={{ height: '280px', objectFit: 'cover' }} />}
                                style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', marginRight: '16px' }}
                            >
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Title level={5}>{recent.product.name}</Title>
                                    <Title level={5} style={{ marginBottom: 0 }}> ₩ {recent.product.price}</Title>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Rating
                                        count={5}
                                        value={recent.product.rating}
                                        size={24}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />
                                    <Text type="secondary">{recent.product.view_count} hits</Text> 
                                </div>
                                <div>
                                    <Text type="secondary">{recent.product.review_count} reviews</Text> 
                                </div>
                            </Card>
                        </a>
                    // </Col>
                ))}
            </Carousel>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <LeftOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handlePrev} />
                <RightOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleNext} />
            </div>
        </Card>
        </>
    )
}


export default RecentViewed;