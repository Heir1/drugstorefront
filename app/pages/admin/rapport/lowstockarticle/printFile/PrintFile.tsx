import IArticle from "@/app/interfaces/article";
import { useRateService } from "@/app/redux/slices/rates/useRateService";


interface Articleprops {
    articles: any;
}


export default function PrintFile({articles}:Articleprops) {

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
        <div className="flex flex-col items-center space-y-2 pt-4 ">
            <div className="text-center font-bold text-lg ">
                <h1>ARSUE PHARMA</h1>
            </div>
            <div className=" w-full px-4 " >
                <div className="text-center text-[12px] text-gray-700 font-semibold bg-white w-full border-b-2 border-gray-700 pb-4 ">
                    <h1>RCCM 17-A-00178/ IDN : 01-93-N17135U/ IMPORT: A1703348J</h1>
                    <h1>+243 997 845 319</h1>
                    <h1>suzanoah@yahoo.fr</h1>
                    <h1>AV/ DE LA FOIRE N°1. Q/SALONGO, C/LEMBA</h1>
                    <h1>KINSHASA</h1>
                </div>
            </div>
            <div className="w-full px-4" >
                <div className="grid grid-cols-5 border-b-2 border-gray-700 pb-2" >
                    <div className="w-full flex flex-col justify-center items-center" >
                        <h1>CATEGORIE PRODUIT</h1>
                        <h1>TOUS</h1>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center" >
                        <h1>TAUX DE CHANGE</h1>
                        <h1>{`${rate} CDF`}</h1>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center" >
                        <h1>Fournisseur</h1>
                        <h1>TOUS</h1>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center" >
                        <h1>Fournisseur</h1>
                        <h1>TOUS</h1>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center" >
                        <h1>Nbr Produit</h1>
                        <h1>{articles.length}</h1>
                    </div>
                </div>
            </div>
            <div className="w-full px-4" >
                <div className=" flex justify-center mt-2 " >
                    <h1 className="font-bold">RAPPORT DE REQUISITION</h1>
                </div>
                <div className="grid grid-cols-9 border-t-2 border-b-2 border-gray-700" >
                    <div className="w-full" >
                        <h1 className="font-bold" >LOC</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">PRODUIT</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">STOCK</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">SUPPORT</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">PA USD</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">PV CDF</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">PEREMPTION</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">ALERTE</h1>
                    </div>
                    <div className="w-full" >
                        <h1 className="font-bold">FOURNISSEUR</h1>
                    </div>
                </div>
                {
                    articles.map((article:IArticle) => (
                        <div key={article.id} className="grid grid-cols-9 border-b-[1px] border-gray-500" >
                            <div className="w-full" >
                                <h1 className=" text-[10px] uppercase " >{article.placements[0].name}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{article.description}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{article.quantity}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{article.packaging?.name}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{`${formatNumberWithSpaces(article.purchase_price/rate)}`}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{`${formatNumberWithSpaces(article.selling_price/rate)}`}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{article.expiration_date}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{String(article.alert)}</h1>
                            </div>
                            <div className="w-full" >
                                <h1 className="text-[10px] uppercase">{article.suppliers[0].name}</h1>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
