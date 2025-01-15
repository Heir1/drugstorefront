"use client"
import React, { useState } from 'react'
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { ArticleColumns } from '@/components/ui/DataTable/articles/ArticleColumns';
import { useArticleService } from '@/app/redux/slices/articles/useArticleService';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { usePackagingService } from '@/app/redux/slices/packaging/usePackagingService';
import { useCategoryService } from '@/app/redux/slices/category/useCategoryService';
import { useCurrencyService } from '@/app/redux/slices/currencies/useCurrencyService';
import Link from 'next/link';
import { useSupplierService } from '@/app/redux/slices/suppliers/useSuppliseService';
import { useMoleculeService } from '@/app/redux/slices/molecules/useMoleculeService';
import { useIndicationService } from '@/app/redux/slices/indications/useIndicationService';
import { usePlacementService } from '@/app/redux/slices/placements/usePlacementService';
import Loading from '@/app/components/loading';
import { DataTableSupply } from '@/components/ui/DataTable/DataTableSupply';
import FormArticleAppro from '@/app/components/form/FormArticleAppro';
import { ArticleApproColumns } from '@/components/ui/DataTable/articles/ArticleApproColumns';
import { useMovementService } from '@/app/redux/slices/movements/useMovementService';
import FormArticleSale from '@/app/components/form/FormArticleSale';
import { useInvoiceService } from '@/app/redux/slices/invoices/useInvoiceService';
import { InvoiceColumns } from '@/components/ui/DataTable/invoices/InvoiceColumns';
import { useRateService } from '@/app/redux/slices/rates/useRateService';

interface IFormInputs {
    barcode: string;
    location: { value: string; label: string } | null;
    description: string;
    indication: { value: string; label: string } | null;
    molecule: { value: string; label: string } | null;
    packaging: { value: string; label: string } | null;
    category: { value: string; label: string } | null;
    supplier: { value: string; label: string } | null;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    purchase_price: number;
    selling_price: number;
}

