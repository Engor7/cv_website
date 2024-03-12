import axios from 'axios';

const BASE_URL_APi = 'https://api.binance.com';

export const fetchPriceHistory = async (symbol, interval) => {
  try {
    const response = await axios.get(`${BASE_URL_APi}/api/v3/klines`, {
      params: { symbol: `${symbol}USDT`, interval: interval, limit: 25 },
    });

    return response.data.map(kline => ({
      high: kline[2],
      low: kline[3],
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCurrentPrice = async symbol => {
  try {
    const response = await axios.get(`${BASE_URL_APi}/api/v3/ticker/24hr`, {
      params: { symbol: `${symbol}USDT` },
    });

    return {
      prise: response.data.lastPrice,
      priceChangePercent: response.data.priceChangePercent,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};
