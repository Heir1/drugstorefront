import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRate from '@/app/interfaces/rate';
import { fetchRates, createRate, updateRate } from './actions';

interface RatesState {
    rates: IRate[];
    currentRate: IRate | null;
    rateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    rateError: string | null;
}

const initialState: RatesState = {
    rates: [],
    currentRate: null,
    rateStatus: 'idle',
    rateError: null,
};

const ratesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Récupérer tous les rates
            .addCase(fetchRates.pending, (state) => {
                state.rateStatus = 'loading';
            })
            .addCase(fetchRates.fulfilled, (state, action: PayloadAction<IRate[]>) => {
                state.rateStatus = 'succeeded';
                state.rates = action.payload;
                state.currentRate = action.payload.length > 0 ? action.payload[0] : null;
            })
            .addCase(fetchRates.rejected, (state, action) => {
                state.rateStatus = 'failed';
                state.rateError = action.error.message || 'Erreur inconnue';
            })

            // Créer un taux
            .addCase(createRate.pending, (state) => {
                state.rateStatus = 'loading';
            })
            .addCase(createRate.fulfilled, (state, action: PayloadAction<IRate>) => {
                state.rateStatus = 'succeeded';
                state.rates.push(action.payload);
                state.currentRate = action.payload;
            })
            .addCase(createRate.rejected, (state, action) => {
                state.rateStatus = 'failed';
                state.rateError = action.payload || 'Erreur lors de la création du taux';
            })

            // Mettre à jour un taux
            .addCase(updateRate.pending, (state) => {
                state.rateStatus = 'loading';
            })
            .addCase(updateRate.fulfilled, (state, action: PayloadAction<IRate>) => {
                state.rateStatus = 'succeeded';
                state.rates = state.rates.map(rate =>
                    rate.id === action.payload.id ? action.payload : rate
                );
                state.currentRate = action.payload;
            })
            .addCase(updateRate.rejected, (state, action) => {
                state.rateStatus = 'failed';
                state.rateError = action.payload || 'Erreur lors de la mise à jour du taux';
            });
    },
});

export default ratesSlice.reducer;