// app/slices/articlesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IArticle from '@/app/interfaces/article';
import { RootState } from '../../store/store'; // Importez le type RootState
import Iinvoice from '@/app/interfaces/invoice';
import { fetchInvoices } from './actions';


interface InvoicesState {
    invoices: Iinvoice[];
    currentInvoice: Iinvoice | null;
    invoiceStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    invoiceError: string | null;
}
  
const initialState: InvoicesState = {
    invoices: [],
    currentInvoice: null,
    invoiceStatus: 'idle',
    invoiceError: null,
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les invoices
        .addCase(fetchInvoices.pending, (state) => {
          state.invoiceStatus = 'loading';
        })
        .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Iinvoice[]>) => {
          state.invoiceStatus = 'succeeded';
          state.invoices = action.payload;
        })
        .addCase(fetchInvoices.rejected, (state, action) => {
          state.invoiceStatus = 'failed';
          state.invoiceError = action.error.message || 'Erreur inconnue';
        })
  
        // Récupérer un article par ID
        // .addCase(getArticleById.pending, (state) => {
        //   state.articleStatus = 'loading';
        // })
        // .addCase(getArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
        //   state.articleStatus = 'succeeded';
        //   state.currentArticle = action.payload;
        // })
        // .addCase(getArticleById.rejected, (state, action) => {
        //   state.articleStatus = 'failed';
        //   state.error = action.payload || 'Erreur inconnue';
        // })
  
        // // Créer un article
        // .addCase(createArticle.pending, (state) => {
        //   state.articleStatus = 'loading';
        //   state.error = null;
        // })
        // .addCase(createArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
        //   state.articleStatus = 'succeeded';
        //   console.log(action.payload);
        //   state.articles.push(action.payload);
        // })
        // .addCase(createArticle.rejected, (state, action) => {
        //   state.articleStatus = 'failed';
        //   state.error = action.error.message || 'Échec de la création';
        // })
  
        // // Mettre à jour un article
        // .addCase(updateArticle.pending, (state) => {
        //   state.articleStatus = 'loading';
        // })
        // .addCase(updateArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
        //   state.articleStatus = 'succeeded';
        //   const updatedArticle = action.payload;
        //   const index = state.articles.findIndex((article) => article.id === updatedArticle.id);
        //   if (index !== -1) {
        //     state.articles[index] = updatedArticle;
        //   }
        // })
        // .addCase(updateArticle.rejected, (state, action) => {
        //   state.articleStatus = 'failed';
        //   state.error = action.payload || 'Erreur de mise à jour';
        // })
  
        // // Supprimer un article
        // .addCase(deleteArticle.pending, (state) => {
        //   state.articleStatus = 'loading';
        // })
        // .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<string>) => {
        //   state.articleStatus = 'succeeded';
        //   state.articles = state.articles.filter((article) => article.id !== action.payload);
        // })
        // .addCase(deleteArticle.rejected, (state, action) => {
        //   state.articleStatus = 'failed';
        //   state.error = action.payload || 'Erreur de suppression';
        // });
    },
  });


  export default invoicesSlice.reducer;
  