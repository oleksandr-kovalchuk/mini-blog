import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { RegisterData, LoginData, AuthResponse } from '../types';

const prisma = new PrismaClient();

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    return {
      message: 'User created successfully',
      user,
      token,
    };
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      throw new Error('Email already exists');
    }
    throw error;
  }
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return {
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      _count: {
        posts: 0,
      },
    },
    token,
  };
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
};
