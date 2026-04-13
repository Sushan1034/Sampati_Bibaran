import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'np' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="logo-icon"
          >
             <Coins size={32} color="var(--primary)" fill="rgba(200, 16, 46, 0.1)" />
          </motion.div>
          <div className="logo-text">
            <span className="portal-name">{t('nav.portalName')}</span>
            <span className="gov-nepal">Government of Nepal</span>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/analytics" className="nav-link">
            {i18n.language === 'en' ? 'Leaderboard' : 'रैंकिंग बोर्ड'}
          </Link>
        </div>

        <div className="nav-actions">
          <div className="source-info">
            <span className="source-label">{i18n.language === 'en' ? 'Data Source:' : 'स्रोत:'}</span>
            <span className="source-names">Indepth Story & RONB</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-lang-switch"
            onClick={toggleLanguage}
            aria-label="Toggle Language"
          >
            <span className="lang-icon">
              <Globe size={18} />
            </span>
            <span className="lang-text">{t('common.language')}</span>
          </motion.button>
        </div>
      </div>

      <style jsx="true">{`
        .navbar {
          background-color: var(--bg-white);
          border-bottom: 3px solid var(--primary);
          padding: 12px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: var(--shadow-sm);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .portal-name {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-dark);
          line-height: 1.2;
        }
        .gov-nepal {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--secondary);
          font-weight: 600;
        }
        .nav-links {
          display: flex;
          gap: 30px;
          margin-left: 40px;
          flex: 1;
        }
        .nav-link {
          font-weight: 700;
          color: var(--text-dark);
          font-size: 0.95rem;
          position: relative;
          padding: 4px 0;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--primary);
          opacity: 1;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .source-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          border-right: 2px solid var(--border-color);
          padding-right: 15px;
          margin-right: 5px;
        }
        .source-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          font-weight: 700;
        }
        .source-names {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--secondary);
        }
        .btn-lang-switch {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: var(--secondary);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 56, 147, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-lang-switch:hover {
          background: #002d75;
          box-shadow: 0 6px 16px rgba(0, 56, 147, 0.3);
        }
        .lang-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lang-text {
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }
        @media (max-width: 1024px) {
          .nav-links { margin-left: 20px; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .source-info { display: none; }
        }
        @media (max-width: 640px) {
          .portal-name { font-size: 1rem; }
          .gov-nepal { font-size: 0.65rem; }
          .btn-lang-switch { padding: 8px 16px; }
          .lang-text { font-size: 0.8rem; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
