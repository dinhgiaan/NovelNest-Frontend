import { useEffect } from 'react';

export const useDebugAuth = () => {
      useEffect(() => {
            const checkAuthState = () => {
                  const token = localStorage.getItem('access_token');
                  const refreshToken = localStorage.getItem('refresh_token');
                  const userInfo = localStorage.getItem('user_info');

                  console.log('=== AUTH DEBUG ===');
                  console.log('Has access_token:', !!token);
                  console.log('Has refresh_token:', !!refreshToken);
                  console.log('Has user_info:', !!userInfo);

                  if (userInfo) {
                        try {
                              const parsed = JSON.parse(userInfo);
                              console.log('Parsed user_info:', parsed);
                              console.log('Is authenticated:', parsed.isAuthenticated);
                              console.log('User ID:', parsed.user?._id);
                        } catch (e) {
                              console.log('Error parsing user_info:', e);
                        }
                  }
                  console.log('==================');
            };

            checkAuthState();

            const handleStorageChange = () => {
                  console.log('Storage changed, checking auth state...');
                  checkAuthState();
            };

            window.addEventListener('storage', handleStorageChange);

            return () => {
                  window.removeEventListener('storage', handleStorageChange);
            };
      }, []);
};
