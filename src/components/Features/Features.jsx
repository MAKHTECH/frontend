import './Features.css';

function Features() {
  const features = [
    {
      key: 'speed',
      icon: '⚡',
      title: 'NVMe SSD',
      desc: '7000 МБ/с чтение',
      code: 'disk.speed = "nvme"'
    },
    {
      key: 'security',
      icon: '🛡️',
      title: 'DDoS Shield',
      desc: 'Защита до 1 Tbps',
      code: 'firewall.enable()'
    },
    {
      key: 'uptime',
      icon: '◉',
      title: '99.9% SLA',
      desc: 'Гарантия доступности',
      code: 'uptime >= 99.9'
    },
    {
      key: 'root',
      icon: '#',
      title: 'Root Access',
      desc: 'Полный контроль',
      code: 'ssh root@server'
    },
    {
      key: 'global',
      icon: '◎',
      title: '10+ Локаций',
      desc: 'EU, US, Asia',
      code: 'region: "eu-west"'
    },
    {
      key: 'backup',
      icon: '↺',
      title: 'Auto Backup',
      desc: 'Ежедневные снапшоты',
      code: 'backup.schedule()'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="section-header">
          <span className="section-comment mono">// Возможности</span>
          <h2 className="section-title">
            <span className="fn-keyword">function</span>{' '}
            <span className="fn-name">getFeatures</span>
            <span className="fn-parens">()</span>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={feature.key}>
              <div className="feature-line-number mono">{String(index + 1).padStart(2, '0')}</div>
              <div className="feature-content">
                <div className="feature-top">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
                <p className="feature-desc">{feature.desc}</p>
                <code className="feature-code mono">{feature.code}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="features-footer mono">
          <span className="return-keyword">return</span> features<span className="punctuation">;</span>
        </div>
      </div>
    </section>
  );
}

export default Features;
