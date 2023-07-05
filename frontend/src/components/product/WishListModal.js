import { Modal, Button } from 'antd';

// ProductDetail 컴포넌트 내에서 선언

const WishListModal = ({ visible, onConfirm, onCancel }) => {
    return (
    <Modal
        visible={visible}
        title="찜목록 확인"
        onCancel={onCancel}
        footer={[
            <Button key="cancel" onClick={onCancel}>
                아니오
            </Button>,
            <Button key="confirm" type="primary" onClick={onConfirm}>
                예
            </Button>,
        ]}
    >
        <p>찜목록을 확인하러 가시겠습니까?</p>
    </Modal>
    );
};

export default WishListModal;