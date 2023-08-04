import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Table, notification } from 'antd';


const AdminOrderList = ({orderList}) => {
    console.log('orderList : ', orderList, orderList.map(order => typeof(order.total_price)))
    const history = useNavigate();
    const [api, setApi] = notification.useNotification();

    // 정렬
    const [sortedInfo, setSortedInfo] = useState({
        order: 'descend', // 기본 오름차순 정렬
        columnKey: 'created_at', // status 컬럼으로 정렬
    });
    
    const columns = [
        {
            title: '번호',
            dataIndex: 'id',
            key: 'id',
            width: "10%",
            render: (id) => id
            // render: (text, record, index) => orderList.length - index,
        },
        {
            title: '제품',
            dataIndex: 'order_details',
            key: 'id',
            render: (order_details, record, index) => (
                <span style={{cursor: 'pointer'}} onClick={() => history(`/admin/order/detail/${orderList[index].id}`)}>
                    {order_details[0].product.name}{' '}
                    {order_details.length > 1 ? `외 ${order_details.length - 1}` : null}
                </span>
            ),
        },
        {
            title: '유저',
            dataIndex: 'user',
            key: 'id',
            render: (user) => (
                <>
                    {user.nickname} ({user.email})
                </>
                
            ),
        },
        {
            title: '가격',
            dataIndex: 'total_price',
            key: 'total_price',
            sorter: (a, b) => a.total_price - b.total_price,
            sortOrder: sortedInfo.columnKey === 'total_price' && sortedInfo.order,
            render: (total_price) => (
                <span>{total_price.toLocaleString()} 원</span> // 천 단위 구분 기호와 소수점 표시
            ),
        },
        {
            title: '날짜',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
            render: (created_at) => (
                <span>{new Date(created_at).toLocaleDateString()}</span> // YYYY-MM-DD 형식으로 표시
            ),
        },
        {
            title: '배송상태',
            dataIndex: 'order_details',
            key: 'status',
            sorter: (a, b) => { // 정렬 함수 정의
                const statusA = a.order_details.every(detail => detail.status[0].status === '배송완료');
                const statusB = b.order_details.every(detail => detail.status[0].status === '배송완료');
                if (statusA && !statusB) return -1; // '배송완료'가 우선 순위가 높음
                if (!statusA && statusB) return 1; // '배송완료'가 우선 순위가 높음
                return 0; // 동일한 상태면 유지
            },
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
            render: (order_details) => {
                const isAllDelivered = order_details.every(
                    (detail) => detail.status[0].status === '배송완료'
                );
                return (
                    <span>
                        {isAllDelivered ? (<span style={{color: 'blue', fontWeight: 'bold'}}>배송완료</span>) : (<span style={{color: 'red', fontWeight: 'bold'}}>배송진행중</span>)}
                    </span>
                );
            },
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };
    

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
                    <Table dataSource={orderList} columns={columns} onChange={handleTableChange} className="ant-border-space" />;
                </div>
            </Card>
        </>
    )
}


export default AdminOrderList;