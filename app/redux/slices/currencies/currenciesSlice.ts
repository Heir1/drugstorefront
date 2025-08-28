// app/slices/articlesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createArticle, deleteArticle, fetchArticles, getArticleById, updateArticle } from './actions';
import IArticle from '@/app/interfaces/article';
import ICurrency from '@/app/interfaces/currency';
import { fetchCurrencies } from './actions';
// ICurrency

interface CurrenciesState {
    currencies: ICurrency[];
    currentCurrency: ICurrency | null;
    currencyStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    currencyError: string | null;
}
  
const initialState: CurrenciesState = {
    currencies: [],
    currentCurrency: null,
    currencyStatus: 'idle',
    currencyError: null,
};

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les currencies
        .addCase(fetchCurrencies.pending, (state) => {
          state.currencyStatus = 'loading';
        })
        .addCase(fetchCurrencies.fulfilled, (state, action: PayloadAction<ICurrency[]>) => {
          state.currencyStatus = 'succeeded';
          state.currencies = action.payload;
        })
        .addCase(fetchCurrencies.rejected, (state, action) => {
          state.currencyStatus = 'failed';
          state.currencyError = action.error.message || 'Erreur inconnue';
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
  
  export default currenciesSlice.reducer;
  