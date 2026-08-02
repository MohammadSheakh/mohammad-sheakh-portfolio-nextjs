export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="f-brand">Mohammad Sheakh</div>
          <p className="f-desc">
            Backend developer building scalable systems in Dhaka, Bangladesh.
            Available for full-time roles and freelance projects.
          </p>
          <div className="f-socials">
            <a
              className="f-social"
              href="https://github.com/mohammadSheakh"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                  fill="#555"
                />
              </svg>
            </a>
            <a
              className="f-social"
              href="https://linkedin.com/in/mohammadsheakh"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
                  fill="none"
                  stroke="#555"
                  strokeWidth="1.5"
                />
                <circle cx="4" cy="4" r="2" fill="#555" />
              </svg>
            </a>
            <a className="f-social" href="mailto:mohammad.sheakh@gmail.com">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#555" strokeWidth="1.5" />
                <path d="M2 7l10 7 10-7" stroke="#555" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="f-col-title">Navigation</div>
          <ul className="f-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="f-col-title">Contact</div>
          <ul className="f-links">
            <li>
              <a href="mailto:mohammad.sheakh@gmail.com">
                mohammad.sheakh@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+8801518419801">+880 1518419801</a>
            </li>
            <li>
              <a href="#">West Rampura, Dhaka</a>
            </li>
            <li>
              <a href="#">Open to opportunities</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="f-bottom">
        <span>© 2026 Mohammad Sheakh</span>
        <span style={{ color: "#333" }}>Backend Developer · Dhaka, Bangladesh</span>
      </div>
      <div className="f-name">mohammadsheakh</div>
    </footer>
  );
}
