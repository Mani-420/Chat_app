import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Components
import Navbar from './components/Navbar';

// Importing pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
