import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DistributionBotView } from 'src/sections/bot/view/distribution-bot-view';

// ----------------------------------------------------------------------

const metadata = { title: `Bot ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DistributionBotView />
    </>
  );
}
