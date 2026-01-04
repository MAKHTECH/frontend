import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import About from './components/About/About';
import Support from './components/Support/Support';
import AuthModal from './components/AuthModal/AuthModal';
import Dashboard from './components/Dashboard/Dashboard';
import Servers from './pages/Servers/Servers';
import MyServers from './pages/MyServers/MyServers';
import Profile from './pages/Profile/Profile';
import authService from './services/authService';
import './App.css';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем токены при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.validateAndGetUser();
        if (userData) {
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const handleLoginSuccess = () => {
    // Получаем данные пользователя из токена
    const userData = authService.getUserFromToken();
    if (userData) {
      setUser(userData);
      setIsLoggedIn(true);
      setIsAuthOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  // Показываем загрузку пока проверяем токены
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <div className="app">
                <Header onAuthClick={openAuth} />
                <main>
                  <Hero onAuthClick={openAuth} />
                  <Features />
                  <Pricing onAuthClick={openAuth} />
                  <About />
                  <Support onAuthClick={openAuth} />
                </main>
                <AuthModal 
                  isOpen={isAuthOpen} 
                  onClose={closeAuth} 
                  onSuccess={handleLoginSuccess}
                />
              </div>
            )
          } 
        />

        {/* Dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Servers />} />
          <Route path="my-servers" element={<MyServers />} />
          <Route path="profile" element={<Profile user={user} onUserUpdate={handleUserUpdate} />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
