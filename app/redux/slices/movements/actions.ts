// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import IMovement from '@/app/interfaces/movement';

// Define the parameter type for the thunk
interface FetchMovementsParams {
  typeId: string;
  firstrange: string;
  secondrange: string;
}


// Action for fetching movements
// export const fetchMovements = createAsyncThunk<IMovement[], FetchMovementsParams, { rejectValue: string }>(
//   'movements/fetchMovements',
//   async ({ typeId, firstrange, secondrange }, { rejectWithValue }) => {
//     try {
//       // Update your endpoint accordingly
//       const response = await getRequest<IMovement[]>(`/movements/type/${typeId}/${firstrange}/${secondrange}`);
//       if (response.error) {
//         return rejectWithValue(response.error);
//       }
//       console.log(response.data);
//       return response.data as IMovement[];
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );*

export const fetchMovements = createAsyncThunk<IMovement[], FetchMovementsParams, { rejectValue: string }>(
  'movements/fetchMovements',
  async ({ typeId, firstrange, secondrange }, { rejectWithValue }) => {
    try {
      const response = await getRequest<IMovement[]>(`/movements/type/${typeId}/${firstrange}/${secondrange}`);
      if (response.error) {
        return rejectWithValue(response.error.message || 'An unknown error occurred');
      }
      return response.data as IMovement[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'An unknown error occurred');
    }
  }
);


// Action pour récupérer un movement par ID
export const getMovementById = createAsyncThunk<IMovement, string, { rejectValue: string }>(
    'movements/getMovementById',
    async (movementId: string, { rejectWithValue }) => {
      try {
        const response = await getRequest<IMovement>(`movements/${movementId}`); // Remplacez avec votre endpoint
        if (response.error) {
          const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
          return rejectWithValue(errorMessage);
        }
        return response.data  as IMovement;
      } catch (error: any) {
        return rejectWithValue(error.message || 'Unknown error');
      }
    }
);


// Action pour récupérer un movement par ID movements/type/
export const getMovementByType = createAsyncThunk<IMovement, string, { rejectValue: string }>(
  'movements/type',
  async (type: string, { rejectWithValue }) => {
    try {
      const response = await getRequest<IMovement>(`movements/type/${type}`); // Remplacez avec votre endpoint
      if (response.error) {
        const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
        return rejectWithValue(errorMessage);
      }
      return response.data  as IMovement;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

// Entée
// Action pour créer un nouvel movement
export const createMovement = createAsyncThunk<IMovement, IMovement>(
    'movements/createMovement',
    async (newMovement: IMovement, { rejectWithValue }) => {
      try {
        const response = await postRequest<IMovement>('movements', newMovement); // Remplacez avec votre endpoint
        
        if (response.error) {
          console.log(response.error)
          alert(response.error.message)
          return rejectWithValue(response.error);
        }
        alert("Movement créé avec succès")
        console.log(response.data);
        return response.data as IMovement;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);


// Action pour mettre à jour un movement
export const updateMovement = createAsyncThunk<IMovement, { id: string; data: IMovement }, { rejectValue: string }>(
    'movements/updateMovement',
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await putRequest<IMovement>(`movements/${id}`, data); // Remplacez avec votre endpoint
        if (response.error) {

            const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
            return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue

            // return rejectWithValue(response.error);
        }
        alert("Modification avec succès")
        return response.data as IMovement;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);


// Action pour supprimer un movement
export const deleteMovement = createAsyncThunk<string, string, { rejectValue: string }>(
    'movements/deleteMovement',
    async (movementId: string, { rejectWithValue }) => {
      try {
        const response = await deleteRequest(`movements/${movementId}`); // Remplacez avec votre endpoint
        if (response.error) {

            const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
            
            return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue

            // return rejectWithValue(response.error);
        }
        return movementId; // Retourner l'ID de mouvent supprimé
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);