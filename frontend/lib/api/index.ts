import { API_BASE_URL, STORAGE_KEYS, DEFAULT_HEADERS } from '../config';
import type {
  AuthResponse,
  UserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  RegisterData,
  LoginData,
  CreatePostData,
  UpdatePostData,
  UpdateUserData,
} from '../types';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const authStorage = localStorage.getItem(STORAGE_KEYS.AUTH_STORAGE);
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed.state?.token || null;
    }
  } catch {}

  return null;
}

async function makeRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  baseURL: string = API_BASE_URL
): Promise<T> {
  const url = `${baseURL}${endpoint}`;

  const token = getToken();

  const config: RequestInit = {
    headers: {
      ...DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return makeRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginData): Promise<AuthResponse> {
  return makeRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getPosts() {
  return makeRequest('/posts');
}

export async function getPost(id: string) {
  return makeRequest(`/posts/${id}`);
}

export async function createPost(data: CreatePostData) {
  return makeRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePost(id: string, data: UpdatePostData) {
  return makeRequest(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePost(id: string) {
  return makeRequest(`/posts/${id}`, {
    method: 'DELETE',
  });
}

export async function getCurrentUser(): Promise<UserResponse> {
  return makeRequest<UserResponse>('/users/me');
}

export async function updateUser(
  data: UpdateUserData
): Promise<UpdateUserResponse> {
  return makeRequest<UpdateUserResponse>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteUser(): Promise<DeleteUserResponse> {
  return makeRequest<DeleteUserResponse>('/users/me', {
    method: 'DELETE',
  });
}
