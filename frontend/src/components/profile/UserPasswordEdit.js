import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from 'api';
import { useAppContext } from 'store';

import {
    Layout,
    Menu,
    Button,
    Typography,
    Card,
    Form,
    Input,
    notification,
    Checkbox
} from "antd";

import {
    SmileOutlined, 
    FrownOutlined 
} from "@ant-design/icons";


const UserPasswordEdit = ({data}) => {
    console.log('UserPasswordEdit_data : ', data);
    const { id, email, nickname, image_src } = data.userInfo;
    const [ fieldsErrors, SetFieldsErrors ] = useState({});
    const [api, setApi] = notification.useNotification();
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    
    const onFinish = async (values) => {
        console.log("finish : ", values);
        const { current_password, password } = values;
        const data = { current_password, password };
        console.log("data : ", data);
        try{
            const response = await axiosInstance.put(`/account/info/password/${id}/`, data, {headers});
            console.log("response : ", response);
            api.info({
                message: '비밀번호 변경이 완료되었습니다.',
                icon: <SmileOutlined style={{ color: "#108ee9" }}/>  
            });


        }catch(error){
            console.log('error : ', error.response);
            console.log('error.data : ', error.response.data);

            if (error.response){
                api.info({
                    message: '비밀번호 변경 실패',
                    description: `${error.response.data}`,
                    icon: <FrownOutlined style={{ color: "red" }}/>
                });
            }
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
                title={<h5>비밀번호 수정</h5>}
                bordered="false"
                style={{marginTop: "25px"}}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="row-col"
                    { ...fieldsErrors }
                >
                    <Form.Item
                        name="current_password"
                        rules={[
                            { required: true, message: "현재 비밀번호를 입력해주세요." },
                        ]}
                    >
                        <Input.Password placeholder="Current Password" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "변경할 비밀번호를 입력해주세요." },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item 
                        name="confirm" 
                        dependencies={['password']} 
                        rules={[
                            {
                                required: true, message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                                },
                            }),
                        ]}
                    >
                    <Input.Password placeholder="Confirm Password" />
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

export default UserPasswordEdit;