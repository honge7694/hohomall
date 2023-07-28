import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Table, notification, Typography, Button, Input, Select, Checkbox } from 'antd';


const { Text } = Typography;
const { Option } = Select;

const BoardList = ({questionList, answerList}) => {
    console.log('questionList : ', questionList)
    const history = useNavigate();
    const [api, setApi] = notification.useNotification();
    
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('title'); // Default search by title
    const [showCompleted, setShowCompleted] = useState(false);

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };
    
    const onSearchTypeChange = (value) => {
        setSearchType(value);
    };
    
    const onShowCompletedChange = (e) => {
        setShowCompleted(e.target.checked);
    };
    
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

    const data = qnaData
        .filter((qna) => {
            if (showCompleted) {
                return qna.answer;
            } else {
                return true; // Show all questions if showCompleted is false
            }
        })
        .filter((qna) => {
            const questionText = qna.question.title.toLowerCase();
            const userName = qna.question.user.nickname.toLowerCase();
            const searchTextLower = searchText.toLowerCase();
            
            if (searchType === 'title') {
                return questionText.includes(searchTextLower);
            } else if (searchType === 'user') {
                return userName.includes(searchTextLower);
            } else {
                return true; // Show all questions if searchType is invalid
            }
        })
        .map((qna) => ({
            key: qna.key,
            subject: qna.question.subject,
            title: qna.question.title,
            user: qna.question.user,
            answer: qna.answer,
            created_at: qna.question.created_at,
        }));

    // const data = qnaData.map((qna) => ({
    //     key: qna.key,
    //     subject: qna.question.subject,
    //     title: qna.question.title,
    //     user: qna.question.user,
    //     answer: qna.answer,
    //     created_at: qna.question.created_at,
    // }));

    const handlerNew = (e) => {
        e.preventDefault();
        // TODO: 로그인 안했으면 로그인 다시하기.
        history('new');
    }

    return (
        <>
            {setApi}
            <div>
                {/* <Checkbox checked={showCompleted} onChange={onShowCompletedChange}>
                    답변 완료된 것만 보기
                </Checkbox> */}
            </div>
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title={
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        QnA게시판
                        <div>
                        <Select
                            value={searchType}
                            onChange={onSearchTypeChange}
                            style={{ width: 200, marginRight: 16 }}
                        >
                            <Option value="title">제목으로 검색</Option>
                            <Option value="user">작성자 이름으로 검색</Option>
                        </Select>
                        <Input
                            placeholder="검색어 입력"
                            value={searchText}
                            onChange={onSearchTextChange}
                            style={{ width: 200, marginRight: 16 }}
                        />
                        <Button onClick={handlerNew}>글쓰기</Button>
                        </div>
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