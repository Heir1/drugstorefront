import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchCurrencies } from "./actions";


export const useCurrencyService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { currencies, currencyStatus, currencyError } = useSelector((state: RootState) => state.currencies )

    useEffect(() => {
        currencyStatus !== "succeeded" && dispatch(fetchCurrencies())
    }, [dispatch])

    return { currencies , currencyStatus, currencyError }

}