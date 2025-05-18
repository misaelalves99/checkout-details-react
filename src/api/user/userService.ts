// app/user/userService.ts

import { User } from '@/app/types/user'; // Garanta que este tipo esteja definido corretamente

// Funções de Serviço Local (simuladas)
// ==============================

// Registra um novo usuário localmente (mock/in-memory)

export const registerUserService = async (userData: { name: string; email: string; password: string }): Promise<User> => {
  const newUser: User = {
    id: crypto.randomUUID(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString(),
  };
  return newUser;
};

// Atualiza um usuário localmente (mock/in-memory)

export const updateUserService = async (id: string, userData: { name: string; email: string }): Promise<User> => {
  const updatedUser: User = {
    id,
    name: userData.name,
    email: userData.email,
    password: '', // Preencher com valor real conforme lógica de backend
    updatedAt: new Date().toISOString(),
  };
  return updatedUser;
};

// Funções que interagem com API REST
// ==============================

// Registra um novo usuário via API
 
export const registerUser = async (userData: User): Promise<User> => {
  const response = await fetch('/api/registerUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error registering user');
  }

  return response.json();
};

// Faz login via API
 
export const loginUser = async (credentials: { email: string; password: string }): Promise<User> => {
  const response = await fetch('/api/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Error logging in');
  }

  return response.json();
};

// Busca dados de um usuário via API

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`/api/user/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching user data');
  }

  return response.json();
};

// Atualiza os dados do usuário via API
 
export const updateUser = async (userId: string, userData: User): Promise<User> => {
  const response = await fetch(`/api/updateUser/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error updating user');
  }

  return response.json();
};

// Exclui um usuário via API

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`/api/deleteUser/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting user');
  }
};

// 01-Estruturas e Tratamento -
// 02-Funções e Métodos -
// 03-Arrays -
// 08-Api -