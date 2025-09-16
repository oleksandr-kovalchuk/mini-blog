import { PrismaClient } from '@prisma/client';
import {
  PostResponse,
  CreatePostData,
  CreatePostResponse,
  PaginationParams,
  PaginatedResponse,
} from '../types';

const prisma = new PrismaClient();

export const getAllPosts = async (
  params: PaginationParams = {}
): Promise<PaginatedResponse<PostResponse>> => {
  const page = params.page || 1;
  const limit = params.limit || 5;
  const skip = (page - 1) * limit;

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
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
    }),
    prisma.post.count(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
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
