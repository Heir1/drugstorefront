import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react";
import { fetchArticles, fetchExpirederticles, fetchLowStockArticles } from "./actions";


export const useArticleService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { articles, articleStatus, error } = useSelector((state: RootState) => state.articles )

    useEffect(() => {
        // articleStatus !== "succeeded" && dispatch(fetchArticles())
        dispatch(fetchArticles())
    }, [dispatch])

    return { articles , articleStatus, error }

}


export const useLowStockArticleService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { articles, articleStatus, error } = useSelector((state: RootState) => state.articles )

    useEffect(() => {
        // articleStatus !== "succeeded" && dispatch(fetchArticles())
        dispatch(fetchLowStockArticles())
    }, [dispatch])

    return { articles , articleStatus, error }

}


export const useExpirederticlesService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { articles, articleStatus, error } = useSelector((state: RootState) => state.articles )

    useEffect(() => {
        // articleStatus !== "succeeded" && dispatch(fetchArticles())
        dispatch(fetchExpirederticles())
    }, [dispatch])

    return { articles , articleStatus, error }

}