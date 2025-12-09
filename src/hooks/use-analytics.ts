import { useCallback } from 'react';
import { analytics } from '@/lib/mixpanel';

export const useAnalytics = () => {
  const track = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      analytics.track(eventName, properties);
    },
    []
  );

  const identify = useCallback((userId: string) => {
    analytics.identify(userId);
  }, []);

  const setUser = useCallback((properties: Record<string, any>) => {
    analytics.setUser(properties);
  }, []);

  const trackPageView = useCallback(
    (pageName: string, properties?: Record<string, any>) => {
      analytics.trackPageView(pageName, properties);
    },
    []
  );

  const reset = useCallback(() => {
    analytics.reset();
  }, []);

  return {
    track,
    identify,
    setUser,
    trackPageView,
    reset,
  };
};
