import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Table, notification, Select, Input } from 'antd';
import AdminUserModal from './AdminUserModal';
import { axiosInstance } from 'api';


const { Option } = Select;

const AdminUserList = ({userList, setUserList}) => {
    console.log('AdminUserList : ', userList)
    const history = useNavigate();
    const [api, setApi] = notification.useNotification();

    // 정렬
    const [sortedInfo, setSortedInfo] = useState({
        order: 'descend', // 기본 오름차순 정렬
        columnKey: 'created_at', // status 컬럼으로 정렬
    });
    const [searchText, setSearchText] = useState(''); // 검색어
    const [searchType, setSearchType] = useState('user'); // 검색 타입
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };
    
    const onSearchTypeChange = (value) => {
        setSearchType(value);
    };
    
    const columns = [
        {
            title: '번호',
            dataIndex: 'id',
            key: 'id',
            width: "10%",
            render: (id) => id
        },
        {
            title: 'email (nickname)',
            dataIndex: 'email',
            key: 'id',
            render: (email, record) => (
                <>
                    <span style={{cursor: 'pointer'}} onClick={(e) => handleUserClick(record)}>{email} ({record.nickname})</span>
                </>
            )
        },
        {
            title: '총 결제금액',
            dataIndex: 'total_amount_used',
            sorter: (a, b) => a.total_amount_used - b.total_amount_used,
            sortOrder: sortedInfo.columnKey === 'total_amount_used' && sortedInfo.order,
            key: 'total_amount_used',
        },
        {
            title: '인증',
            dataIndex: 'status',
            sorter: (a, b) => {
                const statusOrder = { '미인증': 0, '인증': 1 };
                return statusOrder[a.status] - statusOrder[b.status];
            },
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
            key: 'status',
            render: (status) => (
                <span>{status === '인증' ? '인증' : <span style={{color: 'red', fontWeight: 'bold'}}>미인증</span>}</span>
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
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    // user detail modal open
    const handleUserClick = (user) => {
        console.log(user)
        setSelectedUser(user);
        setShowModal(true);
    };

    // user detail modal ok
    const handleModalOk = () => {
        const fetchUserList = async () => {
            try{
                const { data } = await axiosInstance.get('/account/signup/')
                console.log('Admin User List : ', data);
                setUserList(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchUserList();
    };

    // user detail modal close
    const handleModalCancel = () => {
        setSelectedUser(false);
        setShowModal(null);
    };
    
    const data = userList
        .filter((user) => {
            const userName = user.nickname.toLowerCase();
            const userEmail = user.email.toLowerCase();
            const searchTextLower = searchText.toLowerCase();
            
            if (searchType === 'email') {
                return userEmail.includes(searchTextLower);
            } else if (searchType === 'user') {
                return userName.includes(searchTextLower);
            } else {
                return true;
            }
        })
        .map((user) => ({
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            status: user.status,
            total_amount_used: user.total_amount_used,
            image_src: user.image_src,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }));

    return (
        <>
            {setApi}
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title={
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        유저 리스트
                        <div>
                            <Select
                                value={searchType}
                                onChange={onSearchTypeChange}
                                style={{ width: 200, marginRight: 16 }}
                            >
                                <Option value="user">닉네임 검색</Option>
                                <Option value="email">이메일 검색</Option>
                            </Select>
                            <Input
                                placeholder="검색어 입력"
                                value={searchText}
                                onChange={onSearchTextChange}
                                style={{ width: 200, marginRight: 16 }}
                                />
                        </div>
                    </div>

                }
            >
                <div className="table-responsive">
                    <Table dataSource={data} columns={columns} onChange={handleTableChange} className="ant-border-space" />;
                </div>
            </Card>

            {/* Modal */}
            {selectedUser && (
                <AdminUserModal
                    userData={selectedUser}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                />
            )}
        </>
    )
}


export default AdminUserList;