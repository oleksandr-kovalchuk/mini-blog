'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, User, Save, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/lib/auth/store';
import { getCurrentUser, updateUser } from '@/lib/api';
import type { UserResponse, UpdateUserResponse } from '@/lib/types';
import { updateUserSchema } from '@/lib/validation/schemas';
import type { UpdateUserFormData } from '@/lib/validation/form-types';

export default function EditUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { user, updateUser: updateAuthUser } = useAuthStore();

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
        const currentUser: UserResponse = await getCurrentUser();
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
    } else {
      router.push('/login');
    }
  }, [user, router, form]);

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

      const result: UpdateUserResponse = await updateUser(updateData);

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

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">
            Update your personal information and account settings
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">
              Profile Settings
            </CardTitle>
            <CardDescription className="text-center">
              Make changes to your profile information
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {success}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Change Password
                  </h3>
                  <p className="text-sm text-gray-600">
                    Leave password fields empty if you don&apos;t want to change
                    your password
                  </p>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Profile
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
