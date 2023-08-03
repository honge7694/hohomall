import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Modal, Row, Col, notification } from 'antd';
import { EditOutlined, DeleteOutlined, MenuOutlined, MessageOutlined, SmileOutlined, FrownOutlined } from "@ant-design/icons";
import ImageGallery from 'react-image-gallery';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const QuestionDetail = ({answerData, userInfo}) => {
    console.log('answerData : ', answerData)
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);

    const imageItems = answerData.images.map((image) => ({
        original: image.image_src,
        thumbnail: image.image_src, // 원하는 썸네일 이미지 URL을 여기에 넣어주세요.
    }));

    const handleImageSelect = (index) => {
        setSelectedImage(answerData.images[index].original);
    };

    // 삭제 함수
    const handlerDelete = async () => {
        try{
            const response = await axiosInstance.delete(`/board/answer/detail/${id}/`, { headers });
            console.log(response);

            notification.open({
                message: '게시글 삭제가 완료되었습니다.',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>
                
            });
        }catch(error){
            console.log('error : ', error);
            notification.open({
                message: '게시글이 삭제되지 않았습니다.',
                description: '게시글을 삭제할 권한이 없습니다.',
                icon: <FrownOutlined style={{ color: "red" }}/>
            });
        }
        history('/qna');
    }

    // 사용자 권한에 따라 수정, 삭제 버튼 렌더링
    const renderActionButtons = () => {
        if (user['userId'] === null) {
            // 로그인하지 않은 사용자는 버튼 없음
            console.log("로그인 하지 않음");
            return [
                <MenuOutlined onClick={() => history('/qna')}></MenuOutlined>,
            ];
        } else if (user['isAdmin']) {
            // 관리자는 답변하기 버튼 렌더링
            console.log("관리자");
            return [
                <MenuOutlined onClick={() => history('/qna')}></MenuOutlined>,
                <MessageOutlined onClick={() => history('answer')}>답변</MessageOutlined>,
                <EditOutlined onClick={() => history('edit')}>수정</EditOutlined>,
                <DeleteOutlined onClick={() => handlerDelete()}>삭제</DeleteOutlined>,
            ];
        } else {
          // 다른 사용자는 홈 버튼
            return [
                <MenuOutlined onClick={() => history('/qna')}></MenuOutlined>,
            ];
        }
    };


    return (
        <>
            <Card
                key={answerData.id}
                style={{ marginBottom: '20px' }}
                actions={renderActionButtons()}

            >
                <Title level={3} style={{ fontSize: '24px' }}>
                    <span style={{ color: 'blue' }}>{`[답변완료]`}</span>
                    {answerData.title}
                </Title>
                    
                <Row gutter={[16, 16]}>
                    <Col span={12} style={{minHeight: '410px'}}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: '16px' }}>작성자</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: '18px' }}>{answerData.admin.nickname}</Text>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: '16px' }}>작성일</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: '18px' }}>{new Date(answerData.created_at).toLocaleDateString()}</Text>
                            </div>
                        </div>

                        <Text style={{ fontSize: '18px' }}>{answerData.content}</Text>
                    
                    </Col>
                    
                    <Col span={12}>
                    {imageItems.length > 0 ? (
                        <ImageGallery
                            items={imageItems}
                            showThumbnails={true}
                            onClickThumbnail={handleImageSelect}
                            additionalClass="gallery-thumbnail"
                            slideDuration={450}
                            renderItem={(item) => (
                                <div>
                                    <Image src={item.original} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                                </div>
                            )}
                        />
                    ) : null }
                    </Col>

                    <Modal visible={selectedImage} onCancel={() => setSelectedImage(null)}>
                        <Image src={selectedImage} style={{ width: '100%', height: 'auto' }} />
                    </Modal>
                </Row>
            </Card>
        </>
    );
};

export default QuestionDetail;
