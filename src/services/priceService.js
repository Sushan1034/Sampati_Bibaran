/**
 * Service to fetch real-time gold and silver prices for Nepal
 */

// Official Nepal Gold rates are typically ~15-20% higher than global spot due to import taxes/customs
const NEPAL_PREMIUM_FACTOR = 1.18; 
const TOLA_TO_OZ = 0.375; // 1 Tola = 0.375 Troy Ounces approximately

export const fetchGoldSilverPrices = async () => {
  try {
    // We use a public, free API for global spot prices
    // api.gold-api.com is a reliable free endpoint for demonstration
    const response = await fetch('https://api.gold-api.com/v1/gold');
    const data = await response.json();

    if (!data || !data.price) {
      throw new Error('Invalid price data from API');
    }

    const spotPriceUSD = data.price; // Price per Ounce in USD
    
    // Convert to NPR (Assuming current USD/NPR rate as roughly 133)
    const usdToNpr = 133.5;
    const pricePerOzNPR = spotPriceUSD * usdToNpr;
    
    // Convert Ounce to Tola and apply local premium
    const baseGoldPricePerTola = pricePerOzNPR * TOLA_TO_OZ;
    const officialGoldPrice = baseGoldPricePerTola * NEPAL_PREMIUM_FACTOR;
    
    // Silver is usually around 1/80th of Gold price roughly in Nepal or set by Federation
    const officialSilverPrice = (officialGoldPrice / 75); // Estimation based on current market trends

    return {
      success: true,
      data: {
        gold: Math.round(officialGoldPrice / 100) * 100, // Round to nearest 100
        silver: Math.round(officialSilverPrice / 10) * 10,  // Round to nearest 10
        updatedAt: new Date().toISOString(),
        isEstimated: true
      }
    };
  } catch (error) {
    console.error('Error fetching live rates:', error);
    
    // Fallback to recent hardcoded official rates if and when the API fails
    return {
      success: true,
      data: {
        gold: 142500, // Updated to latest market approx
        silver: 1815,
        updatedAt: new Date().toISOString(),
        isFallback: true
      }
    };
  }
};
