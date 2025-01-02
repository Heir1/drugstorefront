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


interface IFormInputs {
    barcode: string;
    location: string;
    description: string;
    indication: string;
    molecule: string;
    packaging: string;
    category: string;
    supplier: string;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    purchase_price: number;
    selling_price: number;
  }


//   type FormValues = {
//     currency: 'USD' | 'EUR'; // Champ de type devise avec deux choix possibles
//   };

export default function Article() {

    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();

    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);
  
    const { control, register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            barcode : "",
            location : "",
            description : "",
            indication : "",
            molecule : "",
            packaging : "",
            category : "",
            supplier : "",
            expirationDate : "",
            alert : 0,
            currency : 1,
            quantity : 0,
            purchase_price : 0,
            selling_price : 0,
        }
    });




    // const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    // const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    //     defaultValues: {
    //       currency: 'USD', // Valeur par défaut pour currency
    //     }
    //   });



  
    const dispatch = useDispatch<AppDispatch>();
  
  
    const onSubmit = async (data: IFormInputs) => {
  
      const { barcode, category, currency,  description, packaging, quantity, expirationDate, alert, purchase_price, selling_price  } = data

      
  
      const articleData:IArticle = {
        barcode: barcode,
        description ,
        quantity : quantity ,
        expiration_date: expirationDate,
        category_id: Number(category),
        packaging_id: Number(packaging),
        selling_price,
        purchase_price,
        alert : false,
        currency_id: Number(currency) 
      }

      console.log(articleData);
      
  
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

    return (
        <>
        
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
                                            />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Localisation</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Description</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Indication</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Molécule</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Emballage</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Catégorie</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 bg-white rounded-xl p-10 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Fournisseur</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Alerte</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Péremption</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg " type="date" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Quantité</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.A</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.V</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5 ">
                                        <div className=" flex justify-between items-end pb-3 " >
                                            <div className=" w-1/3 flex justify-between items-center" >
                                                <input
                                                    type="radio"
                                                />
                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                            </div>
                                            <div className=" w-1/3 flex justify-between items-center">
                                                <input
                                                    type="radio"
                                                />
                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                            </div>
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
                                            <button className=" w-full text-center p-2 bg-[#28A745] text-white transition duration-300 hover:bg-[#1E7E34]  rounded-lg  text-[14px]  " >Enregistrer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </form>

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

                            <div className="grid grid-cols-11   mx-2  my-2 gap-5 p-5  " >
                                <div className="col-span-6 bg-white p-10  rounded-xl space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm " htmlFor="">Code barre</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Localisation</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Description</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Indication</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Molécule</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Emballage</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Catégorie</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 bg-white rounded-xl p-10 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Fournisseur</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Alerte</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Péremption</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg " type="date" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">Quantité</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.A</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                        <div className="space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">P.V</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" type="number" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5 ">
                                        <div className=" flex justify-between items-end pb-3 " >
                                            <div className=" w-1/3 flex justify-between items-center" >
                                                <input
                                                    type="radio"
                                                />
                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                            </div>
                                            <div className=" w-1/3 flex justify-between items-center">
                                                <input
                                                    type="radio"
                                                />
                                                <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                            </div>
                                        </div>
                                        <div className=" col-span-2  space-y-2" >
                                            <label className=" font-semibold text-sm" htmlFor="">MBA</label>
                                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" value={1.25} type="number" name="" id="" readOnly/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5 pt-8 ">
                                        <div className=" " >
                                            <button className=" w-full  border-[1px] border-[#FE6212] text-center  text-[14px] p-2 text-[#FE6212] transition duration-300 rounded-lg hover:bg-[#FE6212] hover:text-white " >Annuler</button>
                                        </div>
                                        <div className="" >
                                            <button className=" w-full text-center p-2 transition duration-300 bg-[#4594FF] hover:bg-[#1A6BBF] text-white rounded-lg  text-[14px]  " >Modifier</button>
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
