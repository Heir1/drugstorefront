// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../slices/articles/articlesSlice'
import packagingsReducer from '../slices/packaging/packagingsSlice'
import categoriesReducer from '../slices/category/categoriesSlice'
import currenciesReducer from '../slices/currencies/currenciesSlice'
import suppliersReducer from '../slices/suppliers/suppliersSlice'
import moleculesReducer from '../slices/molecules/moleculesSlice'
import indicationsReducer from '../slices/indications/indicationsSlice'
import placementsReducer from '../slices/placements/placementsSlice'
import movementsReducer from '../slices/movements/movementsSlice'
import invoicesReducer from '../slices/invoices/invoicesSlice'

const store = configureStore({
  reducer: {
    articles: articlesReducer, // L'état des articles
    packagings: packagingsReducer,
    categories: categoriesReducer,
    currencies: currenciesReducer,
    suppliers: suppliersReducer,
    molecules: moleculesReducer,
    indications: indicationsReducer,
    placements: placementsReducer,
    movements: movementsReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
