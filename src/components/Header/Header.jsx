import { useState } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Orbita" className="logo-img" />
          <span className="logo-text">Orbita</span>
        </a>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#features" className="nav-link">Возможности</a></li>
            <li><a href="#pricing" className="nav-link">Тарифы</a></li>
            <li><a href="#about" className="nav-link">О нас</a></li>
            <li><a href="#support" className="nav-link">Поддержка</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="#login" className="btn-login">Войти</a>
          <a href="#register" className="btn-register">Начать</a>
        </div>

        <button 
          className={`burger ${isMenuOpen ? 'burger-active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
