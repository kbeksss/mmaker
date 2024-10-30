import { _mock } from './_mock';

const exchanges = {
  binance: { name: 'Binance', value: 'binance', icon: '/assets/images/exchange/binance.png' },
  coinbase: {
    name: 'Coinbase exchange',
    value: 'coinbase',
    icon: '/assets/images/exchange/coinbase.webp',
  },
  bybit: {
    name: 'Bybit',
    value: 'bybit',
    icon: '/assets/images/exchange/bybit.png',
  },
  okx: {
    name: 'OKX',
    value: 'okx',
    icon: '/assets/images/exchange/okx.png',
  },
  upbit: {
    name: 'Upbit',
    value: 'upbit',
    icon: '/assets/images/exchange/upbit.png',
  },
};

export const _botList = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  pair: 'ETHBTC',
  activeOrders: index,
  originalBudget: _mock.number.price(index),
  firstPairBalance: _mock.number.price(index + 1),
  secondPairBalance: _mock.number.price(index + 2),
  tradingVolume: _mock.number.percent(index),
  feesPaid: _mock.number.price(index + 3),
  pnl: _mock.number.price(index + 4),

  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  email: _mock.email(index),
  address: '908 Jack Locks',
  exchangeName: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  company: _mock.companyNames(index),
  country: _mock.countryNames(index),
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
  status: (index % 2 && 'paused') || 'active',
}));
