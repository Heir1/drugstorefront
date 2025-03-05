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


export const useLowStockArticleService = (selectedFirstrange:string, selectedSecondrange:string) => {

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

    const { articles, articleStatus, error } = useSelector((state: RootState) => state.articles )

    useEffect(() => {
        dispatch(fetchLowStockArticles({firstrange, secondrange}))
    }, [dispatch])

    return { articles , articleStatus, error }

}


export const useExpirederticlesService = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { 
        articles: allEpiredArticles, 
        articleStatus: expired_status, 
        error: expired_FetchError 
    } = useSelector((state: RootState) => state.articles);


    useEffect(() => {
        // articleStatus !== "succeeded" && dispatch(fetchArticles())
        dispatch(fetchExpirederticles())
    }, [dispatch])

    return { allEpiredArticles , expired_status, expired_FetchError }

}