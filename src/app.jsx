import 'src/global.css';

// ----------------------------------------------------------------------
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
import { CONFIG } from './config-global';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="903895607285-m7ba4uk338l3jkp55q15ri1m1sek22j7.apps.googleusercontent.com">
        <SettingsProvider settings={defaultSettings}>
          <ThemeProvider>
            <MotionLazy>
              <ProgressBar />
              <SettingsDrawer />
              <Router />
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
