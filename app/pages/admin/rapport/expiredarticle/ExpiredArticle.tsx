"use client"
import { useExpirederticlesService } from "@/app/redux/slices/articles/useArticleService";
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";
import { DataTableLowStock } from "@/components/ui/DataTable/DataTableLowStock";
import Loading from '@/app/components/loading';
import PrintFile from "./printFile/PrintFile";
import { useRateService } from "@/app/redux/slices/rates/useRateService";

export default function ExpiredArticle() {

    const { allEpiredArticles , expired_status, expired_FetchError } = useExpirederticlesService("", "");

    const { rates } = useRateService()

    const rate = rates[0]?.value

    let totalPrices = { totalPurchasePrice: 0, totalSellingPrice: 0 };

    if (Array.isArray(allEpiredArticles) && allEpiredArticles.length > 0) {
        totalPrices = allEpiredArticles.reduce(
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
                <PrintFile articles={allEpiredArticles} totalPurchase={Number(totalPrices.totalPurchasePrice/rate)} totalSelling={Number(totalPrices.totalSellingPrice/rate)} />
            </div>

            <div className="block print:hidden">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 ">
                    <div className="col-start-2 border-2 rounded-lg shadow-md">
                        <div className="text-center font-bold text-sm text-white py-2 rounded-t-lg ">
                            <h1>ALERTE DE PEREMPTION</h1>
                        </div>
                    </div>
                </div>

                {
                    (expired_status == "loading" ) && <Loading />
                }
                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-[#7288a5d0] h-[500px] rounded-xl" >
                    <DataTableLowStock columns={LowStockColumns} data={allEpiredArticles} needFilter={false} paginate={true} title="expiredStock"/> lowstock
                </div>
            </div>
            
        </div>
  )
}
