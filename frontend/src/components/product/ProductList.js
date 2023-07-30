import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Space, Select } from 'antd';
import Rating from 'react-rating-stars-component';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Meta } = Card;
const { Title, Text } = Typography;
const { Option } = Select;

const ProductList = ({productList, type}) => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [sortingOption, setSortingOption] = useState('default'); // 기본값은 'default'
    const [filteredProductList, setFilteredProductList] = useState(productList); // 필터링된 상품 리스트 상태

    useEffect(() => {
        setFilteredProductList(productList);
    }, [productList]);

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        
        history('/product/detail/'+id);
    };

    // 가격 순과 인기 순 정렬 함수
    const handleSortBy = (value) => {
        setSortingOption(value);
    
        let sortedList = [...productList];
        if (value === 'price') {
            // 가격 순으로 정렬 (가격은 숫자로 변환하여 정렬)
            sortedList.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')));
        } else if (value === 'popular') {
            // 인기 순으로 정렬 (조회 수가 0이 아닌 경우만 포함하여 정렬)
            // sortedList = sortedList.filter((product) => product.view_count > 0);
            sortedList.sort((a, b) => b.view_count - a.view_count);
        }
    
        setFilteredProductList(sortedList);
    };

    return (
        <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d3d3d33b', padding: "15px", marginBottom: '15px'}}>
                <h1 style={{ }}> {type} 상품 목록</h1>
                <div>
                    {filteredProductList ? (filteredProductList.length) : (0)} 개의 상품이 표시됩니다. &nbsp;&nbsp;&nbsp;
                    <Select value={sortingOption} onChange={handleSortBy}>
                        <Option value="default">기본 정렬</Option>
                        <Option value="price">낮은 가격 순</Option>
                        <Option value="popular">인기 순</Option>
                    </Select>
                </div>
            </div>
            <Row gutter={[16, 16]}>
                {filteredProductList && filteredProductList.map((product) => (
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
        </>
    )
}

export default ProductList;