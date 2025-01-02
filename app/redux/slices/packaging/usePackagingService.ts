import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchPackagings } from "./actions";


export const usePackagingService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { packagings, packagingStatus, packagingError } = useSelector((state: RootState) => state.packagings )

    useEffect(() => {
        packagingStatus !== "succeeded" && dispatch(fetchPackagings())
    }, [dispatch])

    return { packagings , packagingStatus, packagingError }

}