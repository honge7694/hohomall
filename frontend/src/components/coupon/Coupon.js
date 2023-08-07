import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, notification } from 'antd';
import { DownloadOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import moment from "moment";

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const Coupon = ({couponList, couponUserList, setCouponUserList}) => {
    console.log('couponList : ', couponList)
    console.log('couponUserList : ', couponUserList)
    const user = useRecoilValue(userState);
    const history = useNavigate();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    const [api, setApi] = notification.useNotification();

    const couponDownload = async (couponId) => {
        try {
            const data = {
                'coupon_id': couponId
            }
            const response = await axiosInstance.post('coupon/user/', data, {headers})
            console.log(response);

            setCouponUserList((prevCouponUserList) => [...prevCouponUserList, { coupon: { id: couponId } }]);

            api.info({
                message: '쿠폰 다운로드 성공',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>  
            });
        }catch(error){
            console.log('error : ', error);

            api.info({
                message: '쿠폰 다운로드 실패',
                description: '이미 다운로드 한 쿠폰입니다.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });
        }
    }

    // 다운로드 상태를 확인하여 다운로드 버튼 또는 "다운로드 완료" 텍스트를 표시
    const renderDownloadButton = (couponId) => {
        const isDownloaded = couponUserList.some((couponUser) => couponUser.coupon.id === couponId);
        if (isDownloaded) {
            return <span>다운로드 완료</span>;
        } else {
            return <DownloadOutlined onClick={() => couponDownload(couponId)} />;
        }
    };

    return (
        <div>
            {setApi}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#d3d3d33b', padding: "15px", marginBottom: '20px' }}>
                <h1>쿠폰 목록</h1>
                {user['isAdmin'] ? (
                    <Button onClick={() => history('new')} style={{ marginLeft: '10px'}}>쿠폰추가</Button>
                ): (null)}
                
            </div>
            <Row gutter={[16, 16]}>
                {couponList.map((coupon) => (
                    <Col span={8} key={coupon.id}>
                        <Card
                            hoverable
                            cover={<img alt={coupon.name} src={coupon.image_src ? (coupon.image_src) : (null)} style={{ height: '280px', objectFit: 'cover' }} />}
                            style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}
                            actions={
                                [
                                    renderDownloadButton(coupon.id)
                                ]
                            }
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <Text style={{ fontSize: "18px", fontWeight: 'bold' }}>{coupon.name}</Text>
                                <Text type="">{moment(coupon.start_date, "YYYY-MM-DD").format("YYYY-MM-DD")} ~ {moment(coupon.end_date, "YYYY-MM-DD").format("YYYY-MM-DD")}</Text>
                            </div>
                            <Text>{coupon.description}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Coupon;
