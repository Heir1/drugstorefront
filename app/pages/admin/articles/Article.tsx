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

  // Définir le type des options pour React Select
type OptionType = { value: string; label: string };

  // Définir le type des données du formulaire
type FormValues = {
    country: { value: string; label: string } | null;
  };

  const locations = [
    { id: 1, name: "France" },
    { id: 2, name: "USA" },
    { id: 3, name: "Canada" },
  ];
  
  // Transformation des données

  

//   type FormValues = {
//     currency: 'USD' | 'EUR'; // Champ de type devise avec deux choix possibles
//   };

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
        
  
    //   const { barcode, category, currency,  description, packaging, quantity, expirationDate, alert, purchase_price, selling_price  } = data

      
  
    //   const articleData:IArticle = {
    //     barcode: barcode,
    //     description ,
    //     quantity : quantity ,
    //     expiration_date: expirationDate,
    //     category_id: Number(category),
    //     packaging_id: Number(packaging),
    //     selling_price,
    //     purchase_price,
    //     alert : false,
    //     currency_id: Number(currency) 
    //   }

    //   console.log(articleData);
      
  
    //     try {
    //         await dispatch(createArticle(articleData));
      
    //     } catch (err) {
    //         // Handle errors that happen outside the action (e.g., network failures)
    //         // setOpenForm(false);
    //         console.error(err);
    //     }
  
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-11 mx-2  gap-x-5 p-5 -mt-5  " >
                                <div className="col-span-6 bg-white p-10  rounded-xl space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm " htmlFor="">Code barre</label>
                                            <Controller
                                                name="barcode"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" />}
                                                rules={{ required: 'Le code barre est requis' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Localisation</label>
                                            <Controller
                                                name="location"
                                                control={control}
                                                
                                                render={({ field }) => (
                                                <Select
                                                    id="location"
                                                    {...field}
                                                    options={placementsFormated}
                                                    placeholder="Sélectionnez la localisation du produit"
                                                    isClearable
                                                />
                                                )}
                                                rules={{ required: 'La localisation est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Description</label>
                                            <Controller
                                                name="description"
                                                control={control}
                                                render={({ field }) => <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                                rules={{ required: 'La description est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Indication</label>
                                            <Controller
                                                name="indication"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={indicationsFormated}
                                                        placeholder="Sélectionnez une indication"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'L indication est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Molécule</label>
                                            <Controller
                                                name="molecule"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={moleculeFormated}
                                                        placeholder="Sélectionnez un molécule"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'Le molécule est requis' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Emballage</label>
                                            <Controller
                                                name="packaging"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={packagingsFormated}
                                                        placeholder="Sélectionnez le type d'emballage "
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'L emballage est requis' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Catégorie</label>
                                            <Controller
                                                name="category"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={categoriesFormated}
                                                        placeholder="Sélectionnez une categprie"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'La catégorie est requise' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 bg-white rounded-xl p-10 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Fournisseur</label>
                                            <Controller
                                                name="supplier"
                                                control={control}
                                                
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={suppliersFormated}
                                                        placeholder="Sélectionnez un fournisseur"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'Le fournisseur est requis' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Alerte</label>
                                            <Controller
                                                name="alert"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'L alerte est requise' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Péremption</label>
                                            <Controller
                                                name="expirationDate"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg " {...field} type="date" />}
                                                rules={{ required: 'La date est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Quantité</label>
                                            <Controller
                                                name="quantity"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'La quantité est requise' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.A</label>
                                            <Controller
                                                name="purchase_price"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'Le prix dachat est requis' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.V</label>
                                            <Controller
                                                name="selling_price"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'Le prix de vente est requis' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5 ">
                                        <div className=" flex justify-between items-end pb-3 " >
  
                                                <Controller
                                                    name="currency"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <>
                                                            <div className=" w-1/3 flex justify-between items-center">
                                                                <input
                                                                    type="radio"
                                                                    id="USD"
                                                                    value={1}
                                                                    {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                                />
                                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                                            </div>
                                                            <div className=" w-1/3 flex justify-between items-center">
                                                                <input
                                                                    type="radio"
                                                                    id="CDF"
                                                                    value={2}
                                                                    {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                                />
                                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                                            </div>
                                                        </>
                                                    )}
                                                    rules={{ required: 'La monnaie est requise' }}
                                                />
                                        </div>
                                        <div className=" col-span-2  space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">TAUX MB</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" value={1.25} type="number" name="" id="" readOnly/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 pt-8 ">
                                        <div className=" " >
                                            <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " >Annuler</button>
                                        </div>
                                        <div className="" >
                                            <button type="submit" className=" w-full text-center p-2 bg-[#28A745] text-white transition duration-300 hover:bg-[#1E7E34]  rounded-lg  text-[14px]  " >Enregistrer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </form>


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

                            <div className="grid grid-cols-11 mx-2  gap-x-5 p-5 " >
                                <div className="col-span-6 bg-white p-10  rounded-xl space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm " htmlFor="">Code barre</label>
                                            <Controller
                                                name="barcode"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" />}
                                                rules={{ required: 'Le code barre est requis' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Localisation</label>
                                            <Controller
                                                name="location"
                                                control={control}
                                                
                                                render={({ field }) => (
                                                <Select
                                                    id="location"
                                                    {...field}
                                                    options={placementsFormated}
                                                    placeholder="Sélectionnez la localisation du produit"
                                                    isClearable
                                                />
                                                )}
                                                rules={{ required: 'La localisation est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Description</label>
                                            <Controller
                                                name="description"
                                                control={control}
                                                render={({ field }) => <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                                rules={{ required: 'La description est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Indication</label>
                                            <Controller
                                                name="indication"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={indicationsFormated}
                                                        placeholder="Sélectionnez une indication"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'L indication est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Molécule</label>
                                            <Controller
                                                name="molecule"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={moleculeFormated}
                                                        placeholder="Sélectionnez un molécule"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'Le molécule est requis' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Emballage</label>
                                            <Controller
                                                name="packaging"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={packagingsFormated}
                                                        placeholder="Sélectionnez le type d'emballage "
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'L emballage est requis' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Catégorie</label>
                                            <Controller
                                                name="category"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={categoriesFormated}
                                                        placeholder="Sélectionnez une categprie"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'La catégorie est requise' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 bg-white rounded-xl p-10 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Fournisseur</label>
                                            <Controller
                                                name="supplier"
                                                control={control}
                                                
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={suppliersFormated}
                                                        placeholder="Sélectionnez un fournisseur"
                                                        isClearable
                                                    />
                                                )}
                                                rules={{ required: 'Le fournisseur est requis' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Alerte</label>
                                            <Controller
                                                name="alert"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'L alerte est requise' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Péremption</label>
                                            <Controller
                                                name="expirationDate"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg " {...field} type="date" />}
                                                rules={{ required: 'La date est requise' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Quantité</label>
                                            <Controller
                                                name="quantity"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'La quantité est requise' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.A</label>
                                            <Controller
                                                name="purchase_price"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'Le prix dachat est requis' }}
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.V</label>
                                            <Controller
                                                name="selling_price"
                                                control={control}
                                                render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                rules={{ required: 'Le prix de vente est requis' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5 ">
                                        <div className=" flex justify-between items-end pb-3 " >
  
                                                <Controller
                                                    name="currency"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <>
                                                            <div className=" w-1/3 flex justify-between items-center">
                                                                <input
                                                                    type="radio"
                                                                    id="USD"
                                                                    value={1}
                                                                    {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                                />
                                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                                            </div>
                                                            <div className=" w-1/3 flex justify-between items-center">
                                                                <input
                                                                    type="radio"
                                                                    id="CDF"
                                                                    value={2}
                                                                    {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                                />
                                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                                            </div>
                                                        </>
                                                    )}
                                                    rules={{ required: 'La monnaie est requise' }}
                                                />
                                        </div>
                                        <div className=" col-span-2  space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">TAUX MB</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" value={1.25} type="number" name="" id="" readOnly/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 pt-8 ">
                                        <div className=" " >
                                            <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " >Annuler</button>
                                        </div>
                                        <div className="" >
                                            <button type="submit" className=" w-full text-center p-2 bg-[#28A745] text-white transition duration-300 hover:bg-[#1E7E34]  rounded-lg  text-[14px]  " >Enregistrer</button>
                                        </div>
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
