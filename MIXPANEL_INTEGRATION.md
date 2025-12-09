# Mixpanel Integration Guide

## Overview

Mixpanel has been integrated into your Next.js application to track user interactions and analytics. The integration includes automatic page view tracking and manual event tracking capabilities.

## Files Added/Modified

### New Files:

- `src/lib/mixpanel.ts` - Mixpanel initialization and utility functions
- `src/hooks/use-analytics.ts` - React hook for analytics
- `src/components/analytics/page-tracker.tsx` - Automatic page view tracking
- `MIXPANEL_INTEGRATION.md` - This documentation

### Modified Files:

- `src/app/layout.tsx` - Added Mixpanel initialization and PageTracker
- `src/components/auth/login.tsx` - Added login event tracking
- `src/components/auth/forgot-password.tsx` - Added forgot password event tracking

## Usage Examples

### 1. Basic Event Tracking

```typescript
import { useAnalytics } from '@/hooks/use-analytics';

const MyComponent = () => {
  const { track } = useAnalytics();

  const handleButtonClick = () => {
    track('Button Clicked', {
      buttonName: 'Subscribe',
      location: 'header',
      timestamp: new Date().toISOString(),
    });
  };

  return <button onClick={handleButtonClick}>Subscribe</button>;
};
```

### 2. User Identification (on login)

```typescript
import { useAnalytics } from '@/hooks/use-analytics';

const LoginComponent = () => {
  const { identify, setUser } = useAnalytics();

  const handleSuccessfulLogin = user => {
    // Identify the user
    identify(user.id);

    // Set user properties
    setUser({
      email: user.email,
      name: user.name,
      plan: user.plan,
      signupDate: user.createdAt,
    });
  };
};
```

### 3. Page View Tracking

Page views are automatically tracked via the `PageTracker` component in your layout. You can also manually track specific page views:

```typescript
import { useAnalytics } from '@/hooks/use-analytics';

const MyPage = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Custom Page Name', {
      category: 'dashboard',
      userType: 'premium',
    });
  }, []);
};
```

### 4. User Logout

```typescript
import { useAnalytics } from '@/hooks/use-analytics';

const LogoutComponent = () => {
  const { reset, track } = useAnalytics();

  const handleLogout = () => {
    track('User Logged Out');
    reset(); // Clear user data from Mixpanel
  };
};
```

## Common Events to Track

### Authentication Events

- `Login Attempted`
- `Login Successful`
- `Login Failed`
- `Signup Attempted`
- `Signup Successful`
- `Forgot Password Attempted`
- `Password Reset Successful`
- `User Logged Out`

### User Interaction Events

- `Button Clicked`
- `Form Submitted`
- `File Uploaded`
- `Search Performed`
- `Filter Applied`
- `Modal Opened`
- `Modal Closed`

### Business Events

- `Chat Created`
- `Message Sent`
- `Report Generated`
- `Schedule Created`
- `Invoice Generated`
- `Settings Updated`

## Event Properties Best Practices

Always include relevant context with your events:

```typescript
track('Chat Created', {
  chatType: 'group', // or 'direct'
  participantCount: 5,
  timestamp: new Date().toISOString(),
  source: 'dashboard', // where the action was initiated
  userId: currentUser.id,
});
```

## Environment Configuration

The Mixpanel token is currently hardcoded. For production, consider using environment variables:

```typescript
// In src/lib/mixpanel.ts
const MIXPANEL_TOKEN =
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '103952dcc1d804d7ff35a7ffa52ca7e5';
```

Add to your `.env.local`:

```
NEXT_PUBLIC_MIXPANEL_TOKEN=103952dcc1d804d7ff35a7ffa52ca7e5
```

## Privacy Considerations

- Be mindful of tracking PII (Personally Identifiable Information)
- Consider implementing user consent for analytics
- Review your data retention policies
- Ensure compliance with GDPR/CCPA if applicable

## Testing

In development mode, Mixpanel debug mode is enabled. Check your browser console for Mixpanel events being sent.

## Next Steps

1. Add tracking to more components throughout your app
2. Set up custom dashboards in Mixpanel
3. Create funnels for key user journeys
4. Set up alerts for important metrics
5. Implement A/B testing using Mixpanel's feature flags
