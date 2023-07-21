import React, { useState } from 'react';
import { useNavigate, seParams } from "react-router-dom";
import { Card, Image, Typography, List, Modal, Row, Col, Button } from 'antd';
import { EditOutlined, DeleteOutlined, MenuOutlined, MessageOutlined , CheckSquareOutlined} from "@ant-design/icons";
import ImageGallery from 'react-image-gallery';
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';

const { Title, Text } = Typography;

const QuestionDetail = ({questionData, userInfo}) => {
    console.log('questionData : ', questionData)
    const user = useRecoilValue(userState);
    const history = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);

    const imageItems = questionData.images.map((image) => ({
        original: image.image_src,
        thumbnail: image.image_src, // 원하는 썸네일 이미지 URL을 여기에 넣어주세요.
    }));

    const handleImageSelect = (index) => {
        setSelectedImage(questionData.images[index].original);
    };

    const subjectColor = () => {
        let color = 'black';
        if (questionData.subject === '배송문의') color = 'blue';
        else if (questionData.subject === '상품문의') color = 'green';
        else if (questionData.subject === '결제문의') color = 'purple';
        else if (questionData.subject === '기타문의') color = 'violet';

        return color
    }

    // 사용자 권한에 따라 수정, 삭제 버튼 렌더링
    const renderActionButtons = () => {
        if (user['userId'] === null) {
            // 로그인하지 않은 사용자는 버튼 없음
            console.log("로그인 하지 않음");
            return [
                <MenuOutlined onClick={() => history('/qna')}></MenuOutlined>,
            ];
        } else if (user['userNickname'] === 'super') {
            // 관리자는 답변하기 버튼 렌더링
            console.log("관리자");
            return [
                <MenuOutlined onClick={() => history('/qna')}></MenuOutlined>,
                <MessageOutlined onClick={() => history('answer')}>답변</MessageOutlined>,
                <EditOutlined onClick={() => history('edit')}>수정</EditOutlined>,
                <DeleteOutlined onClick={() => history('delete')}>삭제</DeleteOutlined>,
            ];
        } else if (user['userId'] === questionData.user.id) {
             // 글 작성자는 수정, 삭제 버튼 렌더링
            console.log("글 작성자");
            return [
                <MenuOutlined onClick={() => history('/qna')}></MenuOutlined>,
                <EditOutlined onClick={() => history('edit')}>수정</EditOutlined>,
                <DeleteOutlined onClick={() => history('delete')}>삭제</DeleteOutlined>,
            ];
        } else {
          // 다른 사용자는 버튼 없음
            return null;
        }
    };


    return (
        <>
            <Card
                key={questionData.id}
                style={{ marginBottom: '20px' }}
                actions={renderActionButtons()}
            >
                    <Title level={3} style={{ fontSize: '24px' }}>
                        <span style={{ color: subjectColor() }}>{`[${questionData.subject}]`}</span>
                        {questionData.title}
                    </Title>
                    
                <Row gutter={[16, 16]}>
                    <Col span={12} style={{minHeight: '410px'}}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: '16px' }}>작성자</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: '18px' }}>{questionData.user.nickname}</Text>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: '16px' }}>작성일</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: '18px' }}>{new Date(questionData.created_at).toLocaleDateString()}</Text>
                            </div>
                        </div>

                        {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flexShrink: 0, width: 200 }}>
                                <Text style={{ fontSize: '16px' }}>내용</Text>
                            </div>
                            <div>
                                <Text style={{ fontSize: '18px' }}>{questionData.content}</Text>
                            </div>
                        </div> */}

                        <Text style={{ fontSize: '18px' }}>{questionData.content}</Text>
                    
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
                    ):( null ) }
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
