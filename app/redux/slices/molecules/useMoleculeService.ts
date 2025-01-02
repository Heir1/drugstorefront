import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchMolecules } from "./actions";


export const useMoleculeService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { molecules, moleculeStatus, moleculeError } = useSelector((state: RootState) => state.molecules )

    useEffect(() => {
        moleculeStatus !== "succeeded" && dispatch(fetchMolecules())
    }, [dispatch])

    return { molecules , moleculeStatus, moleculeError }

}