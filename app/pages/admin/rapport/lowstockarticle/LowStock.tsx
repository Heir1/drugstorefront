"use client"
import { useLowStockArticleService } from "@/app/redux/slices/articles/useArticleService";
import { ArticleColumns } from "@/components/ui/DataTable/articles/ArticleColumns";
import { DataTable } from "@/components/ui/DataTable/DataTable";
import Loading from '@/app/components/loading';
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";
import { DataTableLowStock } from "@/components/ui/DataTable/DataTableLowStock";
import { useRateService } from "@/app/redux/slices/rates/useRateService";
import PrintFile from "./printFile/PrintFile";

export default function LowStock() {

    const { articles, articleStatus, error } = useLowStockArticleService();
    
    const { rates } = useRateService()
    const rate = rates[0]?.value

    return (
        <div>

            <div className="hidden print:block" >
                <PrintFile articles={articles} />
            </div>

            <div className="block print:hidden">

                {/* <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-2  ">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                    <div className="col-start-2 border-2 border-[#007A3D] rounded-lg shadow-md">
                        <div className="text-center font-bold text-sm text-white bg-[#007A3D] py-2 rounded-t-lg">
                            <h1>TAUX DE CHANGE : {rate}</h1>
                        </div>
                    </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 ">
                    <div className="col-start-2 border-2 rounded-lg shadow-md">
                        <div className="text-center font-bold text-sm text-gray-700 py-2 rounded-t-lg ">
                            <h1>RAPPORT DE REQUISITION</h1>
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