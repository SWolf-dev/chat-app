import {onAuthStateChanged} from 'firebase/auth'
import React,{ createContext, useEffect, useState } from 'react';

import {Spin} from 'antd';
import _ from 'lodash'

import { auth } from '../firebase/config';

export const AuthContext = createContext();

function AuthProvider({children, ...props}) {
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        const unSubscibed = onAuthStateChanged(auth, (user) => {
            if(user){
                let {displayName,email,uid,photoURL} = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL
                })
                setIsLoading(false);
                props.history.push('/');
            }else{
                setIsLoading(false);
                props.history.push('/login');
            }
        });
        // clearn
        return ()=>{
            unSubscibed();
        }
    },[]);
    return ( 
        <AuthContext.Provider value={{user,setUser}}>
            {isLoading ? <Spin/> :children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;