import { postRequest } from "@/app/helpers/api/verbes";
import IUser from "@/app/interfaces/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Définir le type pour les paramètres de login
interface LoginCredentials {
    email: string;
    password: string;
}

// Simuler un appel API pour la connexion
export const loginUser = createAsyncThunk<IUser, LoginCredentials>(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {

                const response = await postRequest<IUser>('login', credentials);

                // Ensure that response.data is defined before accessing it
                console.log(response.error?.message);
                
                if (response.error?.message) {
                    // Handle if response.data is undefined or null
                    console.log('No data in response');
                    return rejectWithValue(response.error?.message);
                }

                // Check if response contains an error
                if (response.error?.message) {
                    // console.log(response.data.error);
                    // alert(response.data.error.message); // Show error message
                    // return rejectWithValue(response.data.error);
                }

                // If login is successful, return user data
                // console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data as IUser; // Return user data from backend

        } catch (error: any) {
            console.error('ERROR ',error);
            return rejectWithValue(error.response?.data?.message || 'Erreur inconnue');
        }
    }
);

// **Nouvelle action pour la déconnexion**
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            // Appel API pour déconnexion (si nécessaire)
            await postRequest('logout', {});
            return true; // Retourne true pour indiquer que l'utilisateur a été déconnecté
        } catch (error: any) {
            console.error('Erreur lors de la déconnexion:', error);
            return rejectWithValue(error.response?.data?.message || 'Erreur inconnue');
        }
    }
);