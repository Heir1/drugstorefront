import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIndications } from './actions';
import IIndication from '@/app/interfaces/indication';


interface IndicationsState {
    indications: IIndication[];
    currentIndication: IIndication | null;
    indicationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    indicationError: string | null;
}
  
const initialState: IndicationsState = {
    indications: [],
    currentIndication: null,
    indicationStatus: 'idle',
    indicationError: null,
};

const indicationsSlice = createSlice({
    name: 'indications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les indications
        .addCase(fetchIndications.pending, (state) => {
          state.indicationStatus = 'loading';
        })
        .addCase(fetchIndications.fulfilled, (state, action: PayloadAction<IIndication[]>) => {
          state.indicationStatus = 'succeeded';
          state.indications = action.payload;
        })
        .addCase(fetchIndications.rejected, (state, action) => {
          state.indicationStatus = 'failed';
          state.indicationError = action.error.message || 'Erreur inconnue';
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
  
  export default indicationsSlice.reducer;
  