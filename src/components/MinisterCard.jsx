import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, User } from 'lucide-react';

const MinisterCard = ({ minister }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="minister-card"
    >
      <div className="card-image">
        <img src={minister.image} alt={minister.name[lang]} />
      </div>
      <div className="card-content">
        <h3 className="minister-name">{minister.name[lang]}</h3>
        <p className="minister-position">{minister.position[lang]}</p>
        <span className="minister-ministry">{minister.ministry[lang]}</span>

        <Link to={`/minister/${minister.id}`} className="btn btn-primary btn-full">
          {t('minister.viewProfile')}
          <ExternalLink size={16} />
        </Link>
      </div>

      <style jsx="true">{`
        .minister-card {
          background: var(--bg-white);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .card-image {
          height: 320px;
          background-color: var(--bg-light);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 3px solid var(--primary);
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top; /* Focus on the head/face */
        }
        .card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .minister-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text-dark);
        }
        .minister-position {
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 8px;
        }
        .minister-ministry {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          line-height: 1.4;
          display: block;
        }
        .btn-full {
          width: 100%;
          margin-top: auto;
        }
      `}</style>
    </motion.div>
  );
};

export default MinisterCard;
