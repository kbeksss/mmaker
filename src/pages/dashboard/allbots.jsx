import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AllBotsView } from '../../sections/bot/view';

// ----------------------------------------------------------------------

const metadata = { title: `Bot list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AllBotsView />
    </>
  );
}
