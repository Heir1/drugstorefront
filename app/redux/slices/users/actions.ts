import { createAsyncThunk } from '@reduxjs/toolkit';
import IUser from '@/app/interfaces/user';
import { getRequest, postRequest, putRequest, deleteRequest } from '@/app/helpers/api/verbes';

// Action pour récupérer tous les utilisateurs
export const fetchUsers = createAsyncThunk<IUser[]>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getRequest<IUser[]>('users');
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as IUser[];
        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur lors du chargement des utilisateurs');
        }
    }
);

// Action pour récupérer un utilisateur par ID
export const getUserById = createAsyncThunk<IUser, string>(
    'users/getUserById',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getRequest<IUser>(`users/${userId}`);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as IUser;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Utilisateur non trouvé');
        }
    }
);

// Action pour créer un utilisateur
export const createUser = createAsyncThunk<IUser, IUser>(
    'users/createUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await postRequest<IUser>('register', userData);
            if (response.error) {
                return rejectWithValue(response.error);
            }            
            return response.data as IUser;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Échec de la création');
        }
    }
);

// Action pour mettre à jour un utilisateur
export const updateUser = createAsyncThunk<IUser, IUser>(
    'users/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await putRequest<IUser>(`users/${userData.id}`, userData);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as IUser;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur de mise à jour');
        }
    }
);

// Action pour supprimer un utilisateur
export const deleteUser = createAsyncThunk<string, string>(
    'users/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await deleteRequest(`users/${userId}`);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return userId; // Retourne l'ID pour le supprimer du store
        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur de suppression');
        }
    }
);
