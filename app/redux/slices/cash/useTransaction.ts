import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchTransactions } from "./actions";


export const useTransactionService = (startDate:string, endDate:string) => {


    const dispatch = useDispatch<AppDispatch>();

    const { transactions, transactionStatus , transactionError } = useSelector((state: RootState) => state.transaction )

    useEffect(() => {
        dispatch(fetchTransactions({startDate, endDate}));
    }, [dispatch])

    return { transactions, transactionStatus , transactionError }

}