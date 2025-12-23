import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import About from './components/About/About';
import Support from './components/Support/Support';
import AuthModal from './components/AuthModal/AuthModal';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
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
  );
}

export default App;
