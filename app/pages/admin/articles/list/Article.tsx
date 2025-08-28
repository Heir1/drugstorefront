import { useArticleService } from '@/app/redux/slices/articles/useArticleService'
import { ArticleColumns } from '@/components/ui/DataTable/articles/ArticleColumns'
import { DataTable } from '@/components/ui/DataTable/DataTable'
import Loading from '@/app/components/loading';
import React from 'react'

export default function Article() {

    const { articles, articleStatus, error } = useArticleService() 

    return (
        <>
            {
                (articleStatus == "loading") && <Loading/>
            }
            <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white h-[500px] rounded-xl" >
                <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
            </div>
        </>
    )

}
