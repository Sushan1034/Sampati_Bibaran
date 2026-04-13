/**
 * Utility functions for parsing and ranking minister assets
 */

/**
 * Parses bank balance strings into numeric values
 * Examples: "1,46,00,000" -> 14600000, "10.5 Lakhs" -> 1050000
 */
export const parseAmount = (amountStr) => {
  if (!amountStr || typeof amountStr !== 'string') return 0;
  
  // Handle "Lakhs"
  if (amountStr.toLowerCase().includes('lakh')) {
    const num = parseFloat(amountStr.replace(/,/g, ''));
    return num * 100000;
  }
  
  // Handle standard comma-separated numbers
  const cleaned = amountStr.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Parses gold/silver strings into standardized Tola units
 * Examples: "190 Tola" -> 190, "6 KG" -> 514.5
 */
export const parseWeight = (weightStr) => {
  if (!weightStr || typeof weightStr !== 'string') return 0;
  
  const Str = weightStr.toLowerCase();
  const numMatch = Str.match(/[0-9.]+/);
  if (!numMatch) return 0;
  const num = parseFloat(numMatch[0]);

  if (Str.includes('kg')) {
    return num * 85.76; // 1 KG ≈ 85.76 Tola
  }
  
  if (Str.includes('tola')) {
    return num;
  }

  return num; // Fallback to raw number
};

/**
 * Gets total bank balance for a minister
 */
export const getMinisterBankTotal = (minister) => {
  if (!minister.assets?.bank_balance) return 0;
  return minister.assets.bank_balance.reduce((sum, item) => sum + parseAmount(item.amount), 0);
};

/**
 * Gets gold/silver weight for a specific type
 */
export const getMinisterMetalWeight = (minister, type = 'gold') => {
  const metalData = minister.assets?.gold_silver;
  if (!metalData) return 0;
  
  // If type specifies a specific key (gold/silver/jewelry/hira)
  if (metalData[type]) {
    return parseWeight(metalData[type]);
  }

  // Generic fallback: check if 'jewelry' should count as gold
  if (type === 'gold' && metalData.jewelry) {
    return parseWeight(metalData.jewelry);
  }

  return 0;
};

/**
 * Ranks ministers by a specific asset metric
 */
export const rankMinisters = (ministers, metricType) => {
  return [...ministers].sort((a, b) => {
    let valA, valB;
    
    if (metricType === 'bank') {
      valA = getMinisterBankTotal(a);
      valB = getMinisterBankTotal(b);
    } else if (metricType === 'gold') {
      valA = getMinisterMetalWeight(a, 'gold');
      valB = getMinisterMetalWeight(b, 'gold');
    } else if (metricType === 'silver') {
      valA = getMinisterMetalWeight(a, 'silver');
      valB = getMinisterMetalWeight(b, 'silver');
    } else {
      valA = 0;
      valB = 0;
    }
    
    return valB - valA; // Descending
  });
};

/**
 * Formats a raw number amount into Crores/Lakhs with currency symbol 'रु.'
 */
export const formatAmountNepali = (total) => {
  if (!total || isNaN(total) || total <= 0) return 'रु. 0';
  let cr = Math.floor(total / 10000000);
  let rem = total % 10000000;
  let lakh = +(rem / 100000).toFixed(2);
  
  if (cr > 0 && lakh > 0) {
    return `रु. ${cr} करोड ${lakh} लाख`;
  } else if (cr > 0) {
    return `रु. ${cr} करोड`;
  } else if (lakh > 0) {
    return `रु. ${lakh} लाख`;
  } else {
    return `रु. ${total}`;
  }
};
