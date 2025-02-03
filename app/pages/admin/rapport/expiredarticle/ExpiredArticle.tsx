"use client"
import { useExpirederticlesService } from "@/app/redux/slices/articles/useArticleService";
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";
import { DataTableLowStock } from "@/components/ui/DataTable/DataTableLowStock";
import Loading from '@/app/components/loading';
import PrintFile from "./printFile/PrintFile";
import { useRateService } from "@/app/redux/slices/rates/useRateService";

export default function ExpiredArticle() {

    const { articles, articleStatus, error } = useExpirederticlesService();

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

  return (

        <div>

            <div className="hidden print:block" >
                <PrintFile articles={articles} totalPurchase={Number(totalPrices.totalPurchasePrice/rate)} totalSelling={Number(totalPrices.totalSellingPrice/rate)} />
            </div>

            <div className="block print:hidden">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 ">
                    <div className="col-start-2 border-2 rounded-lg shadow-md">
                        <div className="text-center font-bold text-sm text-gray-700 py-2 rounded-t-lg ">
                            <h1>ALERTE DE PEREMPTION</h1>
                        </div>
                    </div>
                </div>

                {
                    (articleStatus == "loading" ) && <Loading />
                }
                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white h-[500px] rounded-xl" >
                    <DataTableLowStock columns={LowStockColumns} data={articles} needFilter={false} paginate={true} title="lowstock"/>
                </div>
            </div>
            
        </div>
  )
}
