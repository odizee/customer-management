import type { User } from "@/types/users"

const API_URL = "https://reqres.in/api"

export async function fetchUsers(page = 1) {
  const response = await fetch(`${API_URL}/users?page=${page}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`)
  }

  return await response.json()
}

export async function deleteUser(id: number) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.status}`)
  }

  return true
}

export async function updateUser(user: User) {
  const { id, first_name, last_name, email } = user

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.status}`)
  }

  return await response.json()
}

export async function createUser(userData: Omit<User, "id" | "avatar">) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.status}`)
  }

  const data = await response.json()

  // ReqRes API doesn't actually create a real user with an avatar,
  // so we'll add a placeholder avatar
  return {
    ...data,
    avatar: `https://reqres.in/img/faces/${Math.floor(Math.random() * 12) + 1}-image.jpg`,
  }
}

