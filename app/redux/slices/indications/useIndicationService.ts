import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchIndications } from "./actions";


export const useIndicationService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { indications, indicationStatus, indicationError } = useSelector((state: RootState) => state.indications )

    useEffect(() => {
        indicationStatus !== "succeeded" && dispatch(fetchIndications())
    }, [dispatch])

    return { indications , indicationStatus, indicationError }

}