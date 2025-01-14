import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchRates } from "./actions";


export const useRateService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { rates, rateStatus, rateError } = useSelector((state: RootState) => state.rates )

    useEffect(() => {
        rateStatus !== "succeeded" && dispatch(fetchRates())
    }, [dispatch])

    return { rates , rateStatus, rateError }

}