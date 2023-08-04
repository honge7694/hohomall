import { Modal, Avatar, Typography } from 'antd';


const { Title, Text } = Typography;

const AdminUserModal = ({ userData, onCancel }) => {
    const { id, email, nickname, image_src, status, total_amount_used, created_at } = userData;

    return (
        <Modal
            visible={true}
            onCancel={onCancel}
            footer={null}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={image_src} size={80} />
                <div style={{ marginLeft: '20px' }}>
                    <h3>{nickname} ({email})</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ flexShrink: 0, width: 200 }}>
                            <Text style={{ fontSize: '16px' }}>상태</Text>
                        </div>
                        <div>
                            <Text style={{ fontSize: '18px' }}>{status}</Text>
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
                </div>
            </div>
        </Modal>
    );
};

export default AdminUserModal;
