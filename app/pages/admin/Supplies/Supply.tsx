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
import { useMovementService, useMovementType } from '@/app/redux/slices/movements/useMovementService';
import { fetchMovements } from '@/app/redux/slices/movements/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IMovement from '@/app/interfaces/movement';
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

export default function Supply() {

    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { suppliers, supplierStatus, supplierError } = useSupplierService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { placements, placementStatus, placementError } = usePlacementService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();
    // const { movements, movementStatus, movementError } = useMovementType("2");
    const { movements, movementStatus, movementError } = useMovementService("","");
    const { rates } = useRateService()


    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);


    const totalMovement = movements?.reduce((acc: any, mouvement: any) => acc + (mouvement.quantity * mouvement.article.purchase_price), 0);




    console.log("APPRO ",movements);
    
  
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
                (articleStatus == "loading" ||  packagingStatus == "loading" || categoryStatus == "loading" || supplierStatus == "loading" || moleculeStatus == "loading" || indicationStatus == "loading" || placementStatus == "loading" || currencyStatus == "loading" || movementStatus == "loading" ) && <Loading/>
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
                                    <h1>Liste Appro</h1>
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
                         <FormArticleAppro/>
                        <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white h-[650px] rounded-xl" >
                            <DataTableSupply columns={ArticleApproColumns} data={movements} needFilter={false} paginate={true} title=""/>
                        </div>
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
                                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] h-[700px] bg-white rounded-xl" >
                                    <DataTableSupply columns={ArticleApproColumns} data={movements} needFilter={false} paginate={true} title="Movements"/>
                                    <div className=" flex mt-2 " >
                                        <div className=" w-1/2 text-center border-2 border-emerald-500 " >
                                            {(totalMovement/rates[0].value).toFixed(2)} USD
                                        </div>
                                        <div className=" w-1/2 text-center border-2 border-emerald-500 " >
                                            {totalMovement.toFixed(2)} CDF
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
