import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchInvoices } from "./actions";


export const useInvoiceService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { invoices, invoiceStatus , invoiceError } = useSelector((state: RootState) => state.invoices )

    useEffect(() => {
        invoiceStatus !== "succeeded" && dispatch(fetchInvoices())
    }, [dispatch])

    return { invoices, invoiceStatus , invoiceError }

}