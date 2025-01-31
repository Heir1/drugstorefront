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
import rateReducer from '../slices/rates/ratesSlice'
import paymentModeReducer from '../slices/paymentmodes/paymentmodesSlice'
import loginReducer from '../slices/login/loginSlice'
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Utilisation de sessionStorage

// Configuration de la persistance avec sessionStorage
const persistConfig = {
  key: "auth",
  // Assurez-vous que `storage` est toujours une valeur valide (par défaut à sessionStorage pour le client)
  storage: typeof window !== "undefined" ? storageSession : storageSession, // Toujours une valeur valide ici
  whitelist: ["user"],
};

// Appliquer redux-persist au slice login
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

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
    rates: rateReducer,
    paymentmodes: paymentModeReducer,
    login: persistedLoginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactiver la vérification de série pour redux-persist
  }),

});

// Permet de déclencher la persistance
export const persistor = typeof window !== "undefined" ? persistStore(store) : null;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
