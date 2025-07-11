import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';

// Importing Components
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

// Importing pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  // Initialize Zustand store for authentication
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('Auth User:', authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!authUser ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={authUser ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: 'bg-base-100 text-base-content',
            style: {
              fontSize: '0.875rem',
              padding: '0.5rem 1rem'
            }
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
