import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Table, notification, Typography, Button } from 'antd';


const { Text } = Typography;

const BoardList = ({questionList, answerList}) => {
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
                console.log('reacord :', record)
                // subject에 따라 색깔 변경
                if (record.subject === '배송문의') color = 'blue';
                else if (record.subject === '상품문의') color = 'green';
                else if (record.subject === '결제문의') color = 'purple';
                else if (record.subject === '기타문의') color = 'violet';
        
                return (
                    <Text style={{cursor: 'pointer'}} onClick={() => history(`question/${questionList[index].id}`)}>
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
            title: '답변 확인',
            dataIndex: 'answer',
            key: 'answer',
            render: (answer, record) => (
            answer ? (
                <span onClick={() => history(`answer/${record.key}`)} style={{ text: 'bold', color: 'red'}}>
                    [답변 완료]
                </span>
            ) : (
                <span>답변 없음</span>
            )
        ),
        },
    ];

    // 계단식 형태로 데이터 가공
    const qnaData = questionList.map((question) => {
        const answer = answerList.find((answer) => answer.question_id === question.id);
        return {
            key: question.id,
            question: question,
            answer: answer,
        };
    });
    console.log('qnaData: ', qnaData)

    const data = qnaData.map((qna) => ({
        key: qna.key,
        subject: qna.question.subject,
        title: qna.question.title,
        user: qna.question.user,
        answer: qna.answer,
        created_at: qna.question.created_at,
    }));

    // const expandedRowRender = (record) => {
    //     // 해당 질문에 대한 답변을 찾아옴
    //     const answer = answerList.find((answer) => answer.question_id === record.key);
    
    //     return (
    //         <div>
    //             {answer &&
    //                 <div>
    //                     <p>[답변] {answer.title}</p>
    //                     <p>작성자: {answer.admin.nickname}</p>
    //                     <p>작성일: {new Date(answer.created_at).toLocaleDateString()}</p>
    //                 </div>
    //             }
    //         </div>
    //     );
    // };

    const handlerNew = (e) => {
        e.preventDefault();
        history('new');
    }

    return (
        <>
            {setApi}
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title={
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        자유게시판
                        <Button onClick={handlerNew}>글쓰기</Button>
                    </div>
                }
            >
                <div className="table-responsive">
                    <Table dataSource={data} columns={columns} className="ant-border-space" />;
                </div>
            </Card>
        </>
    )
}


export default BoardList;