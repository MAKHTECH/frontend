import './Servers.css';

function Servers() {
  return (
    <div className="page-servers">
      <div className="page-header">
        <span className="page-comment mono">// Все доступные серверы</span>
        <h1 className="page-title">
          <span className="const-keyword">const</span>{' '}
          <span className="var-name">servers</span>{' '}
          <span className="operator">=</span>{' '}
          <span className="method">getAll</span>
          <span className="brackets">()</span>;
        </h1>
      </div>

      <div className="servers-grid">
        <div className="server-card available">
          <div className="server-header">
            <span className="server-name mono">VPS Basic</span>
            <span className="server-status mono">● available</span>
          </div>
          <div className="server-specs mono">
            <div className="spec-row">
              <span className="spec-label">cpu:</span>
              <span className="spec-value">"2 vCPU"</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ram:</span>
              <span className="spec-value">"4 GB"</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">disk:</span>
              <span className="spec-value">"50 GB SSD"</span>
            </div>
          </div>
          <div className="server-price mono">
            <span className="price-value">₽499</span>
            <span className="price-period">/month</span>
          </div>
          <button className="btn-order mono">server.order()</button>
        </div>

        <div className="server-card available">
          <div className="server-header">
            <span className="server-name mono">VPS Standard</span>
            <span className="server-status mono">● available</span>
          </div>
          <div className="server-specs mono">
            <div className="spec-row">
              <span className="spec-label">cpu:</span>
              <span className="spec-value">"4 vCPU"</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ram:</span>
              <span className="spec-value">"8 GB"</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">disk:</span>
              <span className="spec-value">"100 GB SSD"</span>
            </div>
          </div>
          <div className="server-price mono">
            <span className="price-value">₽999</span>
            <span className="price-period">/month</span>
          </div>
          <button className="btn-order mono">server.order()</button>
        </div>

        <div className="server-card available">
          <div className="server-header">
            <span className="server-name mono">VPS Pro</span>
            <span className="server-status mono">● available</span>
          </div>
          <div className="server-specs mono">
            <div className="spec-row">
              <span className="spec-label">cpu:</span>
              <span className="spec-value">"8 vCPU"</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">ram:</span>
              <span className="spec-value">"16 GB"</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">disk:</span>
              <span className="spec-value">"200 GB NVMe"</span>
            </div>
          </div>
          <div className="server-price mono">
            <span className="price-value">₽1999</span>
            <span className="price-period">/month</span>
          </div>
          <button className="btn-order mono">server.order()</button>
        </div>
      </div>
    </div>
  );
}

export default Servers;
