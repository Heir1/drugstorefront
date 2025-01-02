// app/slices/articlesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createArticle, deleteArticle, fetchArticles, getArticleById, updateArticle } from './actions';
import IArticle from '@/app/interfaces/article';


interface ArticlesState {
    articles: IArticle[];
    currentArticle: IArticle | null;
    articleStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
  
const initialState: ArticlesState = {
    articles: [],
    currentArticle: null,
    articleStatus: 'idle',
    error: null,
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les articles
        .addCase(fetchArticles.pending, (state) => {
          state.articleStatus = 'loading';
        })
        .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
          state.articleStatus = 'succeeded';
          state.articles = action.payload;
        })
        .addCase(fetchArticles.rejected, (state, action) => {
          state.articleStatus = 'failed';
          state.error = action.error.message || 'Erreur inconnue';
        })
  
        // Récupérer un article par ID
        .addCase(getArticleById.pending, (state) => {
          state.articleStatus = 'loading';
        })
        .addCase(getArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
          state.articleStatus = 'succeeded';
          state.currentArticle = action.payload;
        })
        .addCase(getArticleById.rejected, (state, action) => {
          state.articleStatus = 'failed';
          state.error = action.payload || 'Erreur inconnue';
        })
  
        // Créer un article
        .addCase(createArticle.pending, (state) => {
          state.articleStatus = 'loading';
          state.error = null;
        })
        .addCase(createArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
          state.articleStatus = 'succeeded';
          state.articles.push(action.payload);
        })
        .addCase(createArticle.rejected, (state, action) => {
          state.articleStatus = 'failed';
          state.error = action.error.message || 'Échec de la création';
        })
  
        // Mettre à jour un article
        .addCase(updateArticle.pending, (state) => {
          state.articleStatus = 'loading';
        })
        .addCase(updateArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
          state.articleStatus = 'succeeded';
          const updatedArticle = action.payload;
          const index = state.articles.findIndex((article) => article.id === updatedArticle.id);
          if (index !== -1) {
            state.articles[index] = updatedArticle;
          }
        })
        .addCase(updateArticle.rejected, (state, action) => {
          state.articleStatus = 'failed';
          state.error = action.payload || 'Erreur de mise à jour';
        })
  
        // Supprimer un article
        .addCase(deleteArticle.pending, (state) => {
          state.articleStatus = 'loading';
        })
        .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<string>) => {
          state.articleStatus = 'succeeded';
          state.articles = state.articles.filter((article) => article.id !== action.payload);
        })
        .addCase(deleteArticle.rejected, (state, action) => {
          state.articleStatus = 'failed';
          state.error = action.payload || 'Erreur de suppression';
        });
    },
  });

  // Ajouter un sélecteur pour filtrer par ID
  export const selectArticleById = (state: { articles: ArticlesState }, articleId: string) => {
    return state.articles.articles.find((article) => article.id === articleId) || null;
  };
  
  export default articlesSlice.reducer;
  