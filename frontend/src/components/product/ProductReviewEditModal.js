import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Rate, Modal, Image, Button} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';



const ProductReviewEditModal = ({ reviewData, onSave, onCancel }) => {
    console.log('reviewData : ', reviewData);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};

    const [editReviewId, setEditReviewId] = useState(null);
    const [editReviewContent, setEditReviewContent] = useState('');
    const [editReviewImages, setEditReviewImages] = useState([]);
    const [editRating, setEditRating] = useState('');

    const [newImages, setNewImages] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);

    useEffect(() => {
        setEditReviewId(reviewData.item.id);
        setEditReviewContent(reviewData.item.content);
        setEditRating(reviewData.item.rating);
        // setEditReviewImages(reviewData.item.images);

        // 이미지를 모달 미리보기에 넣기 위한 커스텀
        if ((reviewData.item.images).length > 0 ){
            const convertedFileList = reviewData.item.images.map((image) => ({
                id: image.id,
                name: image.name,
                status: 'done',
                url: `${image.image_src}`,
            }));
            setEditReviewImages(convertedFileList);
            console.log("editReviewImages :", editReviewImages)
        }
        
    }, [reviewData])
    
    const handleEditRatingChange = (value) => {
        setEditRating(value);
    }

    const handleImageUpload = (info) => {
        // 이미지 추가 처리
        const fileList = info.fileList;
        console.log("handleImageUpload fileList : ", fileList);
        const newImages = fileList.filter((file) => !file.url); // 새로운 이미지만 필터링
        
        setNewImages(newImages);
        setEditReviewImages(fileList);
    };
    
    const handleImageRemove = (removedImage) => {
        console.log('removedImage : ', removedImage)
        // 이미지 삭제 처리
        const imageId = removedImage.id;
        setDeletedImageIds((prevIds) => [...prevIds, imageId]);
        console.log('delete Image ids : ', deletedImageIds);
    };

    const handleEditReviewSubmit = async () => {
        console.log('newImages', newImages)
        const formData = new FormData();
        formData.append('content', editReviewContent);
        formData.append('rating', editRating);
        formData.append('deleted_images', JSON.stringify(deletedImageIds));
        newImages.forEach((file) => {
            formData.append('new_images', file.originFileObj);
        });
        try {
            const response = await axiosInstance.patch(`/review/detail/${editReviewId}/`, formData, { headers });
            console.log(response);
            onSave();
            onCancel();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal
                visible={true} // 모달 표시 여부
                onCancel={onCancel} // 모달 닫기 핸들러
                footer={[
                    <Button key="cancel" onClick={onCancel}>
                        취소
                    </Button>,
                    <Button key="save" type="primary" onClick={handleEditReviewSubmit}>
                        저장
                    </Button>,
                ]}

            >
                <Form 
                    style={{marginTop: '20px'}}
                    initialValues={{
                        content: reviewData ? reviewData.item.content : '', // 리뷰 콘텐츠
                        rating: reviewData ? reviewData.item.rating : 0, // 별점
                        images: reviewData ? editReviewImages : [], // 이미지 리스트
                    }}
                >
                    {/* 별점 수정 */ }
                    <Form.Item name='rating' >
                        <Rate value={editRating} onChange={handleEditRatingChange}  /> 
                    </Form.Item>
                    {/* 코멘트 입력 */}
                    <Form.Item name="content">
                        <Input.TextArea value={editReviewContent} onChange={(e) => setEditReviewContent(e.target.value)} />
                    </Form.Item>

                    
                    <Form.Item name="images" >
                        <div>
                        {/* 이미지 업로드 */}
                        <Upload
                            multiple
                            fileList={editReviewImages}
                            // onChange={(info) => setEditReviewImages(info.fileList)}
                            onChange={handleImageUpload}
                            onRemove={handleImageRemove}
                            beforeUpload={() => {
                                return false;
                            }} 
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                                showDownloadIcon: false,
                                removeIcon: <DeleteOutlined />,
                            }}
                        >
                            
                            {/* 업로드 버튼 */}
                            <div>
                                <PlusOutlined />
                                <div className='ant-upload-text'>Upload</div>
                            </div>
                            
                        </Upload>
                        {/* {editReviewImages.map((image, index) => (
                                    <img
                                        key={image.id || index}
                                        src={image.image_src}
                                        alt={`Review Image ${image.id}`}
                                        style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px', objectFit: 'cover' }}
                                    />
                                ))
                            } */}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    ) 
}


export default ProductReviewEditModal;