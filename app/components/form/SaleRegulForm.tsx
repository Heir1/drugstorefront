"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import ICategory from '@/app/interfaces/category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IArticle from '@/app/interfaces/article';
import { createArticle, updateArticle } from '@/app/redux/slices/articles/actions';
import IMovement from '@/app/interfaces/movement';
import { deleteMovement, updateMovement } from '@/app/redux/slices/movements/actions';
import Iinvoice from '@/app/interfaces/invoice';
import { deleteInvoice, updateInvoice } from '@/app/redux/slices/invoices/actions';
import toast, { Toaster } from 'react-hot-toast'

interface IFormInputs {
    description : string;
    quantity : number
}

interface ArticleFormActivationprops {
    content: any;
    setIsSaleRegulFormOpen: (value: boolean) => void; // Type for the function prop
}

export default function SaleRegulForm({content, setIsSaleRegulFormOpen}:ArticleFormActivationprops) {

    const { control, setValue, register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            description : "",
            quantity : 0,
        }
    });

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: IFormInputs) => {

        console.log('Article id ',content.id);
        console.log('Invoice id ',content.invoice_id);

        const { quantity } = data;

        const invoiceLineData : Iinvoice = {
            id : content.id, 
            quantity,
            article_id : content.article_id
        }


        const updateInvoicePromise = dispatch(updateInvoice({ id: content.id, data: invoiceLineData }))
        .unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Facture mise à jour avec succès !",
        }))
        .catch((err) => {
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la mise à jour.";
            return {
            status: "rejected",
            message: errorMessage,
            };
        })
        .then((result) => {
            if (result.status === "fulfilled") {
            toast.custom((t:any) => (
                <div className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
                >
                    <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">✅</span>
                    <div className="flex-1 text-center">
                        <p className="text-sm">Facture mise à jour avec succès !</p>
                    </div>
                </div>
            ), { duration: 2000 });

            // Temporiser la fermeture du formulaire après l'affichage du toast
            setTimeout(() => {
                setIsSaleRegulFormOpen(false);
            }, 2500); // Attendre 2,5 secondes avant de fermer le formulaire

            } else {
                toast.custom((t:any) => (
                <div className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } flex items-center w-full max-w-xs p-4 text-white bg-red-600 border border-red-900 rounded-lg shadow-lg`}
                >
                    <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">❌</span>
                    <div className="flex-1 text-center">
                        <p className="text-sm">{result.message}</p>
                    </div>
                </div>
            ));
                // Fermer le formulaire même en cas d'erreur
                setIsSaleRegulFormOpen(false);
            }
        });

        
        // try {
        //         await dispatch(updateInvoice({ id : content.id, data : invoiceLineData}));
        //         setIsSaleRegulFormOpen(false);
        // } catch (err) {
        //     // Handle errors that happen outside the action (e.g., network failures)
        //     setIsSaleRegulFormOpen(false);
        //     console.error(err);
        // }


    };

    const onSubmitDelete =  async ( id:string ) => {

        const deleteInvoicePromise = dispatch(deleteInvoice(id))
        .unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Article supprimée avec succès !",
        }))
        .catch((err) => {
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la suppression.";
            return {
            status: "rejected",
            message: errorMessage,
            };
        })
        .then((result) => {
            if (result.status === "fulfilled") {
            toast.custom((t:any) => (
                <div className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
                >
                    <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">✅</span>
                    <div className="flex-1 text-center">
                        <p className="text-sm">{result.message}</p>
                    </div>
                </div>
            ), { duration: 2000 });

            // Temporiser la fermeture du formulaire après l'affichage du toast
            setTimeout(() => {
                setIsSaleRegulFormOpen(false);
            }, 2500); // Attendre 2,5 secondes avant de fermer le formulaire

            } else {
            toast.custom((t:any) => (
                <div className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } flex items-center w-full max-w-xs p-4 text-white bg-red-600 border border-red-900 rounded-lg shadow-lg`}
                >
                <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">❌</span>
                <div className="flex-1 text-center">
                    <p className="text-sm">{result.message}</p>
                </div>
                </div>
            ));

                // Fermer le formulaire même en cas d'erreur
                setIsSaleRegulFormOpen(false);
            }
        });


         
        // try {
        //     await dispatch(deleteInvoice(id));
        //     setIsSaleRegulFormOpen(false);
        // } catch (err) {
        //     // Handle errors that happen outside the action (e.g., network failures)
        //     setIsSaleRegulFormOpen(false);
        //     console.error(err);
        // }

    }

    useEffect(() => {
        
        if (content) {

            console.log(content);
            
            setValue("description", content.articles?.description, { shouldValidate: true });
            setValue("quantity", content?.quantity, { shouldValidate: true });

        }

    }, [content,setValue]);


    return (
        <>
            <div className="fixed z-40 left-0 top-0  w-full h-screen bg-[#00000040]" onClick={()=> setIsSaleRegulFormOpen(false)}>
            </div>

            <div className=" fixed z-50 top-[15%] left-[26%] mx-5 "  >
                <Toaster />
                <form onSubmit={handleSubmit(onSubmit)}>

                        <div className=" w-[150%]   bg-gray-600 p-10  rounded-xl space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
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
                                    render={({ field }) => <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="number" />}
                                    rules={{ required: 'La description est requise' }}
                                />
                            </div>


                            <div className=" flex justify-between gap-4 pt-4 " >
                                <div className=" w-full " >
                                    {/* <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " 
                                    // onClick={()=> setActivationFormOpen(false)}
                                    // onClick={handleSubmit(onSubmitDelete)}
                                    >Annulerr</button> */}
                                    <button className=" w-full  border-[1px] hover:bg-[#D32F2F] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#D32F2F] rounded-lg " 
                                    // onClick={()=> setActivationFormOpen(false)}
                                    onClick={handleSubmit(() => onSubmitDelete(content.id))}
                                    >Supprimer seulement cet article</button>
                                </div>
                                <div className="w-full" >
                                    <button type="submit" className=" w-full text-center p-2 bg-[#4594ff]  text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]" >Modifier cet article</button>
                                </div>
                            </div>

                            {/* <div className=" flex justify-between gap-4 pt-4 " >
                                <div className=" w-full " >
                                    <button className=" w-full  border-[1px] hover:bg-[#D32F2F] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#D32F2F] rounded-lg " 
                                    // onClick={()=> setActivationFormOpen(false)}
                                    onClick={handleSubmit(() => onSubmitDelete(content.invoice_id))}
                                    >Supprimer toute la facture</button>
                                </div>
                            </div> */}

                        </div>

                </form>
            </div>
        </>
    )
}
