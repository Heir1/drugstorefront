"use client"
import React, { useEffect, useState } from 'react'
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
import { createArticle, updateArticle } from '@/app/redux/slices/articles/actions';
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


interface IFormInputs {
    description : string,
    barcode: string;
    comment: string;
    packaging: { value: string; label: string } | null;
    category: { value: string; label: string } | null;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    purchase_price: number;
    selling_price: number;
  }

interface ArticleFormActivationprops {
    content: any;
    setActivationFormOpen: (value: boolean) => void; // Type for the function prop
}


export default function ArticleActivationForm({content, setActivationFormOpen}:ArticleFormActivationprops) {

    const { control,setValue, register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            description : "",
            quantity : 0,
            comment : "",
            barcode : "",
            packaging : null,
            category : null,
            expirationDate : "",
            alert : 0,
            currency : 1,
            purchase_price : 0,
            selling_price : 0,
        }
    });

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        
        if (content) {
            // alert("")
            
            setValue("description", content.description, { shouldValidate: true });
            setValue("quantity", content.quantity, { shouldValidate: true });
            setValue("comment", content.comment, { shouldValidate: true });

        }
    }, [content,setValue]);

    
    
        const onSubmit = async (data: IFormInputs) => {
    
            console.log(data);
            console.log(content);
            
            
      
          const { description, packaging, comment, category , alert, expirationDate, quantity, purchase_price, selling_price , currency  } = data
    
          
      
          const articleData:IArticle = {
            barcode: content.barcode,
            description ,
            quantity ,
            comment,
            is_active: !content.is_active,
            expiration_date: content.expiration_date,
            category_id: Number(content.category.id),
            packaging_id: Number(content.packaging.id),
            selling_price:  Number(content.selling_price),
            purchase_price: Number(content.purchase_price),
            alert : Number(alert),
            currency_id: Number(currency) 
          }

            try {
                await dispatch(updateArticle({ id : content.id, data : articleData}));
                setActivationFormOpen(false)
          
            } catch (err) {
                // Handle errors that happen outside the action (e.g., network failures)
                // setOpenForm(false);
                console.error(err);
                setActivationFormOpen(false)
            }
    
        };

        return (
            <>
                <div className="fixed z-40 left-0 top-0  w-full h-screen bg-[#00000040]" onClick={()=> setActivationFormOpen(false)}>
                </div>
                <div className=" fixed z-50 top-[15%] left-[35%] mx-5 "  >
                    <form onSubmit={handleSubmit(onSubmit)}>

                            <div className=" w-[150%]   bg-white p-10  rounded-xl space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                <div className="space-y-2" >
                                    <label className=" font-semibold text-sm" htmlFor="">Description</label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => <input readOnly className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                        rules={{ required: 'La description est requise' }}
                                    />
                                </div>
                                <div className="space-y-2" >
                                    <label className=" font-semibold text-sm" htmlFor="">Stock</label>
                                    <Controller
                                        name="quantity"
                                        control={control}
                                        render={({ field }) => <input readOnly className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="number" />}
                                        rules={{ required: 'La description est requise' }}
                                    />
                                </div>
                                <div className="space-y-2 mb-8 " >
                                    <label className=" font-semibold text-sm" htmlFor="">Commentaire</label>
                                    <Controller
                                        name="comment"
                                        control={control}
                                        render={({ field }) => <textarea className="w-full text-[12px] bg-[#F2F7FC] h-20 p-4 rounded-lg " {...field} />}
                                        rules={{ required: 'Le commentaire est requise' }}
                                    />
                                </div>
                                <div className=" flex justify-between gap-4 pt-4 " >
                                    <div className=" w-full " >
                                        <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " onClick={()=> setActivationFormOpen(false)}>Annuler</button>
                                    </div>
                                    <div className="w-full" >
                                        <button type="submit" className=" w-full text-center p-2 bg-[#28A745]  text-white transition duration-300 hover:bg-[#1E7E34]  rounded-lg  text-[14px]  " >Valider</button>
                                    </div>
                                </div>
                            </div>
  
                    </form>
                </div>
            </>
        )
    }
    
    {/* <div className="col-span-5 bg-white rounded-xl p-10 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
        <div className="grid grid-cols-2 gap-5 pt-8 ">
            <div className=" " >
                <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " onClick={()=> setActivationFormOpen(false)}>Annuler</button>
            </div>
            <div className="" >
                <button type="submit" className=" w-full text-center p-2 bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Modifier</button>
            </div>
        </div>
    </div> */}