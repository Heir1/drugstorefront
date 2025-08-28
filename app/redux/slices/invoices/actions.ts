// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import Iinvoice from '@/app/interfaces/invoice';
import IInvoiceResponse from '@/app/interfaces/invoicenumber';

interface FetchInvoicesParams {
  invoice: string;
  paymentModeId: string;
  firstrange: string;
  secondrange: string;
}

// ({ paymentModeId: "1", firstrange: startDate, secondrange: endDate }))
// Action pour récupérer tous les invoices
export const fetchInvoices = createAsyncThunk<Iinvoice[], FetchInvoicesParams, { rejectValue: string }>(
    'invoices/fetchInvoices',
    async ({ paymentModeId, invoice, firstrange, secondrange }, { rejectWithValue }) => {

      try {
        const response = await getRequest<Iinvoice[]>(`/invoices/mode/${paymentModeId}/${invoice}/${firstrange}/${secondrange}`); // Remplacez avec votre endpoint
        if (response.error) {
          return rejectWithValue(response.error.message || 'An unknown error occurred');
        }
        console.log("INVOICE LINEE",response.data);
        return response.data as Iinvoice[] ;
        
      } catch (error: any) {
        return rejectWithValue(error.message || 'An unknown error occurred');
      }
    }
);


// Action pour récupérer tous le invoice number
  export const fetchInvoiceNumber = createAsyncThunk<IInvoiceResponse>(
  'invoices/fetchInvoiceNumber',
  async (_, { rejectWithValue }) => {

    try {
      const response = await getRequest<IInvoiceResponse>("invoicenumber"); // Remplacez avec votre endpoint
      if (response.error) {
        return rejectWithValue(response.error.message || 'An unknown error occurred');
      }
      console.log(response.data);
      return response.data as IInvoiceResponse ;
      
    } catch (error: any) {
      return rejectWithValue(error.message || 'An unknown error occurred');
    }
  }
);

// export const fetchMovements = createAsyncThunk<IMovement[], FetchMovementsParams, { rejectValue: string }>(
//   'movements/fetchMovements',
//   async ({ typeId, firstrange, secondrange }, { rejectWithValue }) => {
//     try {
//       const response = await getRequest<IMovement[]>(`/movements/type/${typeId}/${firstrange}/${secondrange}`);
//       if (response.error) {
//         return rejectWithValue(response.error.message || 'An unknown error occurred');
//       }
//       return response.data as IMovement[];
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'An unknown error occurred');
//     }
//   }
// );


// // Action pour récupérer un article par ID
// export const getArticleById = createAsyncThunk<IArticle, string, { rejectValue: string }>(
//     'articles/getArticleById',
//     async (articleId: string, { rejectWithValue }) => {
//       try {
//         const response = await getRequest<IArticle>(`articles/${articleId}`); // Remplacez avec votre endpoint
//         if (response.error) {
//           const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
//           return rejectWithValue(errorMessage);
//         }
//         return response.data  as IArticle;
//       } catch (error: any) {
//         return rejectWithValue(error.message || 'Unknown error');
//       }
//     }
// );


// Action pour créer un nouvel invoice
export const createInvoice = createAsyncThunk<Iinvoice, Iinvoice>(
    'invoices/createInvoice',
    async (newInvoice: Iinvoice, { rejectWithValue }) => {
      try {
        const response = await postRequest<Iinvoice>('invoices', newInvoice); // Remplacez avec votre endpoint
        
        if (response.error) {
          console.log(response.error)
          return rejectWithValue(response.error);
        }
        
        return response.data as Iinvoice;
        
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);


// Action pour mettre à jour un item facture
export const updateInvoice = createAsyncThunk<Iinvoice, { id: string; data: Iinvoice }, { rejectValue: string }>(
  'invoices/updateInvoice',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await putRequest<Iinvoice>(`invoices/${id}`, data); // Remplacez avec votre endpoint
      if (response.error) {

          const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
          return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue

          // return rejectWithValue(response.error);
      }
      return response.data as Iinvoice;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


// Action pour supprimer une facture
export const deleteInvoice = createAsyncThunk<string, { invoiceId: string, isInvoice: string}, { rejectValue: string }>(
    'invoices/deleteInvoice',
    async ({invoiceId, isInvoice}, { rejectWithValue }) => {
      try {
        const response = await deleteRequest(`invoices/${invoiceId}/${isInvoice}`); // Remplacez avec votre endpoint
        if (response.error) {

            const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
            
            return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue

            // return rejectWithValue(response.error);
        }
        console.log(response);
        
        return invoiceId; // Retourner l'ID de la facture supprimé
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);