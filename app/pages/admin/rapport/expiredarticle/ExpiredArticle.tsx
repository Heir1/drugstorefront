"use client"
import { useExpirederticlesService } from "@/app/redux/slices/articles/useArticleService";
import { LowStockColumns } from "@/components/ui/DataTable/articles/LowStockColumns";
import { DataTableLowStock } from "@/components/ui/DataTable/DataTableLowStock";
import Loading from '@/app/components/loading';
import PrintFile from "./printFile/PrintFile";
import { useRateService } from "@/app/redux/slices/rates/useRateService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store/store";
import { fetchExpirederticles } from "@/app/redux/slices/articles/actions";

export default function ExpiredArticle() {

    const { allEpiredArticles , expired_status, expired_FetchError } = useExpirederticlesService("", "");
    const [ startDate, setStartDate ] = useState<string>('');
    const [ endDate, setEndDate ] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

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

    const handleSubmitSearch = async (e: React.FormEvent) => {

        e.preventDefault(); // Empêcher le rechargement de la page
    
        try {
                dispatch(fetchExpirederticles({firstrange : startDate, secondrange : endDate}))
                .then((response) => {
                    console.log('Réponse reçue:', response.payload); // Log la réponse
                    window.print(); // Déclenche l'impression
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération des stocks:', error);
                });
    
        } catch (error) {
            console.error("Erreur lors de la récupération des stocks :", error);
        }
    
    };

  return (
    <div>

        <div className="hidden print:block" >
            <PrintFile articles={allEpiredArticles} totalPurchase={Number(totalPrices.totalPurchasePrice/rate)} totalSelling={Number(totalPrices.totalSellingPrice/rate)} />
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