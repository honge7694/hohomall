import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Row, Col, Card, Typography, Select, Button } from 'antd';
import Rating from 'react-rating-stars-component';

import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;
const { Option } = Select;

const AdminBrandList = ({brandList}) => {
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [sortingOption, setSortingOption] = useState('default'); // 기본값은 'default'
    const [filteredBrandList, setFilteredBrandList] = useState(brandList); // 필터링된 상품 리스트 상태

    useEffect(() => {
        setFilteredBrandList(brandList);
    }, [brandList]);

    const handlerOnClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        
        history('detail/'+id);
    }

    // 가격 순과 인기 순 정렬 함수
    const handleSortBy = (value) => {
        setSortingOption(value);
    
        let sortedList = [...brandList];
        if (value === 'price') {
            // 가격 순으로 정렬 (가격은 숫자로 변환하여 정렬)
            sortedList.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')));
        } else if (value === 'popular') {
            // 인기 순으로 정렬 (조회 수가 0이 아닌 경우만 포함하여 정렬)
            // sortedList = sortedList.filter((product) => product.view_count > 0);
            sortedList.sort((a, b) => b.view_count - a.view_count);
        }
    
        setFilteredBrandList(sortedList);
    };

    return (
        <div>    
            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d3d3d33b', padding: "15px", marginBottom: '20px' }}>
                    <h3>전체 브랜드</h3>
                    <div>
                        {filteredBrandList ? (filteredBrandList.length) : (0)} 개의 브랜드가 표시됩니다. &nbsp;&nbsp;&nbsp;
                        {/* <Select value={sortingOption} onChange={handleSortBy}>
                            <Option value="default">기본 정렬</Option>
                            <Option value="price">낮은 가격 순</Option>
                            <Option value="popular">인기 순</Option>
                        </Select> */}
                        <Button onClick={() => history('new')} style={{ marginLeft: '10px'}}>브랜드추가</Button>
                    </div>
                </div>
                <Row gutter={[16, 16]}>
                    {filteredBrandList.map((brand) => (
                        <Col span={6} key={brand.id}>
                            <a href="#" onClick={ (e) => handlerOnClick(e, brand.id) }>
                                <Card
                                    hoverable
                                    cover={<img alt={brand.name} src={brand.logo_img ? brand.logo_img : null} style={{ height: '280px', objectFit: 'contain' }} />}
                                    style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
                                >
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px'}}>
                                        <Text style={{fontSize: '16px', fontWeight: 'bold'}}>{brand.name}</Text>
                                        <Text type="secondary">{new Date(brand.created_at).toLocaleDateString()}</Text> 
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text type="secondary">{brand.description}</Text> 
                                        {/* <Text type="secondary">{new Date(brand.created_at).toLocaleDateString()}</Text>  */}
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

export default AdminBrandList;
