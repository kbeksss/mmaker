import { _mock } from './_mock';
import { _bot_types } from './assets';

export const _exchanges = {
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

const exchangesArray = Object.values(_exchanges);

export const _botList = exchangesArray.map((exchange, index) => ({
  id: _mock.id(index),
  exchangeName: exchange.name,
  market: 'ETHBTC',
  uptime: '83.74%',
  volume: '$10.1',
  activeOrders: index,
  baseBudget: '83.74',
  baseBalance: '97.14',
  quoteBudget: '68.71',
  quoteBalance: '68.71',
  feesPaid: `$${_mock.number.price(index + 3)}`,
  pnl: `$${_mock.number.price(index + 4)}`,
  status: (index % 2 && 'paused') || 'active',
  avatarUrl: exchange.icon,

  baseCurrency: 'ETH',
  quoteCurrency: 'BTC',

  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  email: _mock.email(index),
  address: '908 Jack Locks',
  isVerified: _mock.boolean(index),
  company: _mock.companyNames(index),
  country: _mock.countryNames(index),
  phoneNumber: _mock.phoneNumber(index),
}));

export const _botlist_all_type = exchangesArray.map((exchange, index) => ({
  id: _mock.id(index),
  exchangeName: exchange.name,
  activeOrders: index,
  volume: _mock.number.percent(index),
  feesPaid: `$${_mock.number.price(index + 3)}`,
  pnl: `$${_mock.number.price(index + 4)}`,
  botType: Object.values(_bot_types)[index % 3],
  avatarUrl: exchange.icon,

  baseCurrency: 'ETH',
  quoteCurrency: 'BTC',

  market: 'ETHBTC',
  uptime: '83.74%',
  baseBudget: '83.74',
  baseBalance: '97.14',
  quoteBudget: '68.71',
  quoteBalance: '68.71',

  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  email: _mock.email(index),
  address: '908 Jack Locks',
  isVerified: _mock.boolean(index),
  company: _mock.companyNames(index),
  country: _mock.countryNames(index),
  phoneNumber: _mock.phoneNumber(index),
  status: (index % 2 && 'paused') || 'active',
}));
