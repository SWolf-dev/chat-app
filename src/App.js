import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './Context/AuthProvider';

import './App.css';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App(props) {
  return (
    <AuthProvider history={props.history}>
      <AppProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ChatRoom/>}/>
        </Routes>
        <AddRoomModal/>
        <InviteMemberModal/>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
