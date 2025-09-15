import { PrismaClient } from '@prisma/client';
import { PostResponse, CreatePostData, CreatePostResponse } from '../types';

const prisma = new PrismaClient();

export const getAllPosts = async (): Promise<PostResponse[]> => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
};

export const getPostById = async (id: string): Promise<PostResponse | null> => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
};

export const createPost = async (
  data: CreatePostData
): Promise<CreatePostResponse> => {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return {
    message: 'Post created successfully',
    post,
  };
};
