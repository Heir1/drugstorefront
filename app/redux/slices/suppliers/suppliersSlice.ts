import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSuppliers } from './actions';
import ISupplier from '@/app/interfaces/supplier';


interface SuppliersState {
    suppliers: ISupplier[];
    currentSupplier: ISupplier | null;
    supplierStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    supplierError: string | null;
}
  
const initialState: SuppliersState = {
    suppliers: [],
    currentSupplier: null,
    supplierStatus : 'idle',
    supplierError: null,
};

const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les suppliers
        .addCase(fetchSuppliers.pending, (state) => {
          state.supplierStatus = 'loading';
        })
        .addCase(fetchSuppliers.fulfilled, (state, action: PayloadAction<ISupplier[]>) => {
          state.supplierStatus = 'succeeded';
          state.suppliers = action.payload;
        })
        .addCase(fetchSuppliers.rejected, (state, action) => {
          state.supplierStatus = 'failed';
          state.supplierError = action.error.message || 'Erreur inconnue';
        });
  
        // // Récupérer un packaging par ID
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
  
  export default suppliersSlice.reducer;
  