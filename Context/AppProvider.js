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
    if(!_.isEmpty(user)){

        const roomsCondition =  useMemo(()=>{
            return{
                fieldName: 'members',
                operator: 'array-contains',
                compareValue: user.uid
            }
        },[user.uid]);
        rooms = useFireStore('rooms', roomsCondition);
        console.log(rooms)
    }
    return ( 
        <AppContext.Provider value={{rooms,isAddRoomVisible,setIsAddRoomVisible}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;