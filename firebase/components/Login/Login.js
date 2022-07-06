import React, { useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import {Row,Col,Typography, Button} from 'antd';
import { signInWithPopup } from "firebase/auth";

import {auth, fbProvider} from "../../firebase/config";
import { setDocument } from "../../firebase/services";

import _ from "lodash";

const {Title} = Typography;


function Login() {

    const handleLoginWithfb = async()=>{
        const {user} = await signInWithPopup(auth,fbProvider);
        console.log(user)
        setDocument("users",`${user.displayName}_${user.uid}`, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: user.providerData[0].providerId,
            createdAt: user.metadata.createdAt,
        });
        
    }

    return ( 
        <Row justify="center" style={{maxHeight:800}}>
            <Col span={8}>
                <Title style={{textAlign:'center'}} level={3}>
                    Chat App
                </Title>
                <Button style={{width:'100%',marginBottom:5}}>
                    Đăng nhập với Google
                </Button>
                <Button style={{width:'100%'}} onClick={handleLoginWithfb}>
                    Đăng nhập với Facebook
                </Button>
            </Col>
        </Row>
     );
}

export default Login;