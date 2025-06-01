import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Body from './Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import Connections from './components/Connections';
import Recieved from './components/Recieved';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/recieved" element={<Recieved />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
