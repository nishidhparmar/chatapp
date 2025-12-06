# User Helper Functions

Utility functions for handling user display logic consistently across the application.

## Functions

### `getDisplayName(user, fallback)`

Gets a display name from user data with intelligent fallback logic.

**Parameters:**

- `user` - User object or null/undefined
- `fallback` - Fallback text (default: 'Guest')

**Priority order:**

1. `user.name`
2. `user.firstName + user.lastName`
3. `user.firstName`
4. `user.email` (username part before @)
5. fallback

```tsx
import { getDisplayName } from '@/lib/utils/user-helpers';

// Basic usage
const displayName = getDisplayName(user);

// With custom fallback
const displayName = getDisplayName(user, 'Anonymous');

// Examples of output:
// user.name = "John Doe" → "John Doe"
// user.firstName = "John", user.lastName = "Doe" → "John Doe"
// user.firstName = "John" → "John"
// user.email = "john@example.com" → "john"
// user = null → "Guest"
```

### `getUserInitials(user, fallback)`

Gets user initials for avatar fallbacks.

**Parameters:**

- `user` - User object or null/undefined
- `fallback` - Fallback text (default: 'U')

```tsx
import { getUserInitials } from '@/lib/utils/user-helpers';

const initials = getUserInitials(user);

// Examples:
// "John Doe" → "JD"
// "John" → "J"
// "john@example.com" → "J"
// null → "U"
```

### `getInitialsFromName(name, fallback)`

Gets initials directly from a name string.

**Parameters:**

- `name` - Name string
- `fallback` - Fallback text (default: 'U')

```tsx
import { getInitialsFromName } from '@/lib/utils/user-helpers';

const initials = getInitialsFromName('John Doe');

// Examples:
// "John Doe" → "JD"
// "John" → "J"
// "" → "U"
// null → "U"
```

### `getUserAvatar(user, fallback)`

Gets user avatar URL with optional fallback.

**Parameters:**

- `user` - User object or null/undefined
- `fallback` - Fallback avatar URL (optional)

```tsx
import { getUserAvatar } from '@/lib/utils/user-helpers';

const avatarUrl = getUserAvatar(user, '/default-avatar.png');
```

## Usage in Components

### Header Component

```tsx
import { getDisplayName } from '@/lib/utils/user-helpers';

const Header = () => {
  const { user } = useUserStore();
  const displayName = getDisplayName(user);

  return <UserAvatar name={displayName} avatar={user?.avatar} />;
};
```

### User Profile Component

```tsx
import { getDisplayName } from '@/lib/utils/user-helpers';

const UserProfile = () => {
  const { user } = useCurrentUser();
  const displayName = getDisplayName(user);

  return (
    <div>
      <UserAvatar name={displayName} avatar={user?.avatar} />
      <span>{displayName}</span>
    </div>
  );
};
```

### Chat Messages

```tsx
import { getDisplayName } from '@/lib/utils/user-helpers';

const ChatMessage = ({ user }) => {
  const displayName = getDisplayName(user, 'Anonymous User');

  return (
    <ChatBubble userName={displayName} avatar={user?.avatar} message='Hello!' />
  );
};
```

## Benefits

- **Consistency**: Same display logic across all components
- **Maintainability**: Single place to update user display rules
- **Flexibility**: Customizable fallbacks for different contexts
- **Type Safety**: Proper TypeScript types for all functions
- **Reusability**: Can be used in any component that needs user display logic
