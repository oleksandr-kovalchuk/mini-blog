import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    posts: number;
  };
}

export interface AuthResponse {
  message: string;
  user: UserResponse;
  token: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface PostResponse {
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

export interface CreatePostResponse {
  message: string;
  post: PostResponse;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
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

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = Cookies.get('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPosts(): Promise<PostResponse[]> {
    return this.request<PostResponse[]>('/posts');
  }

  async getPost(id: string): Promise<PostResponse> {
    return this.request<PostResponse>(`/posts/${id}`);
  }

  async createPost(data: CreatePostData): Promise<CreatePostResponse> {
    return this.request<CreatePostResponse>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMe(): Promise<UserResponse> {
    return this.request<UserResponse>('/users/me');
  }

  async updateMe(data: UpdateUserData): Promise<UpdateUserResponse> {
    return this.request<UpdateUserResponse>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMe(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/me', {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
