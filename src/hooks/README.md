# User Management Hooks

## Overview

This setup provides a complete user management solution using Zustand for state management and React Query for data fetching.

## Files Created

- `src/lib/stores/user-store.ts` - Zustand store for user state
- `src/hooks/use-current-user.ts` - Main hook for fetching and accessing user data
- `src/hooks/use-user-actions.ts` - Utility hook for user actions
- `src/components/providers/user-provider.tsx` - Provider component
- `src/components/common/user-profile.tsx` - Example usage component

## Usage

### 1. Access User Data Anywhere

```tsx
import { useCurrentUser } from '@/hooks/use-current-user';

function MyComponent() {
  const { user, isLoading, error, isAuthenticated } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return <div>Welcome, {user?.name || user?.email}!</div>;
}
```

### 2. User Actions

```tsx
import { useUserActions } from '@/hooks/use-user-actions';

function LogoutButton() {
  const { logout } = useUserActions();

  return <button onClick={logout}>Logout</button>;
}
```

### 3. Direct Store Access

```tsx
import { useUserStore } from '@/lib/stores/user-store';

function MyComponent() {
  const user = useUserStore(state => state.user);
  const isLoading = useUserStore(state => state.isLoading);

  // ...
}
```

## Features

- ✅ Automatic user data fetching on app load
- ✅ Persistent user data across page refreshes
- ✅ Global state management with Zustand
- ✅ Error handling and loading states
- ✅ Token-based authentication support
- ✅ TypeScript support
- ✅ Automatic retry logic
- ✅ Dev tools integration

## API Response Expected

The hook expects the API endpoint `/api/v1/auth/current-user` to return:

```json
{
  "status": "success",
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "avatar-url",
    "role": "user-role",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

Update the `User` interface in `src/types/auth.ts` to match your actual API response structure.
