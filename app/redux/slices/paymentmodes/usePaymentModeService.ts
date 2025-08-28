import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchPaymentModes } from "./actions";


export const usePaymentModeService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { paymentModes, paymentModeStatus, paymentModeError } = useSelector((state: RootState) => state.paymentmodes )

    useEffect(() => {
        dispatch(fetchPaymentModes())
    }, [dispatch])

    return { paymentModes, paymentModeStatus, paymentModeError  }

}