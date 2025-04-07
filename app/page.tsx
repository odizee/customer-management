"use client";

import { useState, useEffect } from "react";
import UserList from "@/components/user-list";
import Pagination from "@/components/pagination";
import AddUserModal from "@/components/add-user-modal";
import EditUserModal from "@/components/edit-user-modal";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/users";
import { fetchUsers, deleteUser, updateUser, createUser } from "@/lib/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // New loading states for different actions
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [deletingUsers, setDeletingUsers] = useState<number[]>([]);

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const loadUsers = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchUsers(page);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = async (id: number) => {
    // Add user id to deleting array
    setDeletingUsers((prev) => [...prev, id]);
    try {
      await deleteUser(id);
      // Remove user from the UI
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      // Remove user id from deleting array
      setDeletingUsers((prev) => prev.filter((userId) => userId !== id));
    }
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    setIsUpdatingUser(true);
    try {
      const response = await updateUser(updatedUser);
      // Update user in the UI
      setUsers(
        users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...response } : user
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleAddUser = async (newUser: Omit<User, "id" | "avatar">) => {
    setIsAddingUser(true);
    try {
      const response = await createUser(newUser);
      // Add the new user to the UI
      setUsers([...users, response]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsAddingUser(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md">
        <div className="p-6 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold">Users</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>Add User</Button>
        </div>

        <UserList
          users={users}
          loading={loading}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
          deletingUsers={deletingUsers}
        />

        <div className="p-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUser}
          isLoading={isAddingUser}
        />
      )}

      {isEditModalOpen && currentUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={currentUser}
          onUpdate={handleUpdateUser}
          isLoading={isUpdatingUser}
        />
      )}
    </main>
  );
}
