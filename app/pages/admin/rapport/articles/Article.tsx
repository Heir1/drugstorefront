"use client"
import { useArticleService } from "@/app/redux/slices/articles/useArticleService";
import { ArticleColumns } from "@/components/ui/DataTable/articles/ArticleColumns";
import { DataTable } from "@/components/ui/DataTable/DataTable";
import Loading from '@/app/components/loading';
import { DataTableStock } from "@/components/ui/DataTable/DataTableStock";
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";

export default function Article() {

    const { articles, articleStatus, error } = useArticleService();

    const totalPrices = articles.reduce(
        (totals, article) => {
          totals.totalPurchasePrice += article.purchase_price * article.quantity;
          totals.totalSellingPrice += article.selling_price * article.quantity;
          return totals;
        },
        { totalPurchasePrice: 0, totalSellingPrice: 0 }
    );


    return (
        <div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-2  ">
                <div className=" col-start-2   flex flex-col items-center space-y-2">
                    <div className="text-center font-bold text-xl text-white bg-[#007A3D] py-2 px-4 rounded-lg shadow-lg w-full">
                        <h1>ARSUE PHARMA</h1>
                    </div>
                    <div className="text-center text-sm text-gray-700 bg-white py-2 px-4 rounded-lg shadow-md w-full">
                        <h1>RCCM 17-A-00178/ IDN : 01-93-N17135U/ IMPORT: A1703348J</h1>
                        <h1>+243 997 845 319</h1>
                        <h1>suzanoah@yahoo.fr</h1>
                        <h1>AV/ DE LA FOIRE N°1. Q/SALONGO, C/LEMBA</h1>
                        <h1>KINSHASA</h1>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2 ">

                <div className="col-start-2 border-2 border-[#007A3D] rounded-lg shadow-md">
                    <div className="text-center font-bold text-sm text-white bg-[#007A3D] py-2 rounded-t-lg">
                        <h1>RAPPORT DE STOCK ACTUEL EN USD</h1>
                    </div>
                </div>
            </div>


            {
                (articleStatus == "loading" ) && <Loading />
            }

            <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white h-[500px] rounded-xl" >
                <DataTableStock columns={LowStockColumns} data={articles} needFilter={false} paginate={true} title=""/>
            </div>

            <div>
                <h1> {totalPrices.totalPurchasePrice} </h1>
            </div>

            <div>
                <h1> {totalPrices.totalSellingPrice} </h1>
            </div>

        </div>
    )

}
