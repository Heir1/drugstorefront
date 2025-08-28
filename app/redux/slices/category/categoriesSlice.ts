// app/slices/articlesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createArticle, deleteArticle, fetchArticles, getArticleById, updateArticle } from './actions';
import { fetchCategories } from './actions';
import IArticle from '@/app/interfaces/article';
import ICategory from '@/app/interfaces/category';


interface CategoriesState {
    categories: ICategory[];
    currentCategory: ICategory | null;
    categoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    categoryError: string | null;
}
  
const initialState: CategoriesState = {
    categories: [],
    currentCategory: null,
    categoryStatus: 'idle',
    categoryError: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les categories
        .addCase(fetchCategories.pending, (state) => {
          state.categoryStatus = 'loading';
        })
        .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
          state.categoryStatus = 'succeeded';
          state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.categoryStatus = 'failed';
          state.categoryError = action.error.message || 'Erreur inconnue';
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
  
        // Créer un article
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
  
        // Mettre à jour un article
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
  
        // Supprimer un article
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
  
  export default categoriesSlice.reducer;
  