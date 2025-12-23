import './Pricing.css';

function Pricing() {
  const plans = [
    {
      name: 'starter',
      cpu: '1 vCPU',
      ram: '1 GB',
      ssd: '20 GB',
      price: 299,
      highlight: false
    },
    {
      name: 'pro',
      cpu: '4 vCPU',
      ram: '8 GB',
      ssd: '100 GB',
      price: 799,
      highlight: true
    },
    {
      name: 'enterprise',
      cpu: '16 vCPU',
      ram: '32 GB',
      ssd: '500 GB',
      price: 2499,
      highlight: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-container">
        <div className="section-header">
          <span className="section-comment mono">// Тарифы</span>
          <h2 className="section-title">
            <span className="const-keyword">const</span>{' '}
            <span className="var-name">pricing</span>{' '}
            <span className="operator">=</span>{' '}
            <span className="bracket">[</span>
          </h2>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div 
              className={`pricing-card ${plan.highlight ? 'pricing-card-active' : ''}`} 
              key={plan.name}
            >
              {plan.highlight && <div className="recommended-tag mono">// recommended</div>}
              
              <div className="pricing-object mono">
                <div className="obj-line">
                  <span className="obj-key">name:</span>
                  <span className="obj-string">"{plan.name}"</span>,
                </div>
                <div className="obj-line">
                  <span className="obj-key">cpu:</span>
                  <span className="obj-string">"{plan.cpu}"</span>,
                </div>
                <div className="obj-line">
                  <span className="obj-key">ram:</span>
                  <span className="obj-string">"{plan.ram}"</span>,
                </div>
                <div className="obj-line">
                  <span className="obj-key">ssd:</span>
                  <span className="obj-string">"{plan.ssd}"</span>,
                </div>
                <div className="obj-line obj-line-price">
                  <span className="obj-key">price:</span>
                  <span className="obj-number">{plan.price}</span>
                  <span className="obj-comment">// ₽/мес</span>
                </div>
              </div>

              <button className={`pricing-btn mono ${plan.highlight ? 'pricing-btn-primary' : ''}`}>
                server.create()
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer mono">
          <span className="bracket">]</span>;
        </div>

        <p className="pricing-note mono">
          <span className="comment-slash">//</span> Безлимитный трафик • IPv4 + IPv6 • DDoS защита
        </p>
      </div>
    </section>
  );
}

export default Pricing;
