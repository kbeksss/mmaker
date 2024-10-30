import { useEffect, useRef } from 'react';
import { Box, Card } from '@mui/material';

const TradingViewWidget = ({ symbol = 'ETHBTC' }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => createWidget();
      document.head.appendChild(script);
    } else {
      createWidget();
    }

    function createWidget() {
      if (containerRef.current && window.TradingView) {
        // eslint-disable-next-line new-cap
        const temp = new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: true,
          save_image: false,
          studies: [],
          width: '100%',
          height: 500,
        });
      }
    }
  }, [symbol]);

  return (
    <Card sx={{ p: 2 }}>
      <Box id="tradingview-widget" ref={containerRef} style={{ width: '100%', height: '500px' }} />
    </Card>
  );
};

export default TradingViewWidget;
