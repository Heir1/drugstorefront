"use client"
import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { ArticleColumns } from '@/components/ui/DataTable/articles/ArticleColumns';
import { useArticleService } from '@/app/redux/slices/articles/useArticleService';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { usePackagingService } from '@/app/redux/slices/packaging/usePackagingService';
import { useCategoryService } from '@/app/redux/slices/category/useCategoryService';
import ICategory from '@/app/interfaces/category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IArticle from '@/app/interfaces/article';
import { createArticle } from '@/app/redux/slices/articles/actions';
import IPackaging from '@/app/interfaces/packaging';
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import { useCurrencyService } from '@/app/redux/slices/currencies/useCurrencyService';
import Link from 'next/link';
import MenuTab from '@/app/components/MenuTab';
import { OptionsOrGroups, GroupBase } from "react-select";
import { useSupplierService } from '@/app/redux/slices/suppliers/useSuppliseService';
import { useMoleculeService } from '@/app/redux/slices/molecules/useMoleculeService';
import { useIndicationService } from '@/app/redux/slices/indications/useIndicationService';
import { usePlacementService } from '@/app/redux/slices/placements/usePlacementService';
import Loading from '@/app/components/loading';
import dynamic from 'next/dynamic';
import { log } from 'console';
import FormArticleCreation from '@/app/components/form/FormArticleCreation';
import FormArticleUpdate from '@/app/components/form/FormArticleUpdate';
// Dynamically import React Select without SSR
const Select = dynamic(() => import('react-select'), { ssr: false });


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


export default function Article() {

    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { suppliers, supplierStatus, supplierError } = useSupplierService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { placements, placementStatus, placementError } = usePlacementService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();

    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);
  
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

    




    // const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    // const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    //     defaultValues: {
    //       currency: 'USD', // Valeur par défaut pour currency
    //     }
    //   });



  
    const dispatch = useDispatch<AppDispatch>();
  
  
    const onSubmit = async (data: IFormInputs) => {

        console.log(data);
        
  
      const { barcode, location, description, indication, molecule, packaging, category, supplier,alert, expirationDate, quantity, purchase_price, selling_price , currency  } = data

      
  
      const articleData:IArticle = {
        barcode: barcode,
        placements : [Number(location?.value)],
        description ,
        indications : [Number(indication?.value)],
        molecules : [Number(molecule?.value)],
        quantity : quantity ,
        expiration_date: expirationDate,
        category_id: Number(category?.value),
        suppliers : [Number(supplier?.value)],
        packaging_id: Number(packaging?.value),
        selling_price,
        purchase_price,
        alert : false,
        currency_id: Number(currency) 
      }

      console.log(articleData);
      
  
        try {
            await dispatch(createArticle(articleData));
      
        } catch (err) {
            // Handle errors that happen outside the action (e.g., network failures)
            // setOpenForm(false);
            console.error(err);
        }
  
    };


    // const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     console.log('Form Data:', data); // Affiche la devise choisie dans la console
    // };


    // const onSubmit = (data: FormValues) => {
    //     console.log('Form Data:', data); // Affiche les données du formulaire dans la console
    //   };

    const setActivation = (tab:string) => {
        if(tab == "new"){
            setIsNewArticle(true) 
            setIsUpdateArticle(false)
            setIsExportArticle(false)
            setIsReportArticle(false) 
        }
        else if(tab == "update"){
            setIsNewArticle(false) 
            setIsUpdateArticle(true)
            setIsExportArticle(false)
            setIsReportArticle(false) 
        }
    }

//   moleculeStatus == "loading" || indicationStatus == "loading" || placementStatus == "loading" || currencyStatus == "loading"

    return (
        <>

            {
                (articleStatus == "loading" ||  packagingStatus == "loading" || categoryStatus == "loading" || supplierStatus == "loading" || moleculeStatus == "loading" || indicationStatus == "loading" || placementStatus == "loading" || currencyStatus == "loading" ) && <Loading/>
            }

            <div className="mx-2 p-5 " >
                <div className="grid grid-cols-11">
                    <div className="col-start-4 col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                        <div className="grid grid-cols-5 place-content-center">
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isNewArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("new") } >
                                    <h1>Nouveau</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isUpdateArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("update") }>
                                    <h1>Mise à jour</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isStateArticle && "bg-[#262B62] text-white" } `}>
                                    <h1>Etat produit</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isExportArticle && "bg-[#262B62] text-white" } `}>
                                    <h1>Import / Export</h1>
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
                        <FormArticleCreation/>

                        <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white rounded-xl" >
                            <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={false} title=""/>
                        </div>
                    </div>
                )
                :
                (
                    isUpdateArticle ? (
                        <div>

                            {
                                articleStatus == "loading" ? 
                                    <div className="w-full flex justify-center mt-8">
                                        <div className="w-[8em] h-[8em] px-auto">
                                            <Icon icon="svg-spinners:90-ring-with-bg" className="text-[#597EEE] text-[3em]"/>
                                        </div>
                                    </div>
                                :

                                    <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white rounded-xl" >
                                        <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={false} title=""/>
                                    </div>
                            }

                                    <FormArticleUpdate/>

                        </div>
                    )
                    :
                    (
                        ""
                    )
                )

            }


        </>

    )

}

{/* <input
type="radio"
id={`${currency.name}`}
value={currency.id}
{...register('currency', { required: 'Vous devez choisir une devise' })}
/> */}
