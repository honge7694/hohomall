import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { userState } from 'state';
import { useSetRecoilState } from "recoil";

import {
    Layout,
    Menu,
    Button,
    Typography,
    Card,
    Form,
    Input,
    notification,
    Modal,
    Checkbox,
    Row,
    Col,
    Upload
} from "antd";
import {
    SmileOutlined, 
    FrownOutlined,
    UploadOutlined 
} from "@ant-design/icons";


const UserDelete = ({data}) => {
    const { userInfo, setUserInfo } = data;
    const { id, email, nickname, image_src } = userInfo;
    const setUser = useSetRecoilState(userState); // Header

    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const [api, setApi] = notification.useNotification();

    const [ fieldsErrors, SetFieldsErrors ] = useState({});
    const [currentPassword, setCurrentPassword] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = async () => {
        try{
            data = {
                'current_password': currentPassword,
            }
            console.log('data : ', data)
            const response = await axiosInstance.delete(`/account/delete/${id}/`, {data, headers});
            console.log("response : ", response);
            api.info({
                message: '회원 탈퇴가 완료되었습니다.',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>  
            });
            setIsModalVisible(false);
        }catch(error){
            console.log('error : ', error);
            if (error.response){
                api.info({
                    message: '회원 탈퇴 실패',
                    description: `${error.response.data.error}`,
                    icon: <FrownOutlined style={{ color: "red" }}/>
                });
            }
        }
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    
    const onFinish = (values) => {
        const {current_password} = values;
        setCurrentPassword(current_password);
        showModal();
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            {setApi}
            <Card
                className="card-signup header-solid ant-card pt-0"
                title={<h5>회원탈퇴</h5>}
                bordered="false"
                style={{marginTop: "25px"}}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="row-col"
                >

                    <Form.Item
                        name="current_password"
                        rules={[
                            { required: true, message: "현재 비밀번호를 입력해주세요." },
                        ]}
                    >
                        <Input.Password placeholder="Current Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                        >
                            탈퇴
                        </Button>
                    </Form.Item>
                </Form>
                <Modal
                    title="회원 탈퇴"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="예"
                    cancelText="취소"
                >
                    <p>정말 삭제하시겠습니까?</p>
                </Modal>
            </Card>
        </>
    )
}

export default UserDelete;