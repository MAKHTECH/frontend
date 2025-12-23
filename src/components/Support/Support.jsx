import './Support.css';

function Support() {
  const faq = [
    {
      q: 'Сколько времени занимает развёртывание?',
      a: '30-60 секунд. Автоматическая активация после оплаты.'
    },
    {
      q: 'Какие ОС доступны?',
      a: 'Ubuntu, Debian, CentOS, Fedora, Arch Linux, Windows Server.'
    },
    {
      q: 'Можно ли изменить тариф?',
      a: 'Да, апгрейд/даунгрейд доступен в любое время без даунтайма.'
    },
    {
      q: 'Есть ли API?',
      a: 'Полноценный REST API для автоматизации. Документация: docs.orbita.cloud'
    }
  ];

  return (
    <section className="support" id="support">
      <div className="support-container">
        <div className="support-grid">
          <div className="support-contact">
            <div className="section-header">
              <span className="section-comment mono">// Поддержка</span>
              <h2 className="section-title">
                <span className="await-keyword">await</span>{' '}
                <span className="fn-name">support</span>
                <span className="parens">()</span>
              </h2>
            </div>

            <div className="contact-methods">
              <a href="#" className="contact-item">
                <span className="contact-icon">{'>'}</span>
                <div className="contact-info">
                  <span className="contact-name mono">Telegram</span>
                  <span className="contact-value">@orbita_support</span>
                </div>
                <span className="contact-status online">● online</span>
              </a>

              <a href="#" className="contact-item">
                <span className="contact-icon">{'>'}</span>
                <div className="contact-info">
                  <span className="contact-name mono">Email</span>
                  <span className="contact-value">support@orbita.cloud</span>
                </div>
                <span className="contact-response mono">&lt;2h</span>
              </a>

              <a href="#" className="contact-item">
                <span className="contact-icon">{'>'}</span>
                <div className="contact-info">
                  <span className="contact-name mono">Discord</span>
                  <span className="contact-value">discord.gg/orbita</span>
                </div>
                <span className="contact-status online">● 1.2k online</span>
              </a>
            </div>
          </div>

          <div className="support-faq">
            <div className="faq-header mono">
              <span className="comment-multi">/**</span>
              <span className="comment-multi"> * FAQ</span>
              <span className="comment-multi"> */</span>
            </div>

            <div className="faq-list">
              {faq.map((item, index) => (
                <details className="faq-item" key={index}>
                  <summary className="faq-question mono">
                    <span className="faq-prefix">[{index}]</span>
                    <span>{item.q}</span>
                  </summary>
                  <p className="faq-answer">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="support-cta">
          <div className="cta-terminal mono">
            <span className="cta-prompt">$</span>
            <span className="cta-command">curl -X POST https://orbita.cloud/api/v1/servers</span>
          </div>
          <a href="#pricing" className="cta-button mono">
            Создать сервер →
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left mono">
            <span className="footer-logo">./orbita</span>
            <span className="footer-copy">© 2025 MIT License</span>
          </div>
          <div className="footer-links mono">
            <a href="#">docs</a>
            <a href="#">status</a>
            <a href="#">github</a>
            <a href="#">api</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Support;
