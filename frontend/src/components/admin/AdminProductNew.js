import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Button, Form, Input, Upload, Radio, Checkbox, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from 'state';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';


const { Title, Text } = Typography;

const AdminProductNew = ({brandList}) => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const { store: token } = useAppContext();
    const headers = { Authorization: `Bearer ${token['jwtToken']}`};
    const history = useNavigate();

    const [form] = Form.useForm();
    const [productImages, setProductImages] = useState([]);
    
    // 이미지 업로드
    const handleImageUpload = (info) => {
        const fileList = info.fileList;
        setProductImages(fileList);
    };

    // 상품 스타일
    const styleList = [
        '클래식',
        '로맨틱',
        '모던',
        '보헤미안',
        '스트릿',
        '빈티지',
        '미니멀리즘',
        '힙합',

    ];

    // 폼 작성 완료
    const onFinish = async (values) => {
        console.log('onFinish Value : ', values);
        const { product_type, product_subtype, style, brand_id, name, content, purchase_count, price, images, options } = values;
        const selectedStyles = style.join(','); // 배열로 전달되는 style을 문자열로 변환

        const formData = new FormData();
        formData.append('product_type', product_type);
        formData.append('product_subtype', product_subtype);
        formData.append('product_style', selectedStyles);
        formData.append('brand_id', brand_id);
        formData.append('name', name);
        formData.append('content', content);
        formData.append('purchase_count', purchase_count);
        formData.append('price', price);
        formData.append('options', JSON.stringify(options));
        productImages.forEach((file) => {
            formData.append('images', file.originFileObj)
        })

        try{
            const response = await axiosInstance.post(`/product/`, formData, { headers });
            console.log(response);
            
            history('/admin/product');
        }catch(error){
            console.log(error);
        }
        
    };


    return (
        <>
            <Card>
                <Form form={form} layout="vertical" onFinish={onFinish} >
                    <Form.Item label="Product Type" name="product_type" initialValue="T-SHIRTS" rules={[{ required: true, message: '상품 타입을 선택하세요.' }]}>
                        <Radio.Group>
                            <Radio value="T-SHIRTS">T-SHIRTS</Radio>
                            <Radio value="SHIRTS">SHIRTS</Radio>
                            <Radio value="PANTS">PANTS</Radio>
                            <Radio value="ETC">ETC</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.product_type !== currentValues.product_type}
                    >
                        {({ getFieldValue }) => {
                            const productType = getFieldValue('product_type');

                            return (
                                <>
                                    {productType === 'T-SHIRTS' && (
                                        <Form.Item label="T-SHIRTS SubType" name="product_subtype" initialValue="SHORT SLEEVE" rules={[{ required: true, message: '상품 타입을 선택하세요.' }]}>
                                            <Radio.Group>
                                            <Radio value="SHORT SLEEVE">SHORT SLEEVE</Radio>
                                            <Radio value="LONG SLEEVE">LONG SLEEVE</Radio>
                                            <Radio value="SLEEVE LESS">SLEEVE LESS</Radio>
                                            <Radio value="PK T-SHIRTS">PK T-SHIRTS</Radio>
                                            <Radio value="HOOD T-SHIRTS">HOOD T-SHIRTS</Radio>
                                            <Radio value="MTM">MTM</Radio>
                                            <Radio value="KNIT">KNIT</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    )}

                                    {productType === 'SHIRTS' && (
                                        <Form.Item label="SHIRTS SubType" name="product_subtype" initialValue="BASIC SHIRTS" rules={[{ required: true, message: '상품 타입을 선택하세요.' }]}>
                                            <Radio.Group>
                                            <Radio value="BASIC SHIRTS">BASIC SHIRTS</Radio>
                                            <Radio value="CHECK SHIRTS">CHECK SHIRTS</Radio>
                                            <Radio value="1/2 SHIRTS">1/2 SHIRTS</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    )}

                                    {productType === 'PANTS' && (
                                        <Form.Item label="PANTS SubType" name="product_subtype" initialValue="JEANS" rules={[{ required: true, message: '상품 타입을 선택하세요.' }]}>
                                            <Radio.Group>
                                                <Radio value="JEANS">JEANS</Radio>
                                                <Radio value="COTTON PANTS">COTTON PANTS</Radio>
                                                <Radio value="SLACKS">SLACKS</Radio>
                                                <Radio value="SHORT PANTS">SHORT PANTS</Radio>
                                                <Radio value="TRAINING PANTS">TRAINING PANTS</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    )}
                                </>
                            );
                        }}
                    </Form.Item>

                    <Form.Item
                        label="스타일"
                        name="style"
                        rules={[{ required: true, message: '스타일을 선택하세요.' }]}
                    >
                        <Checkbox.Group>
                            {styleList.map((style) => (
                                <Checkbox key={style} value={style}>
                                {style}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                    
                    <Form.Item
                        label="브랜드"
                        name="brand_id"
                        rules={[{ required: true, message: '브랜드를 선택하세요.' }]}
                    >
                        <Select>
                            {brandList.map((brand) => (
                                <Select.Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력하세요.' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="수량" name="purchase_count" rules={[{ required: true, message: '수량을 입력하세요.' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="가격" name="price" rules={[{ required: true, message: '가격을 입력하세요.' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력하세요.' }]}>
                        <Input.TextArea rows={4} placeholder='#을 이용하여 상품을 설명해보세요. ' />
                    </Form.Item>

                    <Form.List name="options">
                        {(fields, { add, remove }) => (
                            <>
                            {fields.map((field, index) => (
                                <div key={field.key}>
                                    <Form.Item label={`Size ${index + 1}`} {...field} name={[field.name, 'option_size']} fieldKey={[field.fieldKey, 'option_size']} rules={[{ required: true, message: '사이즈를 입력하세요.' }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label={`Color ${index + 1}`} {...field} name={[field.name, 'option_color']} fieldKey={[field.fieldKey, 'option_color']} rules={[{ required: true, message: '색상을 입력하세요.' }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label={`Option Price ${index + 1}`} {...field} name={[field.name, 'price']} fieldKey={[field.fieldKey, 'price']} rules={[{ required: true, message: '가격을 입력하세요.' }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label={`Delivery Fee ${index + 1}`} {...field} name={[field.name, 'delivery_fee']} fieldKey={[field.fieldKey, 'delivery_fee']} rules={[{ required: true, message: '배송비를 입력하세요.' }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label={`Quantity ${index + 1}`} {...field} name={[field.name, 'quantity']} fieldKey={[field.fieldKey, 'quantity']} rules={[{ required: true, message: '수량을 입력하세요.' }]}>
                                        <Input />
                                    </Form.Item>

                                    <Button onClick={() => remove(field.name)} style={{marginBottom: '10px'}}>Remove Option</Button>
                                </div>
                            ))}

                                <Form.Item>
                                    <Button onClick={() => add()}>Add Option</Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    
                    <Form.Item name='images'>
                        <Upload
                            multiple
                            fileList={productImages}
                            onChange={handleImageUpload}
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                                showDownloadIcon: false,
                                removeIcon: <span><DeleteOutlined/></span>,
                            }}
                        >
                            {productImages.length > 5 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div className='ant-upload-text'>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">저장</Button>
                        <Button onClick={() => {history('/admin/product')}}style={{ marginLeft: '8px' }}>취소</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default AdminProductNew;
