import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

export const BotMarketInfo = ({ symbol = 'BTCUSDT' }) => {
  const [data, setData] = useState({
    price: null,
    spread: null,
    liquidity: null,
    depthPlus2: null,
    depthMinus2: null,
    volume: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);

        const priceRes = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const priceData = await priceRes.json();
        const price = parseFloat(priceData.price);

        const bookTickerRes = await fetch(
          `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
        );
        const bookTickerData = await bookTickerRes.json();
        const spread = (
          parseFloat(bookTickerData.askPrice) - parseFloat(bookTickerData.bidPrice)
        ).toFixed(2);

        const depthRes = await fetch(
          `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=1000`
        );
        const depthData = await depthRes.json();

        const upperLimit = price * 1.02;
        const lowerLimit = price * 0.98;

        let liquidity = 0;
        let depthPlus2 = 0;
        let depthMinus2 = 0;

        depthData.bids.forEach(([bidPrice, bidQty]) => {
          bidPrice = parseFloat(bidPrice);
          bidQty = parseFloat(bidQty);
          if (bidPrice >= lowerLimit) {
            liquidity += bidPrice * bidQty;
            depthMinus2 += bidQty;
          }
        });

        depthData.asks.forEach(([askPrice, askQty]) => {
          askPrice = parseFloat(askPrice);
          askQty = parseFloat(askQty);
          if (askPrice <= upperLimit) {
            liquidity += askPrice * askQty;
            depthPlus2 += askQty;
          }
        });

        // Fetch 24-hour volume
        const volumeRes = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
        );
        const volumeData = await volumeRes.json();

        setData({
          price: price.toFixed(2),
          spread,
          liquidity: liquidity.toFixed(2),
          depthPlus2: depthPlus2.toFixed(2),
          depthMinus2: depthMinus2.toFixed(2),
          volume: parseFloat(volumeData.volume).toFixed(2),
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch market data.');
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [symbol]);

  if (loading) return <Card sx={{ p: 3, mt: 2 }}>Loading...</Card>;
  if (error) return <Card sx={{ p: 3, mt: 2 }}>{error}</Card>;

  return (
    <Card sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Binance Market Data for {symbol}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfoItem label="Price:" value={`$${data.price}`} />
          <InfoItem label="Bid-Ask Spread:" value={`$${data.spread}`} />
          <InfoItem label="Total Liquidity:" value={`$${data.liquidity}`} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoItem label="+2% Depth:" value={data.depthPlus2} />
          <InfoItem label="-2% Depth:" value={data.depthMinus2} />
          <InfoItem label="Volume (24h):" value={data.volume} />
        </Grid>
      </Grid>
    </Card>
  );
};

const InfoItem = ({ label, value }) => (
  <Stack direction="row" spacing={1}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography color="primary">{value}</Typography>
  </Stack>
);
