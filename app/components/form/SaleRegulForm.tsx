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
import { useRateService } from '@/app/redux/slices/rates/useRateService';

interface IFormInputs {
    description : string;
    quantity : number;
    date : string;
    numfact : string;
    selling_price : number;
    selling_price1 : number;
    subtotal : number;
    subtotal1 : number;
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
            date : "",
            numfact : "",
            selling_price : 0,
            selling_price1 : 0,
            subtotal : 0,
            subtotal1 : 0
        }
    });

    const { rates } = useRateService()
    const rate = rates[0]?.value

    console.log('Article content ',content);

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
            setValue("date", String(content?.created_at).split("T")[0].split("-").reverse().join("-") , { shouldValidate: true });
            setValue("numfact", content?.invoices.invoice_number, { shouldValidate: true });
            setValue("selling_price", content?.unit_price, { shouldValidate: true });
            setValue("selling_price1", Number((Number(content?.unit_price)/rate).toFixed(3)) , { shouldValidate: true });
            setValue("subtotal", content?.subtotal, { shouldValidate: true });
            setValue("subtotal1", Number((Number(content?.subtotal)/rate).toFixed(3)) , { shouldValidate: true });

        }

    }, [content,setValue]);


    return (
        <>
            <div className=""  >
                <div className=" bg-[#7288a5fd] mx-8 border-2 border-white  ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" grid grid-cols-12 mx-4 gap-3 py-2 mt-2 " >

                            <div className=" col-span-8 " >

                                <div className=" w-full flex gap-4 items-center ">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">PRODUIT</label>
                                    </div>
                                    <div className=" w-full " >
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => <input readOnly className="w-full font-extrabold text-[14px] bg-[#4594ff] h-8 pl-4 uppercase " type="text" {...field} />}
                                            rules={{ required: 'La description est requise' }}
                                        />
                                    </div>
                                </div>

                                <div className=" w-full" >
                                    <div className="grid grid-cols-10 gap-2" >
                                        <div className=" col-span-2  " >
                                            <label className="text-[13px] font-extrabold "  htmlFor="">DATE</label>
                                        </div>
                                        <div className=" col-span-2 ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">N. FACTURE</label>
                                        </div>
                                        <div className=" col-span-2">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">TYPE VENTE</label>
                                        </div>
                                        <div className=" col-span-2 ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">QTE</label>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className=" w-full" >
                                    <div className="grid grid-cols-10 gap-2" >
                                        <div className=" col-span-2  " >
                                            <Controller
                                                name="date"
                                                control={control}
                                                render={({ field }) => <input readOnly className="w-full bg-transparent font-extrabold text-[14px] h-8 uppercase " type="text" {...field} />}
                                                rules={{ required: 'La description est requise' }}
                                            />
                                        </div>
                                        {/* numfact */}
                                        <div className=" col-span-2  ">
                                            <Controller
                                                name="numfact"
                                                control={control}
                                                render={({ field }) => <input readOnly className="w-full bg-transparent font-extrabold text-[14px] h-8 uppercase " type="text" {...field} />}
                                                rules={{ required: 'La description est requise' }}
                                            />
                                        </div>
                                        <div className=" col-span-2  ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">CASH</label>
                                        </div>
                                        <div className=" col-span-2  ">
                                            <Controller
                                                name="quantity"
                                                control={control}
                                                render={({ field }) => <input className="text-[13px] font-extrabold " {...field} type="number" />}
                                                rules={{ required: 'La description est requise' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className=" w-full" >
                                    <div className="grid grid-cols-10 gap-2 " >
                                        <div className=" col-span-2  " >
                                            <label className="text-[13px] font-extrabold "  htmlFor="">PU/USD</label>
                                        </div>
                                        <div className=" col-span-2  ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">PU/CDF</label>
                                        </div>
                                        <div className=" col-span-2  ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">PT/USD</label>
                                        </div>
                                        <div className=" col-span-2  ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">PT/CDF</label>
                                        </div>
                                        <div className=" col-span-2  ">
                                            <label className="text-[13px] font-extrabold "  htmlFor="">REMISE/CDF</label>
                                        </div>
                                    </div>
                                </div>

                                <div className=" w-full" > 
                                    <div className="grid grid-cols-10 gap-2" >
                                        <div className=" col-span-2  " >
                                            <Controller
                                                name="selling_price1"
                                                control={control}
                                                render={({ field }) => <input className="w-full text-[14px] font-extrabold bg-yellow-500 h-8" {...field} type="text" />}
                                                rules={{ required: 'La description est requise' }}
                                            />
                                        </div>
                                        <div className=" col-span-2  ">
                                            <Controller
                                                name="selling_price"
                                                control={control}
                                                render={({ field }) => <input className="w-full text-[14px] font-extrabold bg-green-700 h-8" {...field} type="text" />}
                                            />  
                                        </div>
                                        <div className=" col-span-2  ">
                                            <Controller
                                                name="subtotal1"
                                                control={control}
                                                render={({ field }) => <input className="w-full text-[14px] font-extrabold bg-yellow-500 h-8" {...field} type="text" />}
                                            /> 
                                        </div>
                                        <div className=" col-span-2  ">
                                            <Controller
                                                name="subtotal"
                                                control={control}
                                                render={({ field }) => <input className="w-full text-[14px] font-extrabold bg-green-700 h-8" {...field} type="text" />}
                                            /> 
                                        </div>
                                        <div className=" col-span-2  ">
                                            <input value="0" readOnly className="w-full font-extrabold text-[14px] bg-green-700 h-8 pl-4 uppercase " type="text" />
                                        </div>
                                    </div>
                                </div>

                                {/* <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" /> */}
                            </div>

                            <div className=" col-span-4 gap-4 flex items-center  " >
                                <div className=" w-[70%] flex flex-col space-y-2 gap-2 " >
                                    <label className="text-[13px] font-extrabold "  htmlFor="">COMMENTAIRE</label>
                                    <textarea className="w-full text-[14px] bg-[#F2F7FC] h-16 p-4 rounded-lg " />
                                </div>
                                <div className=" flex flex-col gap-2  w-[30%] " >
                                    {/* <button disabled={true} type="submit" className=" w-full  border-[1px] bg-[#D32F2F] text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 rounded-lg ">Annuler cet article</button>
                                    <button disabled={true} type="submit" className=" w-full text-center p-2 bg-[#28A745]  text-white transition duration-300  rounded-lg  text-[14px]  " >Annuler la facture</button> */}
                                    <button className=" w-full  border-[1px] hover:bg-[#D32F2F] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#D32F2F] rounded-lg " 
                                    // onClick={()=> setActivationFormOpen(false)}
                                    onClick={handleSubmit(() => onSubmitDelete(content.id))}
                                    >Supprimer l'article</button>
                                    <button type="submit" className=" w-full text-center p-2 bg-[#4594ff]  text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]" >Modifier cet article</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
