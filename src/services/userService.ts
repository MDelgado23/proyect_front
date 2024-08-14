import api from './api';

export const createUser = async (user: any) => {
  try {
    const response = await api.post('/auth/register', user);
    return response.data;
  } catch (error:any) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: any) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const iniciarSesion = async (credenciales: any) => {
  const response = await api.post('/auth/login', credenciales);
  return response.data;
};

export const updateUserUsername = async (userId: number, username: string) => {
  const response = await api.patch(`/users/update-username/${userId}`, { username });
  return response.data;
};

export const updateUserPassword = async (userId: number, password: string) => {
  const response = await api.patch(`/users/update-username/${userId}`, { password });
  return response.data;
};

export const updateUserEmail = async (userId: number, email: string) => {
  const response = await api.patch(`/users/update-email/${userId}`, { email });
  return response.data;
};

export const updateUserRole = async (userId: number, role: string) => {
  const response = await api.patch(`/users/update-role/${userId}`, { role });
  return response.data;
};

export const updateUserCoins = async (userId: number, coins: number) => {
  const response = await api.patch(`/users/update-coins/${userId}`, { coins });
  return response.data;
};

export const uploadProfileImage = async (userId: number, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post(`/users/${userId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

export const deleteProfileImage = async (userId: number): Promise<any> => {
  try {
    const response = await api.delete(`/users/${userId}/delete-profile-image`);
    return response.data;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
};

export const updatePassword = async (userId: number, currentPassword: string, newPassword: string): Promise<any> => {
  try {
    const response = await api.patch(`/users/${userId}/password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

