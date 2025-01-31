import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './actions';
import IUser from '@/app/interfaces/user';
import storageSession from "redux-persist/lib/storage/session"; // Import pour supprimer les données persistées

// Définir l'interface pour l'utilisateur
interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: 'admin' | 'user'; // Pour d'autres rôles, ajoute-les ici
}

// Définir l'interface pour l'état global
interface AuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

// Valeur initiale pour l'état global
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Définir le type pour les paramètres de login
interface LoginCredentials {
    email: string;
    password: string;
}


// Création du slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            storageSession.removeItem("persist:auth"); // Supprime la session après logout
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Gestion de loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = String(action?.payload);
            })

            // ✅ Gestion de logoutUser
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                storageSession.removeItem("persist:auth"); // Supprime aussi lors de logout API
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = String(action?.payload);
            });
    },
});

// Export des actions et du reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
