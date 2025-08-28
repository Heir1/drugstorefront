// app/slices/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser, deleteUser, fetchUsers, getUserById, updateUser } from './actions';
import { RootState } from '../../store/store';
import IUser from '@/app/interfaces/user';

interface UsersState {
    users: IUser[];
    currentUser: IUser | null;
    userStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    currentUser: null,
    userStatus: 'idle',
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.userStatus = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.error = action.error.message || 'Erreur inconnue';
            })
            .addCase(getUserById.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(getUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.userStatus = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.userStatus = 'failed';
                // state.error = action.payload || 'Erreur inconnue';
                state.error = typeof action.payload === 'string' ? action.payload : 'Erreur inconnue';
            })
            .addCase(createUser.pending, (state) => {
                state.userStatus = 'loading';
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.userStatus = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.error = action.error.message || 'Échec de la création';
            })
            .addCase(updateUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.userStatus = 'succeeded';
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user.id === updatedUser.id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.error = typeof action.payload === 'string' ? action.payload : 'Erreur inconnue';
                // state.error = action.payload || 'Erreur de mise à jour';
            })
            .addCase(deleteUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.userStatus = 'succeeded';
                state.users = state.users.filter((user) => String(user.id) !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.error = typeof action.payload === 'string' ? action.payload : 'Erreur de suppression';
            });
    },
});

export const selectUserById = (
    state: { users: UsersState },
    userId: number
) => {
    return state.users.users.find((user) => user.id === userId) || null;
};

export default usersSlice.reducer;
