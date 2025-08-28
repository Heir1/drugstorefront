import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchCategories } from "./actions";


export const useCategoryService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { categories, categoryStatus, categoryError } = useSelector((state: RootState) => state.categories )

    useEffect(() => {
        categoryStatus !== "succeeded" && dispatch(fetchCategories())
    }, [dispatch])

    return { categories , categoryStatus, categoryError }

}