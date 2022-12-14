import React from 'react';
import Signup from './components/account/Signup';
import Login from './components/account/Login';
import Account from './components/account/Account';
import ProtectedRoute from './components/account/ProtectedRoute';
import { AuthContextProvider } from './contexts/AuthContext';
import {Routes, Route} from 'react-router-dom'
import OPApp from './components/OnePiece/components/OPApp'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/login' element={<Login />} exact/>
        <Route path='/signup' element={<Signup />} exact/>
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} exact/>
      </Routes>
      <OPApp />
    </AuthContextProvider>
  );
}

export default App;
