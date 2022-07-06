import React from "react";
import styled from "styled-components";
import {Button,Avatar,Tooltip,Form,Input} from 'antd';
import { UserAddOutlined } from "@ant-design/icons";

import Message from "./Message";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);
    .header{
        &-info{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
        &-title{
            margin: 0;
            font-weight: bold;
        }
        &-description{
            font-sixe: 12px;
        }
    }
`;
const ContentStyled = styled.div`
    height: calc(100% - 56px);
    padding: 11px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;
const ButtonGroupStyled = styled.div`
    display:flex;
    align-items: center;
`; 
const MessageListStyled = styled.div`
    max-height: 100%;
    over-flow-y: auto;
`;
const WrapperStyled = styled.div`
    height: 100vh;
`;
const FormStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`;

function ChatWindown() {
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header-info">
                    <p className="header-title">Room 1</p>
                    <span className="header-decription" >Đây là Room 1</span>
                </div>
                <ButtonGroupStyled >
                    <Button icon={<UserAddOutlined/>} type={'text'}>Mời</Button>
                    <Avatar.Group size={'small'} maxCount={2}>
                        <Tooltip title={'a'}>
                            <Avatar>A</Avatar>
                        </Tooltip>
                        <Tooltip title={'b'}>
                            <Avatar>b</Avatar>
                        </Tooltip>
                        <Tooltip title={'c'}>
                            <Avatar>c</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    <Message text={'abcd'} displayName="Trung" createdAt={123}/>
                    <Message text={'abcd'} displayName="Trung" createdAt={123}/>
                    <Message text={'abcd'} displayName="Trung" createdAt={123}/>
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input bordered={false}/>
                    </Form.Item>
                    <Button placeholder="Tin  nhắn" type="primary">Gửi</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    );
}

export default ChatWindown;