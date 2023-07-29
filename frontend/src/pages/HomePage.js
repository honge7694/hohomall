import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Row, Col, Card, Typography } from 'antd';
import Home from 'components/layout/Home';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import Image from '../assets/images/Image.jpg'


const { Title } = Typography;

const HomePage = () => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    // const [popularProducts, setPopularProducts] = useState();
    const [allProducts, setAllProducts] = useState();


    useEffect(() => {
        // 인기 상품 데이터
        // const fetchPopularProducts = async () => {
        //     try{
        //         const { data } = await axiosInstance.get('/product/');
        //         console.log("popularProducts data", data);
        //         setPopularProducts(data);
        //     }catch(error){
        //         console.log('popularProducts error : ', error);
        //     }
        // }
        // fetchPopularProducts();

        const fetchAllProducts = async () => {
            try{
                const { data } = await axiosInstance.get('/product/');
                console.log("allProducts data", data);
                setAllProducts(data);
            }catch(error){
                console.log('allProducts error : ', error);
            }
        }
        fetchAllProducts();
    }, [])


  // 예시 데이터, 큰 사진들의 URL 배열
    const carouselImages = [
        Image
        // 추가 이미지 URL
    ];


    return (
        <div>
            {/* 큰 사진 Carousel */}
            <Carousel>
                {carouselImages.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                </div>
                ))}
            </Carousel>

            {/* 인기 상품 */}
            {/* { popularProducts && <MainPopularProduct productList={popularProducts} productType={'인기'} /> } */}
            {/* 전체 상품 */}
            { allProducts && <Home productList={allProducts} /> }
        </div>
    );
};

export default HomePage;
