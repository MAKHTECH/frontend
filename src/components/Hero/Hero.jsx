import { useState, useEffect } from 'react';
import './Hero.css';

function Hero({ onAuthClick }) {
  const [typedText, setTypedText] = useState('');
  const fullText = 'orbita.deploy({ server: "vps", location: "eu" });';
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-scanlines"></div>
      
      <div className="hero-container">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="btn-close"></span>
              <span className="btn-min"></span>
              <span className="btn-max"></span>
            </div>
            <span className="terminal-title">orbita@vps: ~</span>
          </div>
          
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="prompt">$</span>
              <span className="command">{typedText}</span>
              <span className="cursor">_</span>
            </div>
            
            <div className="terminal-output">
              <p><span className="output-success">✓</span> Инициализация...</p>
              <p><span className="output-success">✓</span> Сервер развёрнут за <span className="highlight">0.8s</span></p>
              <p><span className="output-info">→</span> IP: <span className="highlight">185.xxx.xxx.xxx</span></p>
              <p><span className="output-info">→</span> SSH: <span className="code-string">ssh root@orbita.cloud</span></p>
            </div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-tag mono">
            <span className="tag-bracket">&lt;</span>
            VPS Hosting
            <span className="tag-bracket">/&gt;</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-comment">// Серверы для тех,</span>
            <span className="title-main">кто пишет код</span>
          </h1>
          
          <p className="hero-description mono">
            NVMe SSD • DDoS Protection • 99.9% Uptime • Root Access
          </p>
          
          <div className="hero-actions">
            <button onClick={onAuthClick} className="btn-primary-new mono">
              <span className="btn-bracket">[</span>
              Начать
              <span className="btn-bracket">]</span>
            </button>
            <a href="#features" className="btn-secondary-new mono">
              README.md
            </a>
          </div>

          <div className="hero-stats mono">
            <div className="stat-item">
              <span className="stat-key">servers:</span>
              <span className="stat-value">50K+</span>
            </div>
            <div className="stat-item">
              <span className="stat-key">uptime:</span>
              <span className="stat-value">"99.9%"</span>
            </div>
            <div className="stat-item">
              <span className="stat-key">locations:</span>
              <span className="stat-value">10</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-hint mono">
        <span>scroll</span>
        <span className="scroll-arrow">↓</span>
      </div>
    </section>
  );
}

export default Hero;
