import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Home, Landmark, Coins, Briefcase, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import AssetSection from '../components/AssetSection';
import ministerData from '../data/ministers.json';
import { parseAmount, formatAmountNepali } from '../utils/dataUtils';

const MinisterDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const minister = ministerData.find(m => m.id === id);

  if (!minister) {
    return (
      <div className="container section-padding">
        <h2>Minister not found</h2>
        <Link to="/" className="btn btn-outline">{t('common.back')}</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="container section-padding">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          {t('common.back')}
        </Link>

        <div className="detail-layout">
          {/* Sidebar: Profile Info */}
          <aside className="profile-sidebar">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="profile-card"
            >
              <img src={minister.image} alt={minister.name[lang]} className="profile-img" />
              <div className="profile-info">
                <h1 className="name">{minister.name[lang]}</h1>
                <p className="position">{minister.position[lang]}</p>
                <div className="ministry-tag">{minister.ministry[lang]}</div>
              </div>
             </motion.div>
          </aside>

          {/* Main Content: Asset Breakdown */}
          <section className="assets-content">
            <h2 className="section-title">{t('assets.title')}</h2>

            <div className="assets-grid">
              <AssetSection
                title={t('assets.land')}
                type="real_estate"
                data={{ land: minister.assets.land, property: minister.assets.property }}
                icon={Home}
              />
              <AssetSection
                title={t('assets.bank')}
                type="bank"
                data={minister.assets.bank_balance}
                icon={Landmark}
              />
              <AssetSection
                title={t('assets.gold_silver')}
                type="gold"
                data={minister.assets.gold_silver}
                icon={Coins}
              />

              {minister.assets.cash && (
                <div className="summary-card gold-border">
                  <div className="card-header">
                    <span className="label">{i18n.language === 'en' ? 'Cash Balance' : 'नगद मौज्दात'}</span>
                  </div>
                  <div className="card-value">{formatAmountNepali(parseAmount(minister.assets.cash))}</div>
                </div>
              )}

              {minister.assets.debt && (
                <div className="summary-card red-border">
                  <div className="card-header">
                    <span className="label">{i18n.language === 'en' ? 'Liabilities / Debt' : 'ऋण / दायित्व'}</span>
                  </div>
                  <div className="card-value">{formatAmountNepali(parseAmount(minister.assets.debt))}</div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <style jsx="true">{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.95rem;
          transition: transform 0.2s;
        }
        .back-link:hover {
          transform: translateX(-5px);
          opacity: 1;
          color: var(--secondary);
        }
        .detail-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 30px;
          align-items: flex-start;
        }
        .profile-sidebar {
          /* Grid item wrapper */
        }
        .profile-card {
          position: relative;
          background: var(--bg-white);
          border-radius: var(--radius);
          padding: 40px 30px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
          border-top: 6px solid var(--primary);
          overflow: hidden;
        }
        .profile-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(0, 56, 147, 0.05) 50%);
        }
        .profile-img {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          margin: 0 auto 30px;
          display: block;
          border: 6px solid var(--bg-light);
          object-fit: cover;
          object-position: center top;
          box-shadow: var(--shadow-sm);
        }
        .profile-info {
          text-align: center;
        }
        .name {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: var(--text-dark);
          line-height: 1.2;
        }
        .position {
          color: var(--primary);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .ministry-tag {
          font-size: 0.9rem;
          background: var(--bg-light);
          padding: 10px 16px;
          border-radius: var(--radius);
          color: var(--text-muted);
          line-height: 1.4;
          border: 1px solid var(--border-color);
        }

        .assets-content .section-title {
          margin-bottom: 30px;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-dark);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .assets-content .section-title::after {
          content: '';
          flex: 1;
          height: 2px;
          background: var(--border-color);
          opacity: 0.5;
        }

        .assets-grid {
          column-count: 2;
          column-gap: 16px;
          display: block;
        }

        .summary-card {
           background: var(--bg-white);
           border-radius: var(--radius);
           padding: 16px;
           box-shadow: var(--shadow-sm);
           border: 1px solid var(--border-color);
           display: flex;
           flex-direction: column;
           gap: 8px;
           transition: transform 0.2s;
           break-inside: avoid;
           margin-bottom: 16px;
        }
        .summary-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .gold-border { border-left: 6px solid #ffd700; }
        .red-border { border-left: 6px solid var(--primary); }
        .summary-card .label { 
          font-size: 0.85rem; 
          color: var(--text-muted); 
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .summary-card .card-value { 
          font-size: 1.4rem; 
          font-weight: 800; 
          color: var(--text-dark); 
        }

        @media (max-width: 1024px) {
          .detail-layout {
            grid-template-columns: 280px 1fr;
            gap: 24px;
          }
          .assets-grid {
            column-count: 2;
          }
        }

        @media (max-width: 900px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }
          .profile-sidebar {
            position: static;
          }
          .profile-card {
            padding: 30px;
          }
          .profile-img {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default MinisterDetail;
