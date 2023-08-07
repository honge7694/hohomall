import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Button, Form, Input, Upload, Radio, Checkbox, Select, DatePicker } from 'antd';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import moment from "moment";


const { Title, Text } = Typography;

const CouponEdit = ({couponData}) => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [form] = Form.useForm();
    const [couponImage, setCouponImage] = useState([]);
    const [newImage, setNewImage] = useState([]); // 수정에서 새로 추가한 이미지

    // 이미지 미리보기에 넣기위한 커스텀
    useEffect(() => {
        const convertedFileList = [
            {
                id: couponData.id,
                name: couponData.name,
                status: 'done',
                url: couponData.image_src,
            }
        ];
        setCouponImage(convertedFileList);
    }, [])
        
    // 이미지 업로드
    const handleImageUpload = (info) => {
        const fileList = info.fileList;
        const newImage = fileList.filter((file) => !file.url); // 새로운 이미지만 필터링

        setNewImage(newImage);
        setCouponImage(fileList);
    };


    // 폼 작성 완료
    const onFinish = async (values) => {
        console.log('onFinish Value : ', values);
        const { name, description, discount_rate, image_src, start_date, end_date } = values;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('discount_rate', discount_rate);
        formData.append('start_date', start_date.format('YYYY-MM-DD'));
        formData.append('end_date', end_date.format('YYYY-MM-DD'));
        couponImage.forEach((file) => {
            formData.append('image_src', file.originFileObj)
        })

        try{
            const response = await axiosInstance.patch(`/coupon/detail/${id}/`, formData, { headers });
            console.log(response);
            
            history('/coupon');
        }catch(error){
            console.log(error);
        }
        
    };


    return (
        <>
            <Card>
                <Form form={form} layout="vertical" onFinish={onFinish} 
                    initialValues={{
                        name: couponData.name,
                        description: couponData.description,
                        discount_rate: couponData.discount_rate,
                        start_date: moment(couponData.start_date, "YYYY-MM-DD"),
                        end_date: moment(couponData.end_date, "YYYY-MM-DD"),
                    }}
                >
                    
                    <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력하세요.' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="소개" name="description" rules={[{ required: true, message: '내용을 입력하세요.' }]}>
                        <Input.TextArea rows={4} placeholder='브랜드를 소개해보세요.' />
                    </Form.Item>

                    <Form.Item label="할인율" name="discount_rate" rules={[{ required: true, message: '할인율을 입력하세요.' }]}>
                        <Input placeholder='ex) 10% 할인이면 10을 입력' />
                    </Form.Item>
                    
                    <Form.Item label="시작 날짜" name="start_date" rules={[{ required: true }]} >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="종료 날짜" name="end_date" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    
                    <Form.Item label="쿠폰 이미지" name='image_src' rules={[{ required: true, message: '쿠폰 이미지를 등록하세요.' }]}>
                        <Upload
                            multiple
                            fileList={couponImage}
                            onChange={handleImageUpload}
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                                showDownloadIcon: false,
                                removeIcon: <span><DeleteOutlined/></span>,
                            }}
                        >
                            {couponImage.length >= 1 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div className='ant-upload-text'>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">저장</Button>
                        <Button onClick={() => {history('/coupon')}}style={{ marginLeft: '8px' }}>취소</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default CouponEdit;
