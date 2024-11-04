import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ExchangeView } from 'src/sections/exchange/view';

// ----------------------------------------------------------------------

const metadata = { title: `Account settings | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ExchangeView />
    </>
  );
}
