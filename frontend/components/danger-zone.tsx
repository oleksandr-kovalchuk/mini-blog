import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { DangerZoneProps } from '@/lib/types';

export function DangerZone({
  onDeleteClick,
  isLoading,
  isDeleting,
}: DangerZoneProps) {
  return (
    <Card className="mt-8 border-red-200 bg-red-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-red-800 flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
          Danger Zone
        </CardTitle>
        <CardDescription className="text-red-700">
          Irreversible and destructive actions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-white border border-red-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Delete Account</h4>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <div className="flex items-center text-sm text-red-600 mb-4">
                <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                All your posts will be deleted
              </div>
              <div className="flex items-center text-sm text-red-600">
                <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                Your profile information will be removed
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={onDeleteClick}
              disabled={isLoading || isDeleting}
              className="ml-4 shrink-0"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
