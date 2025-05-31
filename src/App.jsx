import { Routes, Route } from 'react-router-dom';

import Body from './Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
