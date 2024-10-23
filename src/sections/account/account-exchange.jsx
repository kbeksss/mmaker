import { Grid, Card } from '@mui/material';

const exchangeList = [
  { name: 'Binance', value: 'binance', icon: '/assets/images/exchange/binance.png' },
  {
    name: 'Coinbase exchange',
    value: 'coinbase',
    icon: '/assets/images/exchange/coinbase.webp',
  },
  {
    name: 'Bybit',
    value: 'bybit',
    icon: '/assets/images/exchange/bybit.png',
  },
  {
    name: 'OKX',
    value: 'okx',
    icon: '/assets/images/exchange/okx.png',
  },
  {
    name: 'Upbit',
    value: 'upbit',
    icon: '/assets/images/exchange/upbit.png',
  },
];

export function AccountExchange() {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4} item>
        <Card
          sx={{
            p: 3,
          }}
        >
          {exchangeList.map((exch) => (
            <div key={exch.value}>
              <img src={exch.icon} alt="" />
              {exch.name}
            </div>
          ))}
        </Card>
      </Grid>
      <Grid xs={12} md={8} item>
        <Card
          sx={{
            p: 3,
          }}
        >
          exchange
        </Card>
      </Grid>
    </Grid>
  );
}
