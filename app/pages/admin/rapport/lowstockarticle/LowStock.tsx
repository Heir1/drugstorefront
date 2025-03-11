"use client"
import { useLowStockArticleService } from "@/app/redux/slices/articles/useArticleService";
import { ArticleColumns } from "@/components/ui/DataTable/articles/ArticleColumns";
import { DataTable } from "@/components/ui/DataTable/DataTable";
import Loading from '@/app/components/loading';
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";
import { DataTableLowStock } from "@/components/ui/DataTable/DataTableLowStock";
import { useRateService } from "@/app/redux/slices/rates/useRateService";
import PrintFile from "./printFile/PrintFile";
import { useState } from "react";
import { AppDispatch } from "@/app/redux/store/store";
import { useDispatch } from "react-redux";
import { fetchLowStockArticles } from "@/app/redux/slices/articles/actions";

export default function LowStock() {

    const { articles, articleStatus, error } = useLowStockArticleService("", "");
    
    const { rates } = useRateService()
    const rate = rates[0]?.value

    const [ startDate, setStartDate ] = useState<string>('');
    const [ endDate, setEndDate ] = useState<string>('');
    
    const dispatch = useDispatch<AppDispatch>();

        //   if(startDate && endDate){
        //     if(title == "lowstock"){
        //       dispatch(fetchLowStockArticles({firstrange : startDate, secondrange : endDate}))          
        //     }
        //     else if(title == "expiredStock"){
        //       dispatch(fetchExpirederticles({firstrange : startDate, secondrange : endDate}))
        //     }
        //   }

    const handleSubmitSearch = async (e: React.FormEvent) => {

        e.preventDefault(); // Empêcher le rechargement de la page

        try {
                // Dispatch l'action et utilise .then() pour logger la réponse
                dispatch(fetchLowStockArticles({firstrange : startDate, secondrange : endDate}))
                .then((response) => {
                    console.log('Réponse reçue:', response.payload); // Log la réponse
                    // console.log(transactions)
                    window.print(); // Déclenche l'impression
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des stocks:', error);
                });

        } catch (error) {
            // Gérer les erreurs si nécessaire
            console.error("Erreur lors de la récupération des transactions :", error);
        }

    };

    return (
        <div>

            <div className="hidden print:block" >
                {
                    articles && <PrintFile articles={articles} />
                }
            </div>

            <div className="block print:hidden">
                <div className=" ml-[23%] w-[54%] flex justify-center col-span-3 border-2 bg-gray-400  mx-7 mt-20  ">
                    <div className=' w-[98%] ' >
                        <form onSubmit={handleSubmitSearch}>
                            <div className="flex">
                                <div className="space-y-4 mt-2 w-full pb-2">
                                {/* Champ : Date de début */}
                                <div className="bg-[#7288a5d0] px-4 py-4 space-y-4 shadow-[0px_4px_8px_0px_#00000026] border-2 border-gray-300">
                                    <div>
                                    <h1 className="uppercase font-extrabold text-[12px]">Saisir date début :</h1>
                                    </div>
                                    <div>
                                    <input
                                        className="px-2 w-1/3"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>

                                {/* Champ : Date de fin */}
                                <div className="bg-[#7288a5d0] px-4 py-4 space-y-4 shadow-[0px_4px_8px_0px_#00000026] border-2 border-gray-300">
                                    <div>
                                    <h1 className="uppercase font-extrabold text-[12px]">Saisir date fin :</h1>
                                    </div>
                                    <div>
                                    <input
                                        className="px-2 w-1/3"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>

                                {/* Bouton de recherche */}
                                <div>
                                    <button
                                    type="submit"
                                    className="w-full font-extrabold border-2 border-gray-500 bg-slate-200 text-[14px] uppercase"
                                    >
                                    Recherche
                                    </button>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )

}