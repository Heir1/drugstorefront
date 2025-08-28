// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import IPaymentMode from '@/app/interfaces/paymentmode';


// Action pour récupérer tous les packagings
export const fetchPaymentModes = createAsyncThunk<IPaymentMode[]>(
    'paymentmodes/fetchPaymentModes',
    async (_, { rejectWithValue }) => {

      try {
        const response = await getRequest<IPaymentMode[]>('payment-modes'); // Remplacez avec votre endpoint
        if (response.error) {
          return rejectWithValue(response.error);
        }
        return response.data as IPaymentMode[] ;
        
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);
