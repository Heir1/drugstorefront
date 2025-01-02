import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchSuppliers } from "./actions";


export const useSupplierService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { suppliers, supplierStatus , supplierError } = useSelector((state: RootState) => state.suppliers )

    useEffect(() => {
        supplierStatus !== "succeeded" && dispatch(fetchSuppliers())
    }, [dispatch])

    return { suppliers , supplierStatus, supplierError }

}