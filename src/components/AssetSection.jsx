import { useTranslation } from 'react-i18next';
import { Home, Landmark, Coins, Briefcase, Car, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { parseAmount } from '../utils/dataUtils';

const AssetSection = ({ title, type, data, icon: Icon }) => {
  const { t, i18n } = useTranslation();

  let isEmpty = false;
  if (!data) isEmpty = true;
  else if (Array.isArray(data) && data.length === 0) isEmpty = true;
  else if (type === 'real_estate') {
    const hasLand = data.land && data.land.length > 0;
    const hasProperty = data.property && data.property.length > 0;
    if (!hasLand && !hasProperty) isEmpty = true;
  }
  else if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) isEmpty = true;

  if (isEmpty) {
    return (
      <div className="asset-empty">
        <div className="empty-header">
          <Icon size={20} className="empty-icon" />
          <h4 className="empty-title">{title}</h4>
        </div>
        <p className="empty-msg">{t('assets.noData')}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="asset-section"
    >
      <div className="section-header">
        <div className="icon-wrapper">
          <Icon size={24} color="var(--primary)" />
        </div>
        <h4 className="section-title">{title}</h4>
      </div>

        {type === 'gold' && (
          <>
            <div className="section-items">
              {Object.entries(data)
                .filter(([key]) => !['market_valuation', 'market_valuation_note', 'gold_valuation', 'silver_valuation'].includes(key))
                .map(([key, value], index) => {
                  const valuation = (key === 'gold' || key === 'jewelry') ? data.gold_valuation : 
                                   (key === 'silver') ? data.silver_valuation : null;
                  return (
                    <div key={index} className="complex-asset-item">
                      <div className="complex-label">
                        {key === 'jewelry' ? (i18n.language === 'en' ? 'Jewelry' : 'गहना') : 
                         key === 'gold' ? t('assets.gold') : 
                         key === 'silver' ? (i18n.language === 'en' ? 'Silver' : 'चाँदी') : 
                         key === 'hira' || key === 'diamond' ? (i18n.language === 'en' ? 'Diamond' : 'हीरा') : key}
                      </div>
                      <div className="complex-details">
                        <span className="complex-value">{value}</span>
                        {valuation && <span className="complex-valuation">({valuation})</span>}
                      </div>
                    </div>
                  );
                })}
            </div>

            {data.market_valuation && (
              <div className="valuation-highlight">
                <div className="valuation-info">
                  <span className="val-label">{i18n.language === 'en' ? 'Total Market Value (Est.)' : 'कुल अनुमानित बजार मूल्य'}</span>
                  <span className="val-value">{data.market_valuation}</span>
                </div>
              </div>
            )}

            {data.market_valuation_note && (
              <div className="disclaimer-note">
                <AlertCircle size={14} className="disclaimer-icon" />
                <p>{data.market_valuation_note}</p>
              </div>
            )}
          </>
        )}

        {(type === 'investments' || type === 'vehicles' || type === 'real_estate' || type === 'bank') && (
          <div className="section-items">
            {type === 'real_estate' && (
              <>
                {data.property && data.property.length > 0 && (
                  <div className="real-estate-group">
                    <h5 className="group-title">{i18n.language === 'en' ? 'House / Property' : 'घर / सम्पत्ति'}</h5>
                    {data.property.map((item, index) => (
                      <div key={`prop-${index}`} className="complex-asset-item">
                        <div className="complex-label">{item.location}</div>
                        <div className="complex-details">
                          {item.area && <span className="complex-value">{item.area}</span>}
                          {item.source && <span className="complex-source">{item.source}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.land && data.land.length > 0 && (
                  <div className="real-estate-group">
                    <h5 className="group-title">{i18n.language === 'en' ? 'Land' : 'जग्गा'}</h5>
                    {data.land.map((item, index) => (
                      <div key={`land-${index}`} className="complex-asset-item">
                        <div className="complex-label">{item.location}</div>
                        <div className="complex-details">
                          {item.area && <span className="complex-value">{item.area}</span>}
                          {item.source && <span className="complex-source">{item.source}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {type === 'bank' && (
              <>
                {(() => {
                  const total = data.reduce((sum, item) => sum + parseAmount(item.amount), 0);
                  if (total > 0) {
                    let cr = Math.floor(total / 10000000);
                    let rem = total % 10000000;
                    let lakh = +(rem / 100000).toFixed(2);
                    
                    let formatted = '';
                    if (cr > 0 && lakh > 0) {
                      formatted = `रु. ${cr} करोड ${lakh} लाख`;
                    } else if (cr > 0) {
                      formatted = `रु. ${cr} करोड`;
                    } else if (lakh > 0) {
                      formatted = `रु. ${lakh} लाख`;
                    } else {
                      formatted = `रु. ${total}`;
                    }

                    return (
                      <div className="valuation-info" style={{ marginTop: '5px' }}>
                        <span className="val-label">{t('assets.bank')}</span>
                        <span className="val-value">{formatted}</span>
                      </div>
                    );
                  }
                  return null;
                })()}
              </>
            )}

            {type === 'investments' && data.map((item, index) => (
              <div key={index} className="asset-item">
                <span className="item-label">{item.type}</span>
                <span className="item-value">{item.amount} NPR</span>
              </div>
            ))}

            {type === 'vehicles' && data.map((item, index) => (
              <div key={index} className="asset-item">
                <span className="item-label">{item.model}</span>
                <span className="item-value">{item.year}</span>
              </div>
            ))}
          </div>
        )}

      <style jsx="true">{`
        .asset-section {
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          break-inside: avoid;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--border-color);
        }
        .icon-wrapper {
          width: 40px;
          height: 40px;
          background: rgba(200, 16, 46, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -4px;
        }
        .section-title {
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
          line-height: 1;
        }
        .section-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .asset-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 0.95rem;
        }
        .item-label {
          color: var(--text-muted);
          font-weight: 500;
        }
        .item-value-group {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        .item-value {
          color: var(--text-dark);
          font-weight: 600;
          text-align: right;
        }
        .item-valuation {
          font-size: 0.8rem;
          color: var(--secondary);
          font-weight: 700;
        }
        .valuation-highlight {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 2px solid var(--bg-light);
        }
        .valuation-info {
          background: linear-gradient(135deg, #fff9e6 0%, #fff 100%);
          border: 1px solid #ffd700;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .val-label {
          font-size: 0.75rem;
          color: #8b6e00;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .val-value {
          font-size: 1.1rem;
          color: #2c2500;
          font-weight: 800;
        }
        .disclaimer-note {
          margin-top: 12px;
          display: flex;
          gap: 8px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #666;
          line-height: 1.5;
        }
        .disclaimer-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .asset-empty {
          background: #fdfdfd;
          border: 1px solid #eee;
          padding: 15px;
          border-radius: var(--radius);
          margin-bottom: 20px;
        }
        .empty-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #999;
          margin-bottom: 4px;
        }
        .empty-title { font-size: 0.85rem; }
        .empty-msg { font-size: 0.8rem; color: #ccc; font-style: italic; }
        .real-estate-group {
          margin-bottom: 20px;
        }
        .real-estate-group:last-child {
          margin-bottom: 0;
        }
        .group-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--bg-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .complex-asset-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .complex-asset-item:last-child {
          border-bottom: none;
        }
        .complex-label {
          font-weight: 700;
          color: var(--primary);
          font-size: 0.95rem;
        }
        .complex-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .complex-value {
          font-weight: 600;
          color: var(--text-dark);
          font-size: 0.95rem;
        }
        .complex-source {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          padding-left: 8px;
          border-left: 2px solid var(--border-color);
        }
        .complex-valuation {
          font-size: 0.85rem;
          color: var(--secondary);
          font-weight: 700;
        }
      `}</style>
    </motion.div>
  );
};

export default AssetSection;
