import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Button, Form, Input, Upload, Radio } from 'antd';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const QuestionEdit = ({questionData, userInfo}) => {
    const { id } = useParams();
    console.log('questionData : ', questionData)
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [form] = Form.useForm();
    const [questionImages, setQuestionImages] = useState([]);
    const [newImages, setNewImages] = useState([]); // 수정에서 새로 추가한 이미지
    const [deletedImageIds, setDeletedImageIds] = useState([]); // 수정에서 삭제한 이미지

    // 이미지 미리보기에 넣기위한 커스텀
    useEffect(() => {
        const convertedFileList = questionData.images.map((image) => ({
            id: image.id,
            name: image.name,
            status: 'done',
            url: `${image.image_src}`,
        }));
        setQuestionImages(convertedFileList);
    }, [])

    
    // 이미지 업로드
    const handleImageUpload = (info) => {
        const fileList = info.fileList;

        const newImages = fileList.filter((file) => !file.url); // 새로운 이미지만 필터링
        setNewImages(newImages);
        setQuestionImages(fileList);
    };

    // 이미지 삭제 처리
    const handleImageRemove = (removedImage) => {
        console.log('removedImage : ', removedImage)
        const imageId = removedImage.id;
        setDeletedImageIds((prevIds) => [...prevIds, imageId]);
        console.log('delete Image ids : ', deletedImageIds);
    };

    // 폼 작성 완료
    const onFinish = async (values) => {
        console.log('onFinish Value : ', values);
        const { subject, title, content, images } = values;
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('deleted_images', JSON.stringify(deletedImageIds));
        newImages.forEach((file) => {
            formData.append('new_images', file.originFileObj)
        })

        try{
            const response = await axiosInstance.patch(`/board/question/detail/${id}/`, formData, { headers });
            console.log(response);
            
            history('/qna');
        }catch(error){
            console.log(error);
        }
        
    };


    return (
        <>
            <Card>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={questionData}>
                <Form.Item label="문의 유형" name="subject" initialValue="기타문의" rules={[{ required: true, message: '문의 유형을 선택하세요.' }]}>
                    <Radio.Group>
                        <Radio value="배송문의">배송문의</Radio>
                        <Radio value="상품문의">상품문의</Radio>
                        <Radio value="결제문의">결제문의</Radio>
                        <Radio value="기타문의">기타문의</Radio>
                    </Radio.Group>
                </Form.Item>

                    <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요.' }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력하세요.' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    
                    <Form.Item name='images' initialValue={questionImages}>
                        <Upload
                            multiple
                            fileList={questionImages}
                            onChange={handleImageUpload}
                            onRemove={handleImageRemove}
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                                showDownloadIcon: false,
                                removeIcon: <span><DeleteOutlined/></span>,
                            }}
                        >
                            {questionImages.length > 5 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div className='ant-upload-text'>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">저장</Button>
                        <Button style={{ marginLeft: '8px' }}>취소</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default QuestionEdit;
