// app/store/actions/transactionActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest, postRequest, putRequest, deleteRequest } from '@/app/helpers/api/verbes';
import ITransaction from '@/app/interfaces/transaction';

// Définir un type pour les paramètres de la requête
interface FetchTransactionsParams {
    startDate?: string; // Date de début au format ISO (ex: "2023-10-01")
    endDate?: string;   // Date de fin au format ISO (ex: "2023-10-31")
    transactionType?: string;
    createdBy?: string;
}

// Modifier l'action pour accepter les paramètres de date
export const fetchTransactions = createAsyncThunk<ITransaction[], FetchTransactionsParams>(
    'transactions/fetchTransactions',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            // Faire la requête à l'API
            const response = await getRequest<ITransaction[]>(`cashjournal/filter-by-date/${startDate}/${endDate}`);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as ITransaction[];

        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur lors du chargement des transactions');
        }
    }
);

// Modifier l'action pour accepter les paramètres de date
export const fetchDetailedTransactions = createAsyncThunk<CreatedByTransactions[], FetchTransactionsParams>(
    'transactions/fetchDetailedTransactions',
    async ({ startDate, endDate, transactionType, createdBy }, { rejectWithValue }) => {
        try {
            // Faire la requête à l'API
            const response = await getRequest<CreatedByTransactions[]>(`cashjournal/detail-filter/${startDate}/${endDate}/${transactionType}/${createdBy}`);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            console.log(response.data)
            return response.data as CreatedByTransactions[];

        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur lors du chargement des transactions');
        }
    }
);

// Récupérer une transaction par ID
export const getTransactionById = createAsyncThunk<ITransaction, number>(
    'transactions/getTransactionById',
    async (transactionId, { rejectWithValue }) => {
        try {
            const response = await getRequest<ITransaction>(`cashjournal/${transactionId}`);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as ITransaction;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Transaction non trouvée');
        }
    }
);

// Créer une transaction
export const createTransaction = createAsyncThunk<ITransaction, ITransaction>(
    'transactions/createTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await postRequest<ITransaction>('cashjournal', transactionData);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as ITransaction;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Échec de la création');
        }
    }
);

// Mettre à jour une transaction
export const updateTransaction = createAsyncThunk<ITransaction, ITransaction>(
    'transactions/updateTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await putRequest<ITransaction>(`cashjournal/${transactionData.id}`, transactionData);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response.data as ITransaction;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur de mise à jour');
        }
    }
);

// Supprimer une transaction
export const deleteTransaction = createAsyncThunk<number, number>(
    'transactions/deleteTransaction',
    async (transactionId, { rejectWithValue }) => {
        try {
            const response = await deleteRequest(`cashjournal/${transactionId}`);
            if (response.error) {
                return rejectWithValue(response.error);
            }
            return transactionId; // Retourne l'ID pour le supprimer du store
        } catch (error: any) {
            return rejectWithValue(error.message || 'Erreur de suppression');
        }
    }
);