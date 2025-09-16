'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/lib/auth/store';
import { getCurrentUser, updateUser, deleteUser } from '@/lib/api';
import { updateUserSchema } from '@/lib/validation/schemas';
import { withMinimumDelay } from '@/lib/utils';
import type { UpdateUserFormData } from '@/lib/validation/form-types';
import type { UserResponse, UpdateUserResponse } from '@/lib/types';

export function useUserEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { user, updateUser: updateAuthUser, logout } = useAuthStore();

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser: UserResponse = await withMinimumDelay(
          getCurrentUser()
        );
        form.reset({
          name: currentUser.name,
          email: currentUser.email,
          password: '',
          confirmPassword: '',
        });
      } catch {
        setError('Failed to load user data');
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user, form]);

  const onSubmit = async (data: UpdateUserFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updateData: { name?: string; email?: string; password?: string } =
        {};

      if (data.name && data.name.trim() !== '') {
        updateData.name = data.name.trim();
      }
      if (data.email && data.email.trim() !== '') {
        updateData.email = data.email.trim();
      }
      if (data.password && data.password.trim() !== '') {
        updateData.password = data.password;
      }

      const result: UpdateUserResponse = await withMinimumDelay(
        updateUser(updateData)
      );

      if (result.user) {
        updateAuthUser({
          name: result.user.name,
          email: result.user.email,
        });
      }

      setSuccess('Profile updated successfully!');
      form.setValue('password', '');
      form.setValue('confirmPassword', '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await withMinimumDelay(deleteUser());
      logout();
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete profile');
      setIsDeleting(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    form,
    isLoading,
    isLoadingUser,
    isDeleting,
    error,
    success,
    onSubmit,
    handleDeleteProfile,
    clearMessages,
  };
}
