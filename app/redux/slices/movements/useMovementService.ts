import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchMovements, getMovementById, getMovementByType } from "./actions";


export const useMovementService = (selectedFirstrange:string, selectedSecondrange:string) => {

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

    const { movements, movementStatus , movementError } = useSelector((state: RootState) => state.movements )

    useEffect(() => {
        // movementStatus !== "succeeded" && dispatch(fetchMovements())
        dispatch(fetchMovements({ typeId: "1", firstrange, secondrange }))
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