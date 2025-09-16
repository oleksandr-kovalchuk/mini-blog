export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  AUTH_STORAGE: 'auth-storage',
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

export const PAGINATION_CONFIG = {
  POSTS_PER_PAGE: 5,
} as const;
