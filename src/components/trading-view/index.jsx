import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const TradingViewWidget = ({ symbol = 'ETHBTC' }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const loadTradingWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        // eslint-disable-next-line new-cap
        const tradingViewWidgetInstance = new window.TradingView.widget({
          container_id: containerRef.current,
          symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1', // Стиль графика
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: true,
          save_image: false,
          studies: [],
          width: '100%',
          height: 500,
        });
      };
      return script;
    };
    if (containerRef.current) {
      const script = loadTradingWidget();
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <Box id="tradingview-widget" ref={containerRef} style={{ width: '100%', height: '500px' }} />
  );
};

export default TradingViewWidget;
