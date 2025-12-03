import { getCookie, deleteCookie } from './cookie-utils';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('access_token');
  const cookieToken = getCookie('access_token');

  return !!(token && cookieToken);
}

export function logout() {
  // Clear localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_in');

  // Clear cookie
  deleteCookie('access_token');

  // Redirect to login
  window.location.href = '/login';
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}
