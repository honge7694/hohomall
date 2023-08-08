import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Button, Form, Input, Upload, Radio, Checkbox, Select, Modal } from 'antd';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const AdminBrandEdit = ({brandData}) => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [form] = Form.useForm();
    const [brandImage, setBrandImage] = useState([]);
    const [newImages, setNewImages] = useState([]); // 수정에서 새로 추가한 이미지
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달

    // 이미지 미리보기에 넣기위한 커스텀
    useEffect(() => {
        const convertedFileList = [
            {
                id: brandData.id,
                name: brandData.name,
                status: 'done',
                url: brandData.logo_img,
            }
        ];
        setBrandImage(convertedFileList);
    }, [])
        
    // 이미지 업로드
    const handleImageUpload = (info) => {
        const fileList = info.fileList;
        const newImages = fileList.filter((file) => !file.url); // 새로운 이미지만 필터링

        setNewImages(newImages);
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
            const response = await axiosInstance.patch(`/product/brand/${id}/`, formData, { headers });
            console.log(response);
            
            history('/admin/brand');
        }catch(error){
            console.log(error);
        }
        
    };

    // 브랜드 삭제
    const handleBrandDelete = async () => {
        console.log('handleBrandDelete : ')
        if (user['isAdmin']){
            setIsModalVisible(true);
        }else{
            resetUser();
            history('/sign-in');
        }
    }

    const handleOk = async () => {
        try {
            const response = await axiosInstance.delete(`/product/brand/${id}/`, {headers});
            console.log(response)

            history('/admin/brand');
        }catch(error){
            console.log("delete error : ", error)
        }
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Card>
                <Form form={form} layout="vertical" onFinish={onFinish} 
                    initialValues={{
                        name: brandData.name,
                        description: brandData.description,
                    }} 
                >
                    
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
                        <Button danger onClick={() => handleBrandDelete()} style={{ marginLeft: '8px' }}>삭제</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Modal
                title="상품 삭제"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="예"
                cancelText="취소"
            >
                    <p>정말 삭제하시겠습니까?</p>
            </Modal>
        </>
    );
};

export default AdminBrandEdit;
