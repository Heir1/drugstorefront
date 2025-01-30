"use client"
import { useArticleService } from "@/app/redux/slices/articles/useArticleService";
import { ArticleColumns } from "@/components/ui/DataTable/articles/ArticleColumns";
import { DataTable } from "@/components/ui/DataTable/DataTable";
import Loading from '@/app/components/loading';
import { DataTableStock } from "@/components/ui/DataTable/DataTableStock";
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";
import { useRateService } from "@/app/redux/slices/rates/useRateService";
import PrintFile from "./printFile/PrintFile";

export default function Article() {

    const { articles, articleStatus, error } = useArticleService();

    const { rates } = useRateService()

    const rate = rates[0]?.value

    let totalPrices = { totalPurchasePrice: 0, totalSellingPrice: 0 };

    if (Array.isArray(articles) && articles.length > 0) {
        totalPrices = articles.reduce(
            (totals, article) => {
                totals.totalPurchasePrice += article.purchase_price * article.quantity;
                totals.totalSellingPrice += article.selling_price * article.quantity;
                return totals;
            },
            { totalPurchasePrice: 0, totalSellingPrice: 0 }
        );
    }

    // const totalMovement = movements?.reduce((acc: any, mouvement: any) => acc + (mouvement.quantity * mouvement.article.purchase_price), 0);
    
    

    return (
        <>
            <div className="hidden print:block" >
                <PrintFile articles={articles} totalPurchase={Number(totalPrices.totalPurchasePrice/rate)} totalSelling={Number(totalPrices.totalSellingPrice/rate)} />
            </div>

            <div className="block print:hidden" >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 ">
                    <div className="col-start-2 border-2 rounded-lg shadow-md">
                        <div className="text-center font-bold text-sm text-gray-700 py-2 rounded-t-lg ">
                            <h1>RAPPORT DE STOCK ACTUEL</h1>
                        </div>
                    </div>
                </div>

                {
                    (articleStatus == "loading" ) && <Loading />
                }

                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white h-[500px] rounded-xl" >
                    <DataTableStock columns={LowStockColumns} data={articles} needFilter={false} paginate={true} title=""/>
                </div>


            </div>
        </>
    )

}
