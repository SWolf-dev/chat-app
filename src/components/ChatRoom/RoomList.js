import {Collapse,Typography,Button} from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import React,{ useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';

const {Panel} = Collapse;
const LinkStyled = styled(Typography.Link)`
    &&&{
        display: block;
        color: white;
        margin-bottom: 5px;
    }
`;
const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header,p{
            color: white;
        }
        .ant-collapse-content-box{
            padding: 0 40px;
        }
        .add-btn{
            color: white;
            padding: 0;
        }
    }
`;

function RoomList() {
    const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);
    const handleOpenAddRoomModal = ()=>{
        setIsAddRoomVisible(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sách các phòng" key={'1'}>
                {rooms.map(room=><LinkStyled onClick={()=>setSelectedRoomId(room.id)} key={room.id}>{room.name}</LinkStyled>)}
                <Button type='text' icon={<PlusSquareOutlined/>} onClick={handleOpenAddRoomModal} className='add-btn'>Thêm phòng</Button>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;