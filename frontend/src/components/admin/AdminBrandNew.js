import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Button, Form, Input, Upload, Radio, Checkbox, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const AdminBrandNew = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [form] = Form.useForm();
    const [brandImage, setBrandImage] = useState([]);
    
    // 이미지 업로드
    const handleImageUpload = (info) => {
        const fileList = info.fileList;
        setBrandImage(fileList);
    };


    // 폼 작성 완료
    const onFinish = async (values) => {
        console.log('onFinish Value : ', values);
        const { name, description } = values;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('links', 0)
        brandImage.forEach((file) => {
            formData.append('logo_img', file.originFileObj)
        })

        try{
            const response = await axiosInstance.post(`/product/brand/`, formData, { headers });
            console.log(response);
            
            history('/admin/brand');
        }catch(error){
            console.log(error);
        }
        
    };


    return (
        <>
            <Card>
                <Form form={form} layout="vertical" onFinish={onFinish} >
                    
                    <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력하세요.' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="소개" name="description" rules={[{ required: true, message: '내용을 입력하세요.' }]}>
                        <Input.TextArea rows={4} placeholder='브랜드를 소개해보세요.' />
                    </Form.Item>
                    
                    <Form.Item label="브랜드 이미지" name='logo_img' rules={[{ required: true, message: '브랜드 이미지를 등록하세요.' }]}>
                        <Upload
                            multiple
                            fileList={brandImage}
                            onChange={handleImageUpload}
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                                showDownloadIcon: false,
                                removeIcon: <span><DeleteOutlined/></span>,
                            }}
                        >
                            {brandImage.length >= 1 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div className='ant-upload-text'>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">저장</Button>
                        <Button onClick={() => {history('/admin/brand')}}style={{ marginLeft: '8px' }}>취소</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default AdminBrandNew;
