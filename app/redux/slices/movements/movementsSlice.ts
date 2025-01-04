// app/slices/articlesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IArticle from '@/app/interfaces/article';
import { RootState } from '../../store/store'; // Importez le type RootState
import IMovement from '@/app/interfaces/movement';
import { createMovement, deleteMovement, fetchMovements, getMovementById, updateMovement } from './actions';


interface MovementsState {
    movements: IMovement[];
    currentMovement: IMovement | null;
    movementStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    movementError: string | null;
}
  
const initialState: MovementsState = {
    movements: [],
    currentMovement: null,
    movementStatus: 'idle',
    movementError: null,
};

const movementsSlice = createSlice({
    name: 'movements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les mouvements
        .addCase(fetchMovements.pending, (state) => {
          state.movementStatus = 'loading';
        })
        .addCase(fetchMovements.fulfilled, (state, action: PayloadAction<IMovement[]>) => {
          state.movementStatus = 'succeeded';
          state.movements = action.payload;
        })
        .addCase(fetchMovements.rejected, (state, action) => {
          state.movementStatus = 'failed';
          state.movementError = action.error.message || 'Erreur inconnue';
        })
  
        // Récupérer un mouvement par ID
        .addCase(getMovementById.pending, (state) => {
          state.movementStatus = 'loading';
        })
        .addCase(getMovementById.fulfilled, (state, action: PayloadAction<IMovement>) => {
          state.movementStatus = 'succeeded';
          state.currentMovement = action.payload;
        })
        .addCase(getMovementById.rejected, (state, action) => {
          state.movementStatus = 'failed';
          state.movementError = action.payload || 'Erreur inconnue';
        })
  
        // Créer un mouvement
        .addCase(createMovement.pending, (state) => {
          state.movementStatus = 'loading';
          state.movementError = null;
        })
        .addCase(createMovement.fulfilled, (state, action: PayloadAction<IMovement>) => {
          state.movementStatus = 'succeeded';
          state.movements.push(action.payload);
        })
        .addCase(createMovement.rejected, (state, action) => {
          state.movementStatus = 'failed';
          state.movementError = action.error.message || 'Échec de la création';
        })
  
        // Mettre à jour un mouvement
        .addCase(updateMovement.pending, (state) => {
          state.movementStatus = 'loading';
        })
        .addCase(updateMovement.fulfilled, (state, action: PayloadAction<IMovement>) => {
          state.movementStatus = 'succeeded';
          const updatedMovement = action.payload;
          const index = state.movements.findIndex((movement) => movement.id === updatedMovement.id);
          if (index !== -1) {
            state.movements[index] = updatedMovement;
          }
        })
        .addCase(updateMovement.rejected, (state, action) => {
          state.movementStatus = 'failed';
          state.movementError = action.payload || 'Erreur de mise à jour';
        })
  
        // Supprimer un mouvement
        .addCase(deleteMovement.pending, (state) => {
          state.movementStatus = 'loading';
        })
        .addCase(deleteMovement.fulfilled, (state, action: PayloadAction<string>) => {
          state.movementStatus = 'succeeded';
          state.movements = state.movements.filter((movement) => movement.id !== action.payload);
        })
        .addCase(deleteMovement.rejected, (state, action) => {
          state.movementStatus = 'failed';
          state.movementError = action.payload || 'Erreur de suppression';
        });
    },
  });


  export default movementsSlice.reducer;
  