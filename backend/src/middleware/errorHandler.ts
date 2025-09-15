import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors,
    });
  }

  if (error.code === 'P2002') {
    // Prisma unique constraint error
    return res.status(409).json({
      error: 'Resource already exists',
    });
  }

  res.status(500).json({
    error: 'Internal server error',
  });
};
