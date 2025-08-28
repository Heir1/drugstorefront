// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import ICurrency from '@/app/interfaces/currency';


// Action pour récupérer tous les currencies
export const fetchCurrencies= createAsyncThunk<ICurrency[]>(
    'currencies/fetchCurrencies',
    async (_, { rejectWithValue }) => {

      try {
        const response = await getRequest<ICurrency[]>('currencies'); // Remplacez avec votre endpoint
        if (response.error) {
          return rejectWithValue(response.error);
        }
        return response.data as ICurrency[] ;
        
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);