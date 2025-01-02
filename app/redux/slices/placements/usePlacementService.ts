import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchPlacements } from "./actions";


export const usePlacementService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { placements, placementStatus, placementError } = useSelector((state: RootState) => state.placements )

    useEffect(() => {
        placementStatus !== "succeeded" && dispatch(fetchPlacements())
    }, [dispatch])

    return { placements, placementStatus, placementError }

}