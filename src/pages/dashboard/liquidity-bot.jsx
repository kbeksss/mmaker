import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { LiquidityBotsView } from 'src/sections/bot/view';

// ----------------------------------------------------------------------

const metadata = { title: `Bot ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LiquidityBotsView />
    </>
  );
}
