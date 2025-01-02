// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../slices/articles/articlesSlice'
import packagingsReducer from '../slices/packaging/packagingsSlice'
import categoriesReducer from '../slices/category/categoriesSlice'
import currenciesReducer from '../slices/currencies/currenciesSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer, // L'état des articles
    packagings: packagingsReducer,
    categories: categoriesReducer,
    currencies: currenciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
