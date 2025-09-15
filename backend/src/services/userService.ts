import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UserResponse, UpdateUserData, UpdateUserResponse } from '../types';

const prisma = new PrismaClient();

export const getCurrentUser = async (
  userId: string
): Promise<UserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { posts: true },
      },
    },
  });

  return user;
};

export const updateUser = async (
  userId: string,
  data: UpdateUserData
): Promise<UpdateUserResponse> => {
  const updateData: any = {};

  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 12);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      updatedAt: true,
    },
  });

  return {
    message: 'User updated successfully',
    user: updatedUser,
  };
};

export const deleteUser = async (
  userId: string
): Promise<{ message: string }> => {
  await prisma.user.delete({
    where: { id: userId },
  });

  return {
    message: 'Account deleted successfully',
  };
};
