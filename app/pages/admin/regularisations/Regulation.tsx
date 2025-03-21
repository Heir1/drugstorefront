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
    
        const [isNewArticle, setIsNewArticle] = useState(true);
        const [isUpdateArticle, setIsUpdateArticle] = useState(false);
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

    <div className="mx-2 p-5 " >
        <div className="grid grid-cols-11">
            <div className="col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                <div className="grid grid-cols-4 place-content-center">
                    <Link href={``}>
                        <div className={`flex justify-center items-center py-2 rounded-lg ${ isNewArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("new") } >
                            <h1>APPRO</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className={`flex justify-center items-center py-2 rounded-lg ${ isUpdateArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("update") }>
                            <h1>VENTE</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className={`flex justify-center items-center py-2 rounded-lg ${ isStateArticle && "bg-[#262B62] text-white" } `}>
                        {/* onClick={ ()=> setActivation("state") } */}
                            <h1>LISTE PRODUITS</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className={`flex justify-center items-center py-2 rounded-lg ${ isReportArticle && "bg-[#262B62] text-white" } `}>
                            <h1>RAPPORT</h1>
                        </div>
                    </Link>
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

