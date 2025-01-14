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