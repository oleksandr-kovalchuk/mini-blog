const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ApiResponse<T = unknown> {
  message?: string;
  error?: string;
  data?: T;
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

async function makeRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  baseURL: string = API_BASE_URL
): Promise<T> {
  const url = `${baseURL}${endpoint}`;

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
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
    console.error('API request failed:', error);
    throw error;
  }
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return makeRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
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

export async function createPost(data: { title: string; content: string }) {
  return makeRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePost(
  id: string,
  data: { title?: string; content?: string }
) {
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

export async function getCurrentUser() {
  return makeRequest('/users/me');
}

export async function updateUser(data: {
  name?: string;
  email?: string;
  password?: string;
}) {
  return makeRequest('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
