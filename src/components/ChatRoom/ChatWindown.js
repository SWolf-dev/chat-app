import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import {Button,Avatar,Tooltip,Form,Input,Alert} from 'antd';
import { UserAddOutlined } from "@ant-design/icons";

import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { setDocument } from "../../firebase/services";
import {AuthContext} from"../../Context/AuthProvider"
import useFireStore from "../../hooks/useFireStore";
import { formatRelative } from "date-fns";


const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 32px;
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
const FormStyled = styled(Form)`
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

function formatDate (seconds){
    let formatedDate = '';
    if(seconds){
        formatedDate = formatRelative(new Date(seconds), new Date());
        formatedDate= formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
    }
    return formatedDate;
}

function ChatWindown() {
    const {selectedRoom,members,setIsInviteMemberModalVisible} = useContext(AppContext);
    const {user} = useContext(AuthContext);
    const [form] = Form.useForm();
    const [inputValue,setinputValue] = useState('');
    const handleInputChange = (e)=>{
        setinputValue(e.target.value);
    }
    const handleOnSubmit = ()=>{
        let uid = new Date().getTime();
        setDocument('messages',`${uid}`,{
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName,
            createdAt: uid
        });
        form.resetFields(['message']);
    }
    const messageCondition = useMemo(()=>{
        return{
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom ? selectedRoom.id: {}
        }

    },[selectedRoom ? selectedRoom.id: {}]);
    const messages = useFireStore('messages',messageCondition);
    return (
        <WrapperStyled>
            {
                selectedRoom ? 
                <>
                    <HeaderStyled>
                        <div className="header-info">
                            <p className="header-title">{selectedRoom && selectedRoom.name}</p>
                            <span className="header-description" >{selectedRoom && selectedRoom.description}</span>
                        </div>
                        <ButtonGroupStyled >
                            <Button onClick={()=>setIsInviteMemberModalVisible(true)} icon={<UserAddOutlined/>} type={'text'}>Mời</Button>
                            <Avatar.Group size={'small'} maxCount={2}>
                                {
                                    members.map((member)=>{
                                        return(                                   
                                            <Tooltip title={member.displayName} key={member.id}>
                                                <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                                            </Tooltip>
                                        )
                                    })
                                }
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled>
                            {
                                messages &&
                                messages.map((mes)=>{
                                    return(
                                        <Message 
                                            key={mes.id}
                                            text={mes.text} 
                                            photoURL={mes.photoURL}
                                            displayName={mes.displayName}
                                            createdAt={formatDate(mes.createdAt)}
                                        />
                                    )
                                })
                            }
                        </MessageListStyled>
                        <FormStyled form={form} >
                            <Form.Item name="message">
                                <Input bordered={false}
                                    onChange={handleInputChange}
                                    onPressEnter={handleOnSubmit}
                                    placeholder="Tin  nhắn"
                                    autoComplete={'off'}
                                />
                            </Form.Item>
                            <Button type="primary" onClick={handleOnSubmit}>Gửi</Button>
                        </FormStyled>
                    </ContentStyled>
                </>:<Alert message="Hãy chọn phòng" type="info" showIcon style={{margin: '5px'}} closable/>
            }
        </WrapperStyled>
    );
}

export default ChatWindown;