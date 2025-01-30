// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import IRate from '@/app/interfaces/rate';


// Action pour récupérer tous les taux
export const fetchRates= createAsyncThunk<IRate[]>(
    'rates/fetchRates',
    async (_, { rejectWithValue }) => {

      try {
            const response = await getRequest<IRate[]>('rates'); // Remplacez avec votre endpoint
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as IRate[];
      } catch (error: any) {
            return rejectWithValue(error.message);
      }
    }
);

// Action pour ajouter un taux
export const createRate = createAsyncThunk<IRate, { value: number }, { rejectValue: string }>(
  'rates/createRate',
  async ({ value }, { rejectWithValue }) => {
    try {
      const response = await postRequest<IRate>('rates', { value });

      if (response.error) {
        return rejectWithValue(response.error.message || "Une erreur est survenue");
      }

      return response.data as IRate;
    } catch (error: any) {
      return rejectWithValue(error.message || "Une erreur inconnue est survenue");
    }
  }
);

// Action pour mettre à jour un taux
export const updateRate = createAsyncThunk<IRate, { id: number; value: number }, { rejectValue: string }>(
  'rates/updateRate',
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const response = await putRequest<IRate>(`rates/${id}`, { value });

      if (response.error) {
        return rejectWithValue(response.error.message || "Une erreur est survenue");
      }

      return response.data as IRate;
    } catch (error: any) {
      return rejectWithValue(error.message || "Une erreur inconnue est survenue");
    }
  }
);