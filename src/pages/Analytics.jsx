import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';
import { motion } from 'framer-motion';
import ministerData from '../data/ministers.json';
import { rankMinisters, getMinisterBankTotal, getMinisterMetalWeight } from '../utils/dataUtils';

const Analytics = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Prepare Data for Charts
  const topBank = rankMinisters(ministerData, 'bank').slice(0, 10).map(m => {
    const total = getMinisterBankTotal(m);
    let displayAmount = '';
    if (total >= 10000000) {
      displayAmount = Number((total / 10000000).toFixed(2)) + ' Cr';
    } else {
      displayAmount = Number((total / 100000).toFixed(2)) + ' Lakh';
    }
    return {
      name: m.name[lang],
      amount: total,
      displayAmount
    };
  });

  const topGold = rankMinisters(ministerData, 'gold').slice(0, 10).map(m => ({
    name: m.name[lang],
    weight: getMinisterMetalWeight(m, 'gold'),
    displayWeight: Math.round(getMinisterMetalWeight(m, 'gold')) + ' Tola'
  }));

  const topSilver = rankMinisters(ministerData, 'silver').slice(0, 10).map(m => ({
    name: m.name[lang],
    weight: getMinisterMetalWeight(m, 'silver'),
    displayWeight: Math.round(getMinisterMetalWeight(m, 'silver')) + ' Tola'
  }));

  const CustomTooltip = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          <p className="value">{payload[0].value.toLocaleString()} {unit}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="analytics-page container section-padding"
    >
      <header className="page-header">
        <h1 className="page-title">{lang === 'en' ? 'Asset Insights & Rankings' : 'सम्पत्ति विवरण विश्लेषण र रैंकिंग'}</h1>
        <p className="page-subtitle">
          {lang === 'en' 
            ? 'Visualizing the top asset declarations across different categories.' 
            : 'विभिन्न कोटीहरूमा शीर्ष सम्पत्ति घोषणाको दृश्यावलोकन।'}
        </p>
      </header>

      <div className="charts-grid">
        {/* Bank Balance Chart */}
        <section className="chart-section card">
          <h2 className="chart-title">{lang === 'en' ? 'Top 10: Bank Balance (NPR)' : 'शीर्ष १०: बैंक मौज्दात (NPR)'}</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topBank} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip unit="NPR" />} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} fill="#003893">
                  <LabelList dataKey="displayAmount" position="right" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gold Chart */}
        <section className="chart-section card">
          <h2 className="chart-title">{lang === 'en' ? 'Top 10: Gold Possession (Tola)' : 'शीर्ष १०: सुनको मात्रा (तोला)'}</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topGold} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip unit="Tola" />} />
                <Bar dataKey="weight" radius={[0, 4, 4, 0]} fill="#FFD700">
                  <LabelList dataKey="displayWeight" position="right" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Silver Chart */}
        <section className="chart-section card">
          <h2 className="chart-title">{lang === 'en' ? 'Top 10: Silver Possession (Tola)' : 'शीर्ष १०: चाँदीको मात्रा (तोला)'}</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topSilver} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip unit="Tola" />} />
                <Bar dataKey="weight" radius={[0, 4, 4, 0]} fill="#C0C0C0">
                  <LabelList dataKey="displayWeight" position="right" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <style jsx="true">{`
        .analytics-page {
          background-color: var(--bg-light);
        }
        .page-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 12px;
        }
        .page-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
        }
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .chart-section {
          padding: 30px;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
        }
        .chart-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: var(--text-dark);
          border-left: 5px solid var(--primary);
          padding-left: 15px;
        }
        .custom-tooltip {
          background: white;
          padding: 10px 15px;
          border-radius: 8px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }
        .custom-tooltip .label {
          font-weight: 700;
          margin-bottom: 4px;
        }
        .custom-tooltip .value {
          color: var(--primary);
          font-weight: 800;
        }
        @media (max-width: 768px) {
          .page-title { font-size: 1.75rem; }
          .chart-section { padding: 15px; }
        }
      `}</style>
    </motion.div>
  );
};

export default Analytics;
