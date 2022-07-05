import { createContext,  useMemo, useContext, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import React from 'react';

import { AuthContext } from './AuthProvider';
import _ from 'lodash';


export const AppContext = createContext();

function AppProvider({children}) {
    const {user} = useContext(AuthContext);
    let rooms = [];
    const [isAddRoomVisible,setIsAddRoomVisible] = useState(false);
    const [isInviteMemberModalVisible,setIsInviteMemberModalVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const roomsCondition =  useMemo(()=>{
        return{
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid
        }
    },[user.uid]);
    rooms = useFireStore('rooms', roomsCondition);
    const selectedRoom = useMemo(()=>{
        let roomSelected = selectedRoomId ?
        rooms.find((room)=>{
                return room.id === selectedRoomId;
        }):null;
        return roomSelected;
    },[rooms,selectedRoomId]);
    const usersCondition =  useMemo(()=>{
        return{
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom ? selectedRoom.members: []
        }
    },[selectedRoom ? selectedRoom.members: '']);
    let members = useFireStore('users',usersCondition);
    return ( 
        <AppContext.Provider value={{rooms,isAddRoomVisible,setIsAddRoomVisible,setSelectedRoomId,selectedRoom,members,isInviteMemberModalVisible,setIsInviteMemberModalVisible}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;