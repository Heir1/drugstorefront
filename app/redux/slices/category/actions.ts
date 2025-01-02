// app/slices/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiErrorResponse, deleteRequest, getRequest, postRequest, putRequest } from '@/app/helpers/api/verbes';
import ICategory from '@/app/interfaces/category';


// Action pour récupérer tous les categories
export const fetchCategories= createAsyncThunk<ICategory[]>(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {

      try {
        const response = await getRequest<ICategory[]>('categories'); // Remplacez avec votre endpoint
        if (response.error) {
          return rejectWithValue(response.error);
        }
        return response.data as ICategory[] ;
        
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);


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


// // Action pour créer un nouvel article
// export const createArticle = createAsyncThunk<IArticle, IArticle>(
//     'articles/createArticle',
//     async (newArticle: IArticle, { rejectWithValue }) => {
//       try {
//         const response = await postRequest<IArticle>('articles', newArticle); // Remplacez avec votre endpoint
//         if (response.error) {
//           return rejectWithValue(response.error);
//         }
//         return response.data as IArticle;
//       } catch (error: any) {
//         return rejectWithValue(error.message);
//       }
//     }
// );


// // Action pour mettre à jour un article
// export const updateArticle = createAsyncThunk<IArticle, { id: string; data: IArticle }, { rejectValue: string }>(
//     'articles/updateArticle',
//     async ({ id, data }, { rejectWithValue }) => {
//       try {
//         const response = await putRequest<IArticle>(`articles/${id}`, data); // Remplacez avec votre endpoint
//         if (response.error) {

//             const errorMessage = (response.error as ApiErrorResponse).message || 'Unknown error';
//             return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue

//             // return rejectWithValue(response.error);
//         }
//         return response.data as IArticle;
//       } catch (error: any) {
//         return rejectWithValue(error.message);
//       }
//     }
// );


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