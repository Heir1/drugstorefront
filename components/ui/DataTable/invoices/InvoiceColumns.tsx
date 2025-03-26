"use client";
import * as React from "react";
import {
  ColumnDef,
} from "@tanstack/react-table";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from '@iconify/react';
import IArticle from "@/app/interfaces/article";
import FormArticleUpdate from "@/app/components/form/FormArticleUpdate";
import IMovement from "@/app/interfaces/movement";
import Iinvoice from "@/app/interfaces/invoice";


const CellComponent = ({ row }: { row: any }) => {

    const articleRow = row.original
    

    // const oldStock =  row.original.article?.quantity - row.original?.quantity;
    
  

    return (
        <>
            <div className="flex justify-start " >
            </div>
        </>
    );

}

export const InvoiceColumns: ColumnDef<Iinvoice>[] = [

    {
        accessorKey: "invoices.invoice_date",
        header: "DATE",
        cell: ({ row } : { row : any} ) => String(row.original?.invoices?.invoice_date).split(" ")[0].split("-").reverse().join("-") || "No Date",
    }, 

    {
        accessorKey: "articles.description",
        header: "DESCRIPTION",
        id: "articles.description", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original?.articles?.description || "N/A",
    },

    {
        accessorKey: "quantity",
        header: "QTE",
        cell: ({ row } : { row : any} ) => row.original?.quantity || "No Quantity",
    },

    {
        accessorKey: "unit_price",
        header: "P.V",
        cell: ({ row } : { row : any} ) => row.original?.unit_price || "No Price",
    },

    {
        accessorKey: "subtotal",
        header: "P.T",
        cell: ({ row } : { row : any} ) => row.original?.subtotal || "No Price",
    },

    {
        accessorKey: "invoices.invoice_number",
        header: "FACTURE",
        id: "invoices.invoice_number", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original?.invoices?.invoice_number || "N/A",
    },

    {
        accessorKey: "invoices.created_by",
        header: "UTILISATEUR",
        id: "invoices.created_by", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original?.invoices?.created_by || "N/A",
    },

        
];