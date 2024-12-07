import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import axios, { endpoints, setSession, STORAGE_KEY, STORAGE_REFRESH_KEY } from 'src/utils/axios';

import { AuthContext } from '../auth-context';
import { isValidToken } from './utils';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      const refreshToken = sessionStorage.getItem(STORAGE_REFRESH_KEY);

      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, refreshToken);

        const res = await axios.get(endpoints.user.me);
        const user = res.data;

        setState({ user: { ...user, accessToken }, loading: false });
      } else if (refreshToken) {
        console.log('refr:', refreshToken);
        try {
          const res = await axios.post(endpoints.auth.refresh, { refresh_token: refreshToken });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

          if (newAccessToken) {
            setSession(newAccessToken, newRefreshToken);

            const userRes = await axios.get(endpoints.user.me);
            const user = userRes.data;

            setState({ user: { ...user, accessToken: newAccessToken }, loading: false });
          } else {
            throw new Error('Failed to refresh token');
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          sessionStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(STORAGE_REFRESH_KEY);
          setState({ user: null, loading: false });
        }
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Error during session check:', error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? 'admin',
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
