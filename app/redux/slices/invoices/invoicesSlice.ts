// app/slices/articlesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IArticle from '@/app/interfaces/article';
import { RootState } from '../../store/store'; // Importez le type RootState
import Iinvoice from '@/app/interfaces/invoice';
import { deleteInvoice, fetchInvoiceNumber, fetchInvoices, updateInvoice } from './actions';
import IInvoiceResponse from '@/app/interfaces/invoicenumber';


interface InvoicesState {
    invoices: Iinvoice[];
    invoiceNumber: IInvoiceResponse;
    currentInvoice: Iinvoice | null;
    invoiceStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    invoiceError: string | null;
}
  
const initialState: InvoicesState = {
    invoices: [],
    invoiceNumber: {success : false, message: "", data:"" },
    currentInvoice: null,
    invoiceStatus: 'idle',
    invoiceError: null,
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Récupérer tous les invoices
        .addCase(fetchInvoices.pending, (state) => {
          state.invoiceStatus = 'loading';
        })
        .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Iinvoice[]>) => {
          state.invoiceStatus = 'succeeded';
          state.invoices = action.payload;
        })
        .addCase(fetchInvoices.rejected, (state, action) => {
          state.invoiceStatus = 'failed';
          state.invoiceError = action.error.message || 'Erreur inconnue';
        })
        
        // Récupérer tous le invoice number
        .addCase(fetchInvoiceNumber.pending, (state) => {
          state.invoiceStatus = 'loading';
        })
        .addCase(fetchInvoiceNumber.fulfilled, (state, action: PayloadAction<IInvoiceResponse>) => {
          state.invoiceStatus = 'succeeded';
          state.invoiceNumber = action.payload;
        })
        .addCase(fetchInvoiceNumber.rejected, (state, action) => {
          state.invoiceStatus = 'failed';
          state.invoiceError = action.error.message || 'Erreur inconnue';
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
  
        // // Créer un article
        // .addCase(createArticle.pending, (state) => {
        //   state.articleStatus = 'loading';
        //   state.error = null;
        // })
        // .addCase(createArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
        //   state.articleStatus = 'succeeded';
        //   console.log(action.payload);
        //   state.articles.push(action.payload);
        // })
        // .addCase(createArticle.rejected, (state, action) => {
        //   state.articleStatus = 'failed';
        //   state.error = action.error.message || 'Échec de la création';
        // })
  
        // Mettre à jour un invoice
        .addCase(updateInvoice.pending, (state) => {
          state.invoiceStatus = 'loading';
        })
        .addCase(updateInvoice.fulfilled, (state, action: PayloadAction<Iinvoice>) => {
          state.invoiceStatus = 'succeeded';
          const updatedInvoice = action.payload;
          const index = state.invoices.findIndex((invoice) => invoice.id === updatedInvoice.id);
          if (index !== -1) {
            state.invoices[index] = updatedInvoice;
          }
        })
        .addCase(updateInvoice.rejected, (state, action) => {
          state.invoiceStatus = 'failed';
          state.invoiceError = action.payload || 'Erreur de mise à jour';
        })
  
        // Supprimer un article
        .addCase(deleteInvoice.pending, (state) => {
          state.invoiceStatus = 'loading';
        })
        .addCase(deleteInvoice.fulfilled, (state, action: PayloadAction<string>) => {
          state.invoiceStatus = 'succeeded';
          state.invoices = state.invoices.filter((invoice) => {
            const invoiceId = invoice.id ?? invoice.invoice_id; // Check for `id` or fallback to `invoice_id`
            return invoiceId !== Number(action.payload); // Compare against the payload
          });
        })
        .addCase(deleteInvoice.rejected, (state, action) => {
          state.invoiceStatus = 'failed';
          state.invoiceError = action.payload || 'Erreur de suppression';
        });
    },
  });


  export default invoicesSlice.reducer;
  