import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMolecule from '@/app/interfaces/molecule';
import IPlacement from '@/app/interfaces/placement';
import { fetchPlacements } from './actions';


interface placementsState {
    placements: IPlacement[];
    currentPlacement: IPlacement | null;
    placementStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    placementError: string | null;
}
  
const initialState: placementsState = {
    placements: [],
    currentPlacement: null,
    placementStatus: 'idle',
    placementError: null,
};

const placementsSlice = createSlice({
    name: 'placements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les placements
        .addCase(fetchPlacements.pending, (state) => {
          state.placementStatus = 'loading';
        })
        .addCase(fetchPlacements.fulfilled, (state, action: PayloadAction<IPlacement[]>) => {
          state.placementStatus = 'succeeded';
          state.placements = action.payload;
        })
        .addCase(fetchPlacements.rejected, (state, action) => {
          state.placementStatus = 'failed';
          state.placementError = action.error.message || 'Erreur inconnue';
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
  
  export default placementsSlice.reducer;
  