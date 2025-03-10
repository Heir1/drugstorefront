"use client"
import IArticle from "@/app/interfaces/article";
import { useRateService } from "@/app/redux/slices/rates/useRateService";

interface Articleprops {
    transactiondetails: any;
    totalPurchase: number;
    totalSelling: number;
}

export default function Cash({transactiondetails, totalPurchase, totalSelling}:Articleprops) {

    const { rates } = useRateService()
    const rate = rates[0]?.value

    console.log(transactiondetails);
    

    function formatNumberWithSpaces(amount: number): string {
        // Utilise toLocaleString pour formatter le nombre avec espace comme séparateur
        return amount.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // Calculer les totaux pour CDF et USD
    const calculateTotals = (transactions: any[]) => {
        
        let totalIncomeCDF = 0;
        let totalExpenseCDF = 0;
        let totalIncomeUSD = 0;
        let totalExpenseUSD = 0;

        transactions.forEach((transaction) => {
            if (transaction.currency?.id === "1") { // CDF
                if (transaction.transaction_type === "income") {
                    totalIncomeCDF += transaction.amount;
                } else {
                    totalExpenseCDF += transaction.amount;
                }
            } else { // USD
                if (transaction.transaction_type === "income") {
                    totalIncomeUSD += transaction.amount;
                } else {
                    totalExpenseUSD += transaction.amount;
                }
            }
        });

        return {
            totalIncomeCDF,
            totalExpenseCDF,
            totalIncomeUSD,
            totalExpenseUSD,
        };
    };

    return (
        <div className=" space-y-2 pt-4 flex justify-center">
            <div className=" flex flex-col bg-white items-start w-[70%] py-3 px-2 " >
                <div className=" font-bold text-lg">
                    <h1>JOURNAL DE CAISSE</h1>
                </div>

                {
                    transactiondetails?.map((transaction:TransactionsByDate, index:number) => {

                        const { totalIncomeCDF, totalExpenseCDF, totalIncomeUSD, totalExpenseUSD } = calculateTotals(transaction.transactions);

                        return (
                            <div key={index}  className="w-full" >

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
                                        <h1>{transaction.date.split("-").reverse().join("-")}</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-red-600" >GUICHET</h1>
                                    </div>
                                    <div>
                                        <h1 className=" uppercase " >{transaction.name}</h1>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 pt-2 ">
                                    <div className=" col-start-2 col-span-6" >
                                        {
                                            transaction?.transactions?.map((transaction1:any, index1:number) => (
                                                <div key={index1} className="grid grid-cols-6 border-b-2 border-black mb-2 pb-8 ">
                                                    <div>
                                                        <h1 className="uppercase">{transaction1.transaction_type == "expense" ? "Dépense" : "Recette" } </h1>
                                                    </div>
                                                    <div>
                                                        <h1>{transaction1.amount} { transaction1.currency?.id == "1" ? "CDF" : "USD" } </h1>
                                                    </div>
                                                    <div className=" col-span-2 " >
                                                        <h1>{((transaction1.created_at.split(".")[0]).split("T")[0]).split("-").reverse().join("-")} {(transaction1.created_at.split(".")[0]).split("T")[1] }</h1>
                                                    </div>
                                                    <div>
                                                        <h1>{transaction.name}</h1>
                                                    </div>
                                                    <div className="col-span-6 " >
                                                        <p className="uppercase" >{transaction1.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                            
                                        }

                                    <div className="grid grid-cols-2 gap-14">
                                        {/* Colonne CDF */}
                                        <div className="border-2 border-black">
                                            <div className="grid grid-cols-2">
                                                <div className="p-2">
                                                    <div className="flex justify-between">
                                                        <h1 className="uppercase" >Recette</h1>
                                                        <span>(CDF)</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h1 className="uppercase" >Dépense</h1>
                                                        <span>(CDF)</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h1 className="uppercase" >Solde</h1>
                                                        <span>(CDF)</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-end pr-4">
                                                    <div>
                                                        <h1>{formatNumberWithSpaces(totalIncomeCDF + totalIncomeUSD*rate )}</h1>
                                                    </div>
                                                    <div>
                                                        <h1>{formatNumberWithSpaces(totalExpenseCDF + totalExpenseUSD*rate )}</h1>
                                                    </div>
                                                    <div>
                                                        <h1>{formatNumberWithSpaces( (totalIncomeCDF + totalIncomeUSD*rate ) -(totalExpenseCDF + totalExpenseUSD*rate) )}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Colonne USD */}
                                        <div className="border-2 border-black">
                                            <div className="grid grid-cols-2">
                                                <div className="p-2">
                                                    <div className="flex justify-between">
                                                        <h1 className="uppercase" >Recette</h1>
                                                        <span>(USD)</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h1 className="uppercase" >Dépense</h1>
                                                        <span>(USD)</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h1 className="uppercase" >Solde</h1>
                                                        <span>(USD)</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-end pr-4">
                                                    <div>
                                                        <h1>{formatNumberWithSpaces(totalIncomeUSD + (totalIncomeCDF/rate) )}</h1>
                                                    </div>
                                                    <div>
                                                        <h1>{formatNumberWithSpaces(totalExpenseUSD + (totalExpenseCDF/rate) )}</h1>
                                                    </div>
                                                    <div>
                                                        <h1>{formatNumberWithSpaces((totalIncomeUSD + (totalIncomeCDF/rate) - (totalExpenseUSD + (totalExpenseCDF/rate)) ) )}</h1>
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
                    )
                }


            </div>
        </div>
    )
}
