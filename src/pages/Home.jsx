import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown } from 'lucide-react';
import MinisterCard from '../components/MinisterCard';
import ministerData from '../data/ministers.json';
import { motion, AnimatePresence } from 'framer-motion';
import { rankMinisters } from '../utils/dataUtils';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [filteredMinisters, setFilteredMinisters] = useState(ministerData);
  const lang = i18n.language;

  useEffect(() => {
    let results = ministerData.filter(minister => 
      minister.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      minister.ministry[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      minister.position[lang].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy !== 'default') {
      results = rankMinisters(results, sortBy);
    }

    setFilteredMinisters(results);
  }, [searchTerm, sortBy, lang]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="bg-nepal-pattern"></div>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <h1 className="hero-title">{t('home.title')}</h1>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
            
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder={t('home.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Grid Section */}
      <section className="ministers-grid-section section-padding">
        <div className="container">
          <div className="flex-header">
            <span className="results-count">
              {filteredMinisters.length} {lang === 'en' ? 'Ministers Found' : 'मन्त्रीहरू भेटिए'}
            </span>
            
            <div className="sort-wrapper">
              <label className="sort-label">{lang === 'en' ? 'Sort by:' : 'क्रमबद्ध गर्नुहोस्:'}</label>
              <div className="select-container">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">{lang === 'en' ? 'Default' : 'साधारण'}</option>
                  <option value="bank">{lang === 'en' ? 'Highest Bank Balance' : 'उच्च बैंक ब्यालेन्स'}</option>
                  <option value="gold">{lang === 'en' ? 'Largest Gold Possession' : 'धेरै सुन'}</option>
                  <option value="silver">{lang === 'en' ? 'Largest Silver Possession' : 'धेरै चाँदी'}</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>
          </div>

          <motion.div 
            layout
            className="ministers-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredMinisters.map(minister => (
                <MinisterCard key={minister.id} minister={minister} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <style jsx="true">{`
        .hero {
          background: linear-gradient(135deg, var(--bg-white) 0%, #fff 100%);
          padding: 80px 0;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 40px;
        }
        .search-container {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-input {
          width: 100%;
          padding: 18px 20px 18px 56px;
          border-radius: 50px;
          border: 1px solid var(--border-color);
          font-size: 1.1rem;
          box-shadow: var(--shadow-md);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(200, 16, 46, 0.1);
        }
        .flex-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--border-color);
        }
        .results-count {
          font-weight: 700;
          color: var(--text-dark);
          font-size: 1.1rem;
        }
        .sort-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sort-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .select-container {
          position: relative;
          min-width: 220px;
        }
        .sort-select {
          width: 100%;
          appearance: none;
          padding: 10px 40px 10px 16px;
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: var(--shadow-sm);
        }
        .sort-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
        }
        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
        }
        .ministers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .hero { padding: 50px 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;
