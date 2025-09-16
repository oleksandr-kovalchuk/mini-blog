export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    posts: number;
  };
}

export interface UpdateUserResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    updatedAt: string;
  };
}

export interface DeleteUserResponse {
  message: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  initialize: () => void;
}

export interface ApiResponse<T = unknown> {
  message?: string;
  error?: string;
  data?: T;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface DangerZoneProps {
  onDeleteClick: () => void;
  isLoading: boolean;
  isDeleting: boolean;
}
