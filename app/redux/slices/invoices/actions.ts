// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import Iinvoice from '@/app/interfaces/invoice';

interface FetchInvoicesParams {
  paymentModeId: string;
  firstrange: string;
  secondrange: string;
}


// Action pour récupérer tous les invoices
export const fetchInvoices = createAsyncThunk<Iinvoice[], FetchInvoicesParams, { rejectValue: string }>(
    'invoices/fetchInvoices',
    async ({ paymentModeId, firstrange, secondrange }, { rejectWithValue }) => {

      try {
        const response = await getRequest<Iinvoice[]>(`/invoices/mode/${paymentModeId}/${firstrange}/${secondrange}`); // Remplacez avec votre endpoint
        if (response.error) {
          return rejectWithValue(response.error.message || 'An unknown error occurred');
        }
        console.log(response.data);
        return response.data as Iinvoice[] ;
        
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
          alert(response.error.message)
          return rejectWithValue(response.error);
        }
        alert("Facture avec succès")

        console.log(response);
        
        
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
      alert("Modification avec succès")
      console.log(response.data);
      return response.data as Iinvoice;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


// // Action pour supprimer un article
// export const deleteArticle = createAsyncThunk<string, string, { rejectValue: string }>(
//     'articles/deleteArticle',
//     async (articleId: string, { rejectWithValue }) => {
//       try {
//         const response = await deleteRequest(`articles/${articleId}`); // Remplacez avec votre endpoint
//         if (response.error) {

//             const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
            
//             return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue

//             // return rejectWithValue(response.error);
//         }
//         return articleId; // Retourner l'ID de l'article supprimé
//       } catch (error: any) {
//         return rejectWithValue(error.message);
//       }
//     }
// );