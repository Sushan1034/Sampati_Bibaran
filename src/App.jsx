import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MinisterDetail from './pages/MinisterDetail';
import Analytics from './pages/Analytics';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <motion.div
      key={i18n.language}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const { i18n } = useTranslation();

  // Update document title and language class on change
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.body.className = `lang-${i18n.language}`;
  }, [i18n.language]);

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/minister/:id" element={<MinisterDetail />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
