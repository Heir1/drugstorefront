"use client"

import { useMovementService } from '@/app/redux/slices/movements/useMovementService';
import { ArticleApproColumns } from '@/components/ui/DataTable/articles/ArticleApproColumns';
import { DataTableSupply } from '@/components/ui/DataTable/DataTableSupply';
import Link from 'next/link';
import React, { useState } from 'react';
import Loading from '@/app/components/loading';
import { useForm } from 'react-hook-form';
import { InvoiceColumns } from '@/components/ui/DataTable/invoices/InvoiceColumns';
import { useInvoiceService } from '@/app/redux/slices/invoices/useInvoiceService';
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import { DataTableStockSupply } from '@/components/ui/DataTable/DataTableStockSupply';
import { DataTableSaleRegul } from '@/components/ui/DataTable/DataTableSaleRegul';

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

export default function Regulation() {


        const { movements, movementStatus, movementError } = useMovementService("","");
    
        const [isNewArticle, setIsNewArticle] = useState(false);
        const [isUpdateArticle, setIsUpdateArticle] = useState(true);
        const [isStateArticle, setIsStateArticle] = useState(false);
        const [isExportArticle, setIsExportArticle] = useState(false);
        const [isReportArticle, setIsReportArticle] = useState(false);
        const { invoices, invoiceStatus, invoiceError } = useInvoiceService("","");


        console.log("INVOICES ",invoices);
        

        const { rates } = useRateService()

        const rate = rates[0]?.value
    
    
        const total = invoices.reduce((acc:any, invoice:any) => acc + invoice.subtotal, 0);
    
    
    
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
    movementStatus == "loading" && <Loading/>
    }

        <div>
            <div className="grid grid-cols-1 mt-11 ">
                <div className=" flex justify-center mx-6 font-bold items-center bg-blue-500 p-1 " >
                    REGULARISATION VENTE
                </div>
            </div>
            <div className="mx-6" >
                <div className="grid grid-cols-11">
                    <div className="col-span-11 bg-white py-1 px-1  ">
                        <div className="grid grid-cols-8 place-content-center">
                            <Link href={``}>
                                <div className={`flex justify-center font-bold items-center py-1 border-4 border-gray-400   ${ isUpdateArticle && "bg-gray-300 text-black" } `} onClick={ ()=> setActivation("update") }>
                                    <h1>VENTE</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center font-bold items-center py-1 border-4 border-gray-400   ${ isNewArticle && "bg-gray-300 text-black " } `} onClick={ ()=> setActivation("new") } >
                                    <h1>APPRO</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center font-bold items-center py-1 border-4 border-gray-400 `}>
                                    <h1>LISTE PRODUITS</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    {
        isNewArticle ? (
            <div className=" " >
                <DataTableStockSupply columns={ArticleApproColumns} data={movements} needFilter={false} paginate={false} title="Movements"/>
            </div>
        )
        :
        (
            isUpdateArticle ? (
                <div>
                    <DataTableSaleRegul columns={InvoiceColumns} data={invoices} needFilter={false} paginate={false} title="Invoice"/>
                </div>
            )
            :
            (
                <div></div>
            )
        )

    }


</>

  )
}

