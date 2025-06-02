import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import Connections from './components/Connections';
import Recieved from './components/Recieved';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequiredAuth';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <RequireAuth>
            <PrivateLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/recieved" element={<Recieved />} />
      </Route>
    </Routes>
  );
}

export default App;
