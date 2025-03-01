// app/store/slices/transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from './actions';

import ITransaction from '@/app/interfaces/transaction';

interface TransactionsState {
    transactions: ITransaction[];
    currentTransaction: ITransaction | null;
    transactionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    transactionError: string | null;
}

const initialState: TransactionsState = {
    transactions: [],
    currentTransaction: null,
    transactionStatus: 'idle',
    transactionError: null,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.transactionStatus = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
                state.transactionStatus = 'succeeded';
                state.transactions = action.payload;
                console.log("DATA ", action.payload);
                
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.transactionStatus = 'failed';
                state.transactionError = action.error.message || 'Erreur inconnue';
            })
            .addCase(getTransactionById.pending, (state) => {
                state.transactionStatus = 'loading';
            })
            .addCase(getTransactionById.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                state.transactionStatus = 'succeeded';
                state.currentTransaction = action.payload;
            })
            .addCase(getTransactionById.rejected, (state, action) => {
                state.transactionStatus = 'failed';
                state.transactionError = typeof action.payload === 'string' ? action.payload : 'Erreur inconnue';
            })
            .addCase(createTransaction.pending, (state) => {
                state.transactionStatus = 'loading';
                state.transactionError = null;
            })
            .addCase(createTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                state.transactionStatus = 'succeeded';
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.transactionStatus = 'failed';
                state.transactionError = action.error.message || 'Échec de la création';
            })
            .addCase(updateTransaction.pending, (state) => {
                state.transactionStatus = 'loading';
            })
            .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                state.transactionStatus = 'succeeded';
                const updatedTransaction = action.payload;
                const index = state.transactions.findIndex((t) => t.id === updatedTransaction.id);
                if (index !== -1) {
                    state.transactions[index] = updatedTransaction;
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.transactionStatus = 'failed';
                state.transactionError = typeof action.payload === 'string' ? action.payload : 'Erreur inconnue';
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.transactionStatus = 'loading';
            })
            .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<number>) => {
                state.transactionStatus = 'succeeded';
                state.transactions = state.transactions.filter((t) => t.id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.transactionStatus = 'failed';
                state.transactionError = typeof action.payload === 'string' ? action.payload : 'Erreur de suppression';
            });
    },
});

export default transactionsSlice.reducer;