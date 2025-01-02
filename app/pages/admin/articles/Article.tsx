"use client"
import React from 'react'
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

    return (
        <div className="mx-2 px-5 " >
            <div className="grid grid-cols-11">
                <div className="col-start-4 col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-3 px-2  ">
                    <div className="grid grid-cols-5">
                        <div className="flex justify-center items-center">
                            <h1>Nouveau</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <h1>Mise à jour</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <h1>Etat produit</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <h1>Import / Export</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <h1>Rapport</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
