import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OnboardingView } from 'src/sections/onboarding/view';

// ----------------------------------------------------------------------

const metadata = { title: `Onboarding - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OnboardingView />
    </>
  );
}