export default function Sale() {

        const { articles, articleStatus, error } = useArticleService()  
        const { packagings, packagingStatus, packagingError } = usePackagingService()
        const { categories, categoryStatus, categoryError } = useCategoryService();
        const { suppliers, supplierStatus, supplierError } = useSupplierService();
        const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
        const { indications, indicationStatus, indicationError } = useIndicationService();
        const { placements, placementStatus, placementError } = usePlacementService();
        const { currencies, currencyStatus, currencyError } = useCurrencyService();
        const { movements, movementStatus, movementError } = useMovementService("","");
        const { invoices, invoiceStatus, invoiceError } = useInvoiceService();
    
        const [isNewArticle, setIsNewArticle] = useState(true);
        const [isUpdateArticle, setIsUpdateArticle] = useState(false);
        const [isStateArticle, setIsStateArticle] = useState(false);
        const [isExportArticle, setIsExportArticle] = useState(false);
        const [isReportArticle, setIsReportArticle] = useState(false);

        const { rates } = useRateService()

        const rate = rates[0]?.value
    
    
        const total = invoices.reduce((acc:any, invoice:any) => acc + invoice.subtotal, 0);
        
      
        const { control, register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
            defaultValues: {
                barcode : "",
                location : null,
                description : "",
                indication : null,
                molecule : null,
                packaging : null,
                category : null,
                supplier : null,
                expirationDate : "",
                alert : 0,
                currency : 1,
                quantity : 0,
                purchase_price : 0,
                selling_price : 0,
            }
        });
    
        const placementsFormated = placements.map((location) => ({
            value: location.id.toString(), // Convertir id en string
            label: location.name,
        }));
    
    
        const packagingsFormated = packagings.map((packaging) => ({
            value: packaging.id.toString(), // Convertir id en string
            label: packaging.name,
        }));
    
    
        const categoriesFormated = categories.map((category) => ({
            value: category.id.toString(), // Convertir id en string
            label: category.name,
        }));
    
        
        const suppliersFormated = suppliers.map((supplier) => ({
            value: supplier.id.toString(), // Convertir id en string
            label: supplier.name,
        }));
    
        const indicationsFormated = indications.map((indication) => ({
            value: indication.id.toString(), // Convertir id en string
            label: indication.name,
        }));
    
        const moleculeFormated = molecules.map((molecule) => ({
            value: molecule.id.toString(), // Convertir id en string
            label: molecule.name,
        }));
    
    
        const setActivation = (tab:string) => {
            if(tab == "new"){
                setIsNewArticle(true) 
                setIsUpdateArticle(false)
                setIsExportArticle(false)
                setIsReportArticle(false)
                setIsStateArticle(false) 
            }
            else if(tab == "update"){
                setIsNewArticle(false) 
                setIsUpdateArticle(true)
                setIsExportArticle(false)
                setIsReportArticle(false)
                setIsStateArticle(false) 
            }
            else if(tab == "state"){
                setIsNewArticle(false) 
                setIsUpdateArticle(false)
                setIsExportArticle(false)
                setIsReportArticle(false) 
                setIsStateArticle(true)
            }
        }

    return (
        <>

            {
                (articleStatus == "loading" ||  packagingStatus == "loading" || categoryStatus == "loading" || supplierStatus == "loading" || moleculeStatus == "loading" || indicationStatus == "loading" || placementStatus == "loading" || currencyStatus == "loading" || movementStatus == "loading" || invoiceStatus == "loading" ) && <Loading/>
            }

            <div className="mx-2 p-5 " >
                <div className="grid grid-cols-11">
                    <div className="col-start-4 col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                        <div className="grid grid-cols-5 place-content-center">
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isNewArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("new") } >
                                    <h1>Appro</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isUpdateArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("update") }>
                                    <h1>Liste Produits</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isStateArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("state") }>
                                    <h1>Liste Factures</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isReportArticle && "bg-[#262B62] text-white" } `}>
                                    <h1>Rapport</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {
                isNewArticle ? (
                    <div>
                         <FormArticleSale/>
                    </div>
                )
                :
                (
                    isUpdateArticle ? (
                        <div>

                            {
                                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white h-[500px] rounded-xl" >
                                    <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
                                </div>
                            }


                        </div>
                    )
                    :
                    (
                        isStateArticle ? (
                            <div>
                                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white rounded-xl" >
                                    <DataTableSupply columns={InvoiceColumns} data={invoices} needFilter={false} paginate={true} title="Invoice"/>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg shadow-lg">
                                    {/* Title Section */}
                                    <div className="col-span-3 text-center">
                                        <h1 className="text-lg font-bold text-gray-800">
                                            VENTE DU 19/12/2024 AU 19/12/2024
                                        </h1>
                                    </div>

                                    {/* Vente Details in CDF */}
                                    <div className="col-span-1 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                                        <h2 className="text-sm text-gray-500">VENTE</h2>
                                        <h1 className="text-lg font-bold text-green-600">{total} CDF</h1>
                                    </div>

                                    <div className="col-span-1 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                                        <h2 className="text-sm text-gray-500">REMISE</h2>
                                        <h1 className="text-lg font-bold text-yellow-500">{0} CDF</h1>
                                    </div>

                                    <div className="col-span-1 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                                        <h2 className="text-sm text-gray-500">SOLDE</h2>
                                        <h1 className="text-lg font-bold text-blue-600">{total} CDF</h1>
                                    </div>

                                    {/* Vente Details in USD */}
                                    <div className="col-span-1 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                                        <h2 className="text-sm text-gray-500">VENTE</h2>
                                        <h1 className="text-lg font-bold text-green-600">{(total/rate).toFixed(2)} USD</h1>
                                    </div>

                                    <div className="col-span-1 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                                        <h2 className="text-sm text-gray-500">REMISE</h2>
                                        <h1 className="text-lg font-bold text-yellow-500">{0} USD</h1>
                                    </div>

                                    <div className="col-span-1 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                                        <h2 className="text-sm text-gray-500">SOLDE</h2>
                                        <h1 className="text-lg font-bold text-blue-600">{(total/rate).toFixed(2)} USD</h1>
                                    </div>
                                    </div>

                                </div>
                            </div>
                        )
                        :
                        (
                            ""
                        )
                    )
                )

            }


        </>
    )

}
