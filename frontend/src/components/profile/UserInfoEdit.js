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


const UserInfoEdit = ({data}) => {
    console.log('UserInfoEdit_data : ', data);
    const { userInfo, setUserInfo } = data;
    const { id, email, nickname, image_src } = userInfo;
    const setUser = useSetRecoilState(userState); // Header

    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const [api, setApi] = notification.useNotification();

    const [ fieldsErrors, SetFieldsErrors ] = useState({});
    
    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append("nickname", values.nickname);
        if (values.image) {
            console.log(values.image);
            formData.append("image_src", values.image[0].originFileObj); // 이미지 파일 업로드 시
        }
        try{
            const response = await axiosInstance.put(`/account/info/${id}/`, formData, {
                headers: {
                    ...headers,
                    "Content-Type": "multipart/form-data", // 이미지 업로드 시 Content-Type 설정
                },
            });
            
            // Profile의 userInfo 상태 변경
            const updatedUserInfo = { ...userInfo, nickname: values.nickname };
            if (response.data.image_src) {
                updatedUserInfo.image_src = response.data.image_src;
            }
            setUserInfo(updatedUserInfo);
            // Header User 닉네임, Id
            setUser({
                userId: id,
                userNickname: values.nickname,
            });

            api.info({
                message: '유저 변경이 완료되었습니다.',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>  
            });
            
        } catch(error) {

        }


    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            {setApi}
            <Card
                className="card-signup header-solid ant-card pt-0"
                title={<h5>회원정보 수정</h5>}
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
                        name="nickname"
                        rules={[
                            { required: true, message: "Please input your nicknmame!" },
                        ]}
                    >
                        <Input placeholder="Nickname" style={{height:'50px'}} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="image"
                        rules={[{ required: false }]}
                        valuePropName="fileList" // 커스텀 값 전달기 정의
                        getValueFromEvent={(e) => e.fileList} // 파일 목록 추출
                    >
                        <Upload
                            name="image"
                            beforeUpload={() => false} // 업로드 방지
                            multiple={false} // 단일 파일 선택
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                        >
                            수정완료
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default UserInfoEdit;