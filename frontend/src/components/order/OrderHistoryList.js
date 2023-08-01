import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Table, notification } from 'antd';


const OrderHistoryList = ({orderList}) => {
    console.log('orderList : ', orderList)
    const history = useNavigate();
    const [api, setApi] = notification.useNotification();
    
    const columns = [
        {
            title: '번호',
            dataIndex: 'index',
            key: 'index',
            width: "10%",
            render: (text, record, index) => orderList.length - index,
        },
        {
            title: '제품',
            dataIndex: 'order_details',
            key: 'id',
            render: (order_details, record, index) => (
                <span style={{cursor: 'pointer'}} onClick={() => history(`/order/detail/${orderList[index].id}`)}>
                    {order_details[0].product.name}{' '}
                    {order_details.length > 1 ? `외 ${order_details.length - 1}` : null}
                </span>
            ),
        },
        {
            title: '가격',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (total_price) => (
                <span>{total_price.toLocaleString()} 원</span> // 천 단위 구분 기호와 소수점 표시
            ),
        },
        {
            title: '날짜',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span>{new Date(created_at).toLocaleDateString()}</span> // YYYY-MM-DD 형식으로 표시
            ),
        },
        {
            title: '배송상태',
            dataIndex: 'order_details',
            key: 'status',
            render: (order_details) => {
                const isAllDelivered = order_details.every(
                    (detail) => detail.status[0].status === '배송완료'
                );
                return (
                    <span>
                        {isAllDelivered ? '배송완료' : '배송진행중'}
                    </span>
                );
            },
        },
    ];

    return (
        <>
            {setApi}
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="주문 내역"
                // extra={
                //     <>
                //         Total : 원
                //     </>
                // }
            >
                <div className="table-responsive">
                    <Table dataSource={orderList} columns={columns}  className="ant-border-space" />;
                </div>
            </Card>
        </>
    )
}


export default OrderHistoryList;