'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AuthGuard } from '@/components/auth-guard';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { ProfileForm } from '@/components/profile-form';
import { DangerZone } from '@/components/danger-zone';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { useUserEdit } from '@/lib/hooks/useUserEdit';

export default function EditUserPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  const {
    form,
    isLoading,
    isLoadingUser,
    isDeleting,
    error,
    success,
    onSubmit,
    handleDeleteProfile,
  } = useUserEdit();

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    await handleDeleteProfile();
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (isLoadingUser) {
    return <LoadingScreen message="Loading user data..." />;
  }

  return (
    <AuthGuard>
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

          <ProfileForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            success={success}
          />

          <DangerZone
            onDeleteClick={handleDeleteClick}
            isLoading={isLoading}
            isDeleting={isDeleting}
          />

          <DeleteConfirmationModal
            isOpen={showDeleteConfirm}
            isDeleting={isDeleting}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
