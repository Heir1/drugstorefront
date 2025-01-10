import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchMovements, getMovementById, getMovementByType } from "./actions";


export const useMovementService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { movements, movementStatus , movementError } = useSelector((state: RootState) => state.movements )

    useEffect(() => {
        movementStatus !== "succeeded" && dispatch(fetchMovements())
    }, [dispatch])

    return { movements, movementStatus , movementError }

}

export const useMovementType = (type:string) => {
    

    const dispatch = useDispatch<AppDispatch>();

    const { movements, movementStatus , movementError } = useSelector((state: RootState) => state.movements )

    useEffect(() => {
        movementStatus !== "succeeded" && dispatch(getMovementByType(type))
    }, [dispatch])

    return { movements, movementStatus , movementError }

}