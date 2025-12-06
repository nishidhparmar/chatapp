# UserAvatar Component Usage Examples

A flexible and reusable avatar component that displays user profile pictures with fallback initials.

## Basic Usage

```tsx
import UserAvatar from '@/components/common/user-avatar';

// With user data from store
const { user } = useUserStore();
<UserAvatar name={user?.name} avatar={user?.avatar} />

// With custom props
<UserAvatar
  name="John Doe"
  avatar="https://example.com/avatar.jpg"
/>

// Fallback when no avatar
<UserAvatar name="Jane Smith" />
```

## Size Variants

```tsx
<UserAvatar name="User" size="xs" />  // 20x20px
<UserAvatar name="User" size="sm" />  // 24x24px
<UserAvatar name="User" size="md" />  // 32x32px (default)
<UserAvatar name="User" size="lg" />  // 40x40px
<UserAvatar name="User" size="xl" />  // 48x48px
```

## Interactive Avatar

```tsx
<UserAvatar
  name='John Doe'
  avatar='https://example.com/avatar.jpg'
  onClick={() => console.log('Avatar clicked!')}
/>
```

## Custom Styling

```tsx
<UserAvatar
  name='Jane Smith'
  className='ring-2 ring-blue-500'
  fallbackClassName='bg-blue-100 text-blue-800'
/>
```

## Features

- Automatically generates initials from name
- Supports custom avatar images with fallback to initials
- Five size variants: xs, sm, md, lg, xl
- Interactive support with onClick handler
- Fully accessible with proper alt text
- Customizable styling with className and fallbackClassName props
- Hover effects for interactive avatars

## Props

| Prop                | Type                                   | Default | Description                                      |
| ------------------- | -------------------------------------- | ------- | ------------------------------------------------ |
| `name`              | `string`                               | -       | User's name for generating initials              |
| `avatar`            | `string`                               | -       | URL of the user's avatar image                   |
| `size`              | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Size of the avatar                               |
| `className`         | `string`                               | -       | Additional CSS classes for the avatar container  |
| `fallbackClassName` | `string`                               | -       | Additional CSS classes for the fallback initials |
| `onClick`           | `() => void`                           | -       | Click handler for interactive avatars            |
| `alt`               | `string`                               | -       | Alt text for the avatar image                    |
