import './About.css';

function About() {
  const timeline = [
    { year: '2018', event: 'init()', desc: 'Запуск проекта Orbita' },
    { year: '2020', event: 'scale(10x)', desc: 'Открытие 10 дата-центров' },
    { year: '2023', event: 'users++', desc: '50,000 активных серверов' },
    { year: '2025', event: 'upgrade()', desc: 'Новое поколение NVMe' },
  ];

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-header">
              <span className="section-comment mono">// О нас</span>
              <h2 className="section-title">
                <span className="class-keyword">class</span>{' '}
                <span className="class-name">Orbita</span>{' '}
                <span className="bracket">{'{'}</span>
              </h2>
            </div>

            <div className="about-text mono">
              <div className="code-block">
                <span className="line-num">1</span>
                <span className="code-line">
                  <span className="method">constructor</span>() {'{'}
                </span>
              </div>
              <div className="code-block indent">
                <span className="line-num">2</span>
                <span className="code-line">
                  <span className="this">this</span>.mission = 
                </span>
              </div>
              <div className="code-block indent-2">
                <span className="line-num">3</span>
                <span className="code-line">
                  <span className="string">"Делаем хостинг простым для разработчиков"</span>;
                </span>
              </div>
              <div className="code-block indent">
                <span className="line-num">4</span>
                <span className="code-line">
                  <span className="this">this</span>.founded = <span className="number">2018</span>;
                </span>
              </div>
              <div className="code-block indent">
                <span className="line-num">5</span>
                <span className="code-line">
                  <span className="this">this</span>.team = <span className="number">42</span>;
                </span>
              </div>
              <div className="code-block">
                <span className="line-num">6</span>
                <span className="code-line">{'}'}</span>
              </div>
            </div>

            <div className="about-footer mono">
              <span className="bracket">{'}'}</span>
            </div>
          </div>

          <div className="about-timeline">
            <div className="timeline-header mono">
              <span className="comment">/* git log --oneline */</span>
            </div>
            
            <div className="timeline-list">
              {timeline.map((item, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="timeline-year mono">{item.year}</span>
                    <span className="timeline-event mono">{item.event}</span>
                    <span className="timeline-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
