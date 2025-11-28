export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  createdAt: string; // ISO date string
}

export const mockUser: User = {
  id: "user-1",
  fullName: "علی احمدی",
  email: "ali.ahmadi@example.com",
  phone: "09123456789",
  city: "تهران",
  createdAt: "2024-01-15T10:00:00Z",
};

export function getUser(): User {
  return mockUser;
}

export function updateUser(updates: Partial<User>): User {
  // In a real app, this would update the backend
  // For now, we'll just return the updated user object
  return { ...mockUser, ...updates };
}

