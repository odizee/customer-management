"use client";

import type { User } from "@/types/users";
import { Trash2, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface UserListProps {
  users: User[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
  deletingUsers: number[];
}

export default function UserList({
  users,
  loading,
  onDelete,
  onEdit,
  deletingUsers,
}: UserListProps) {
  if (loading) {
    return (
      <div className="p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 py-4 border-b"
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium text-gray-500">
              First Name
            </th>
            <th className="text-left p-4 font-medium text-gray-500">
              Last Name
            </th>
            <th className="text-left p-4 font-medium text-gray-500">Avatar</th>
            <th className="text-left p-4 font-medium text-gray-500">Email</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{user.first_name}</td>
              <td className="p-4">{user.last_name}</td>
              <td className="p-4">
                <Avatar>
                  <AvatarImage
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <AvatarFallback>
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              </td>
              <td className="p-4">{user.email}</td>
              <td className="p-4 flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(user)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(user.id)}
                  disabled={deletingUsers.includes(user.id)}
                >
                  {deletingUsers.includes(user.id) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
