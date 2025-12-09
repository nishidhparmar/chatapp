import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
const MIXPANEL_TOKEN = '103952dcc1d804d7ff35a7ffa52ca7e5';

if (typeof window !== 'undefined') {
  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: true,
    record_sessions_percent: 100,
    debug: process.env.NODE_ENV === 'development',
  });
}

// Mixpanel utility functions
export const analytics = {
  // Track events
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track(eventName, properties);
    }
  },

  // Identify user
  identify: (userId: string) => {
    if (typeof window !== 'undefined') {
      mixpanel.identify(userId);
    }
  },

  // Set user properties
  setUser: (properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.people.set(properties);
    }
  },

  // Track page views
  trackPageView: (pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('Page View', {
        page: pageName,
        ...properties,
      });
    }
  },

  // Reset user (for logout)
  reset: () => {
    if (typeof window !== 'undefined') {
      mixpanel.reset();
    }
  },
};

export default analytics;
