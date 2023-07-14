import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, List, Rate, Divider, Space,Typography, Modal, Image} from 'antd';
import { PlusOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, LeftOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons';

import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Text } = Typography;

const ProductReview = ({productId, productRating}) => {
    console.log("productId / productRating : ", productId, productRating);
    const user = useRecoilValue(userState);
    console.log('user : ', user);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const [canLeaveReview, setCanLeaveReview] = useState(false);

    const [reviewList, setReviewList] = useState([]);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewImages, setReviewImages] = useState([]);
    const [rating, setRating] = useState(1); 

    const [showAllImages, setShowAllImages] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // 리뷰 가능 여부를 확인하는 요청
        const checkReviewWrite = async () => {
            try {
                const { data } = await axiosInstance.get(`/order/purchase/?product_id=${productId}`, { headers });
                console.log('data : ', data)
                if (data.length > 0){
                    setCanLeaveReview(true);
                }
            } catch (error) {
                console.error('Failed to check review eligibility:', error);
            }       
        }
        checkReviewWrite();

        // 리뷰 리스트 가져오기.
        const fetchReviewList = async () => {
            if (user.userId){
                try {
                    const { data } = await axiosInstance.get(`/review/?product_id=${productId}`, {headers});
                    console.log('Review List Data : ', data)
                    setReviewList(data);
                } catch (error) {
                    console.error('Failed to check review eligibility:', error);
                } 
            } else {
                try {
                    const { data } = await axiosInstance.get(`/review/?product_id=${productId}`);
                    console.log('Review List Data : ', data)
                    setReviewList(data);
                } catch (error) {
                    console.error('Failed to check review eligibility:', error);
                } 
            }
        }
        fetchReviewList();
    }, []);

    const handleImageClick = (images) => {
        setSelectedImages(images);
        setShowAllImages(true);
    };

    const handleModalClose = () => {
        setShowAllImages(false);
        setSelectedImages([]);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };


    const handleContentChange = (e) => {
        setReviewContent(e.target.value);
    };

    const handleImageUpload = (info) => {
        const fileList = info.fileList;
        setReviewImages(fileList);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const handleLike = async (review) => {
        console.log(review);
        if (user.userId){
            try{
                const response = await axiosInstance.post(`/review/like/${review.item.id}/`, '', { headers });
                const { data } = await axiosInstance.get(`/review/?product_id=${productId}`, {headers});
                console.log('Review List Data : ', data)
                setReviewList(data);
            }catch(error){
                console.log('error : ', error);
            }
        } else {
            console.log('비회원 사용자');
        }
    }
    
    const handleSubmit = async (fieldValues) => {
        console.log(fieldValues);
        const { content, rating, images } = fieldValues;
        const formData = new FormData();
        formData.append('content', content);
        reviewImages.forEach((file) => {
            formData.append('images', file.originFileObj);
        });

        // 별점 데이터를 formData에 추가
        formData.append('rating', rating);
        try{
            const response = await axiosInstance.post(`/review/?product_id=${productId}`, formData, { headers });
            console.log(response);

            // fieldValues 초기화
            setReviewContent('');
            setReviewImages([]);
            setRating(1);

            // 리뷰 데이터 
            const { data } = await axiosInstance.get(`/review/?product_id=${productId}`, {headers});
            console.log('Review List Data : ', data)
            setReviewList(data);
        }catch(error){
            console.log(error);
        }
    };

    return (
        <>
            <Divider />
            <h2>리뷰</h2>
            
            <Form
                onFinish={handleSubmit}
            >
                {!canLeaveReview ? (
                    <Form.Item>
                        <Input.TextArea placeholder='상품 구매시 리뷰를 남길 수 있습니다.' disabled />
                    </Form.Item>
                ):(
                    <>
                        <Form.Item name='rating' >
                            <Rate value={rating} onChange={handleRatingChange}  /> 
                        </Form.Item>

                        <Form.Item name='content' initialValue={reviewContent}>
                            <Input.TextArea onChange={handleContentChange} />
                        </Form.Item>
                    
                        <Form.Item name='images' initialValue={reviewImages}>
                            <Upload
                                multiple
                                fileList={reviewImages}
                                onChange={handleImageUpload}
                                listType="picture-card"
                                showUploadList={{
                                    showPreviewIcon: true,
                                    showRemoveIcon: true,
                                    showDownloadIcon: false,
                                    removeIcon: <span><DeleteOutlined/></span>,
                                }}
                            >
                                {reviewImages.length > 5 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div className='ant-upload-text'>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType='submit'>
                                리뷰 작성
                            </Button>
                        </Form.Item>
                    </>
                )}
                {/* 댓글 리스트 컴포넌트 */}
                <List
                    itemLayout="vertical"
                    dataSource={reviewList}
                    renderItem={(item) => (
                        <List.Item>
                        <List.Item.Meta />
                            <div>
                                <Text style={{fontSize: '19px', fontWeight: 'bold', marginRight: '15px'}}>{item.user.nickname}</Text>
                                <Rate disabled defaultValue={item.rating} />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Text style={{ fontSize: '17px' }}>{item.content}</Text>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {item.images && item.images.length > 0 && (
                                    <div style={{ display: 'flex' }}>
                                        {item.images.slice(0, 1).map((image, index) => (
                                            <img
                                                src={image.image_src}
                                                alt={`Review Image ${image.id}`}
                                                key={image.id}
                                                style={{ width: '100px', height: '100px', marginRight: '10px' }}
                                                onClick={() => handleImageClick(item.images, index)}
                                            />
                                        ))}
                                        {item.images.length > 1 && (
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    border: '1px solid #1890ff',
                                                    borderRadius: '4px',
                                                    padding: '8px 16px',
                                                    color: '#1890ff',
                                                    cursor: 'pointer',
                                                    alignItems: 'center'
                                                }}
                                                onClick={() => handleImageClick(item.images, 0)}
                                            >
                                                +{item.images.length - 1} 더 보기
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText icon={() => item.is_like ? (
                                            // console.log(item.is_like),
                                            <HeartTwoTone twoToneColor="#eb2f96" onClick={()=> handleLike({item})} />
                                        ):(
                                            // console.log(item.id),
                                            <HeartOutlined onClick={()=> handleLike({item})} />
                                        )} 
                                        text={item.like} key="list-vertical-like-o" />,
                                    
                                    <IconText icon={MessageOutlined} text={item.comments} key="list-vertical-message" />,
                                ]}
                            >
                            </List.Item>
                        </List.Item>            
                    )}
                />
            </Form>
            <Modal visible={showAllImages} onCancel={handleModalClose} footer={null}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src={selectedImages[currentIndex]?.image_src}
                        alt={`Review Image ${selectedImages[currentIndex]?.id}`}
                        style={{ width: '100%', maxHeight: '500px' }}
                    />
                    {currentIndex > 0 && (
                        <LeftOutlined
                            style={{ position: 'absolute', top: '50%', left: '10px', fontSize: '20px', cursor: 'pointer' }}
                            onClick={handlePrevImage}
                        />
                    )}
                    {currentIndex < selectedImages.length - 1 && (
                        <RightOutlined
                            style={{ position: 'absolute', top: '50%', right: '10px', fontSize: '20px', cursor: 'pointer' }}
                            onClick={handleNextImage}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default ProductReview;
