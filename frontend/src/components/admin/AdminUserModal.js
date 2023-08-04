import { useState } from 'react';
import { Form, Modal, Avatar, Typography, Button, Select } from 'antd';
import { axiosInstance } from 'api';

const { Title, Text } = Typography;

const AdminUserModal = ({ userData, onOk, onCancel }) => {
    const { id, email, nickname, image_src, status, total_amount_used, created_at, updated_at } = userData;

    const [editStatus, setEditStatus] = useState(status);

    // user detail modal ok
    const handleModalOk = () => {
        const userStatusUpdate = async () => {
            const formData = new FormData();
            formData.append('status', editStatus);

            try {
                const response = await axiosInstance.patch(`/account/info/${id}/`, formData);
                console.log('response : ', response);
                onOk();
                onCancel();
            }catch(error){
                console.log('error : ', error);
            }
        }
        userStatusUpdate();
    };

    return (
        <Modal
            visible={true}
            onOk={handleModalOk}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    취소
                </Button>,
                <Button key="save" type="primary" onClick={handleModalOk}>
                    저장
                </Button>,
            ]}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={image_src} size={80} />
                <div style={{ marginLeft: '20px' }}>
                    <h3>{nickname} ({email})</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ flexShrink: 0, width: 200 }} >
                            <Text style={{ fontSize: '16px' }}>상태</Text>
                        </div>
                        
                        <div style={{ position: 'relative', top: '10px' }}>
                            <Form layout="vertical" initialValues={{ status: status }}>
                                <Form.Item name="status">
                                    <Select onChange={setEditStatus}>
                                        <Select.Option key={1} value={"인증"}>
                                            인증
                                        </Select.Option>
                                        <Select.Option key={2} value={"미인증"}>
                                            미인증
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ flexShrink: 0, width: 200 }}>
                            <Text style={{ fontSize: '16px' }}>사용 금액</Text>
                        </div>
                        <div>
                            <Text style={{ fontSize: '18px' }}>{total_amount_used.toLocaleString()} 원</Text>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ flexShrink: 0, width: 200 }}>
                            <Text style={{ fontSize: '16px' }}>가입일</Text>
                        </div>
                        <div>
                            <Text style={{ fontSize: '18px' }}> {new Date(created_at).toLocaleDateString()}</Text>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ flexShrink: 0, width: 200 }}>
                            <Text style={{ fontSize: '16px' }}>수정일</Text>
                        </div>
                        <div>
                            <Text style={{ fontSize: '18px' }}> {new Date(updated_at).toLocaleDateString()}</Text>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AdminUserModal;
