import { User } from '@/types/auth';

export const getDisplayName = (
  user?: User | null,
  fallback: string = 'Guest'
): string => {
  if (!user) return fallback;

  if (user.name) return user.name;

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) return user.firstName;

  if (user.email) {
    return user.email.split('@')[0];
  }

  return fallback;
};

export const getUserInitials = (
  user?: User | null,
  fallback: string = 'U'
): string => {
  const displayName = getDisplayName(user, fallback);

  if (!displayName || displayName === fallback)
    return fallback.charAt(0).toUpperCase();

  const names = displayName.trim().split(' ');

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const getUserAvatar = (
  user?: User | null,
  fallback?: string
): string | undefined => {
  return user?.avatar || fallback;
};
/**
 * Get initials from a name string
 * @param name - Name string
 * @param fallback - Fallback text (default: 'U')
 * @returns Initials string (1-2 characters)
 */
export const getInitialsFromName = (
  name?: string,
  fallback: string = 'U'
): string => {
  if (!name) return fallback.charAt(0).toUpperCase();

  const names = name.trim().split(' ');

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};
