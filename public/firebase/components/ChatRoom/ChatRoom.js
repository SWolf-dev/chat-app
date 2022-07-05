import {Row,Col} from 'antd';

import { useContext, useState } from 'react';
import {Navigate} from 'react-router-dom';
import _ from 'lodash';
import React from 'react';
import ChatWindown from './ChatWindown';
import SideBar from './SideBar';


function ChatRoom() {
    return ( 
        <Row>
            <Col span={8}>
                <SideBar />
            </Col>
            <Col span={16}>
                <ChatWindown/>
            </Col>
        </Row>
     );
}

export default ChatRoom;