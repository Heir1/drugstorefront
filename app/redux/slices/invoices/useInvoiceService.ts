import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchInvoices } from "./actions";


export const useInvoiceService = (selectedFirstrange:string, selectedSecondrange:string) => {

    const today = new Date();
    const formattedDate:string = today.toISOString().split('T')[0];
    let firstrange:string, secondrange:string = "";

    if(selectedFirstrange && selectedSecondrange){
        firstrange = selectedFirstrange;
        secondrange = selectedSecondrange;
    }
    else{
        firstrange = formattedDate;
        secondrange = formattedDate;
    }



    const dispatch = useDispatch<AppDispatch>();

    const { invoices, invoiceStatus , invoiceError } = useSelector((state: RootState) => state.invoices )

    useEffect(() => {
        // invoiceStatus !== "succeeded" && dispatch(fetchInvoices())
        dispatch(fetchInvoices({ paymentModeId: "1", firstrange, secondrange }))
    }, [dispatch])

    return { invoices, invoiceStatus , invoiceError }

}