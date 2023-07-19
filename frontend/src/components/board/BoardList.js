import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Table, notification, Typography } from 'antd';


const { Text } = Typography;

const BoardList = ({questionList}) => {
    console.log('questionList : ', questionList)
    const history = useNavigate();
    const [api, setApi] = notification.useNotification();
    
    const columns = [
        {
            title: '번호',
            dataIndex: 'index',
            key: 'index',
            width: "10%",
            render: (text, record, index) => questionList.length - index,
        },
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => {
                let color = 'black'; // title 기본 색깔
        
                // subject에 따라 색깔 변경
                if (record.subject === '배송문의') color = 'blue';
                else if (record.subject === '상품문의') color = 'green';
                else if (record.subject === '결제문의') color = 'purple';
                else if (record.subject === '기타문의') color = 'violet';
        
                return (
                    <Text style={{cursor: 'pointer'}} onClick={() => history(`/board/detail/${questionList[index].id}`)}>
                        <span style={{ color }}>{`[${record.subject}]`}</span>
                        {` ${text}`}
                    </Text>
                );
            },
        },
        {
            title: '작성자',
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <span>{user.nickname}</span>
            ),
        },
        {
            title: '작성일',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span>{new Date(created_at).toLocaleDateString()}</span> // YYYY-MM-DD 형식으로 표시
            ),
        },
        {

        },
        // {
        //     title: '답변',
        //     dataIndex: 'answer',
        //     key: 'answer',
        //     render: (text, record) => (
        //         <p>{answerList.find((answer) => answer.question === record.id)?.content}</p>
        //     ),
        // },
    ];

    return (
        <>
            {setApi}
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="문의"
            >
                <div className="table-responsive">
                    <Table dataSource={questionList} columns={columns}  className="ant-border-space" />;
                </div>
            </Card>
        </>
    )
}


export default BoardList;