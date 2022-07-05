import {Avatar,Button,Typography} from 'antd';
import { signOut } from "firebase/auth";
import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../Context/AuthProvider';

import { auth } from '../../firebase/config';

const WrapperStyled = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 12px 16px;
    boder-bottom: 1px solid rgb(82,38,83);

    .user-name{
        color: white;
        margin-left: 5px
    }
`;


function UserInfo() {
    const {user,setUser} = useContext(AuthContext);
    const handleLogoutFromChildren = ()=>{
        signOut(auth).then(() => {
        // Sign-out successful.
            setUser({});
        }).catch((error) => {
        // An error happened.
        });
    }
    return ( 
        <WrapperStyled>
            <div>
                <Avatar src={user.photoURL ? user.photoURL : ''}></Avatar>
                <Typography.Text className='user-name'>{user.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleLogoutFromChildren}>Đăng xuất</Button>
        </WrapperStyled>
    );
}

export default UserInfo;