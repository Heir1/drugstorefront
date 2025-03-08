"use client"
import IArticle from "@/app/interfaces/article";
import { useRateService } from "@/app/redux/slices/rates/useRateService";

interface Articleprops {
    transactions: any;
    totalPurchase: number;
    totalSelling: number;
}

export default function Cash({transactions, totalPurchase, totalSelling}:Articleprops) {

    const { rates } = useRateService()
    const rate = rates[0]?.value

    function formatNumberWithSpaces(amount: number): string {
        // Utilise toLocaleString pour formatter le nombre avec espace comme séparateur
        return amount.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return (
        <div className=" space-y-2 pt-4 flex justify-center">
            <div className=" flex flex-col bg-white items-start w-[70%] py-3 px-2 " >
                <div className=" font-bold text-lg">
                    <h1>JOURNAL DE CAISSE</h1>
                </div>
                <div className="w-full" >

                    <div className="grid grid-cols-7 border-b-2 border-gray-700" >
                        <div className="w-full" >
                            <h1 className="font-bold text-red-800 " >DATE</h1>
                        </div>
                        <div className="w-full" >
                            <h1 className="font-bold text-red-800 ">TYPE OP</h1>
                        </div>
                        <div className="w-full" >
                            <h1 className="font-bold text-red-800 ">MONTANT</h1>
                        </div>
                        <div className="w-full col-span-2" >
                            <h1 className="font-bold text-red-800 ">DATE / HEURE</h1>
                        </div>
                        <div className="w-full" >
                            <h1 className="font-bold text-red-800 ">OPERATEUR</h1>
                        </div>
                    </div>

                    <div className=" py-4 border-b-2 border-black " >
                    </div>

                    <div className="grid grid-cols-7 pt-2 ">
                        <div>
                            <h1>18/02/2025</h1>
                        </div>
                        <div>
                            <h1 className="text-red-600" >GUICHET</h1>
                        </div>
                        <div>
                            <h1>RUTH</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 pt-2 ">
                        <div className=" col-start-2 col-span-6" >
                            <div className="grid grid-cols-6 border-b-2 border-black mb-2 pb-8 ">
                                <div>
                                    <h1>DEPENSE</h1>
                                </div>
                                <div>
                                    <h1>475 USD</h1>
                                </div>
                                <div className=" col-span-2 " >
                                    <h1>18/02/2025 20:42:08</h1>
                                </div>
                                <div>
                                    <h1>CHERUBIN</h1>
                                </div>
                                <div className="col-span-6 " >
                                    <p>STOCK - REGUL NON JUSTIFIE/FACT-840403</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-14 ">
                                <div className=" border-2 border-black " >
                                    <div className="grid grid-cols-2 ">

                                        <div className=" p-2 " >
                                            <div className=" flex justify-between " >
                                                <h1>Recette</h1>
                                                <span>(CDF)</span>
                                            </div>
                                            <div className=" flex justify-between " >
                                                <h1>Dépense</h1>
                                                <span>(CDF)</span>
                                            </div>
                                            <div className=" flex justify-between " >
                                                <h1>Recette</h1>
                                                <span>(CDF)</span>
                                            </div>
                                        </div>

                                        <div className=" flex flex-col justify-center items-end pr-4 " >
                                            <div>
                                                <h1>13.400</h1>
                                            </div>
                                            <div>
                                                <h1>13.400</h1>
                                            </div>
                                            <div>
                                                <h1>13.400</h1>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className=" border-2 border-black ">
                                    <div className="grid grid-cols-2 ">

                                        <div className=" p-2 " >
                                            <div className=" flex justify-between " >
                                                <h1>Recette</h1>
                                                <span>(USD)</span>
                                            </div>
                                            <div className=" flex justify-between " >
                                                <h1>Dépense</h1>
                                                <span>(USD)</span>
                                            </div>
                                            <div className=" flex justify-between " >
                                                <h1>Recette</h1>
                                                <span>(USD)</span>
                                            </div>
                                        </div>

                                        <div className=" flex flex-col justify-center items-end pr-4 " >
                                            <div>
                                                <h1>13.400</h1>
                                            </div>
                                            <div>
                                                <h1>13.400</h1>
                                            </div>
                                            <div>
                                                <h1>13.400</h1>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
