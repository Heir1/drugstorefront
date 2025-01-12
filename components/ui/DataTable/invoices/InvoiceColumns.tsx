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
        accessorKey: "invoices.invoice_number",
        header: "FACTURE",
        id: "invoices.invoice_number", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original?.invoices?.invoice_number || "N/A",
    },

    {
        accessorKey: "articles.description",
        header: "Produit",
        id: "articles.description", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original?.articles?.description || "N/A",
    },

    {
        accessorKey: "quantity",
        header: "QUANTITE",
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
        accessorKey: "invoices.invoice_date",
        header: "DATE",
        cell: ({ row } : { row : any} ) => row.original?.invoices?.invoice_date || "No Price",
    },


    // {
    //     accessorKey: "article.description",
    //     header: "Description",
    //     id: "article.description", // Explicitly set the ID
    //     cell: ({ row } : { row : any} ) => row.original.article?.description || "No Description",
    // },

    // {
    //     accessorKey: "old_article_stock",
    //     header: "Stock",
    //     cell: ({ row } : { row : any} ) => row.original?.old_article_stock || "No Quantity",
    // },

    // {
    //     accessorKey: "quantity",
    //     header: "APPRO",
    //     cell: ({ row } : { row : any} ) => row.original?.quantity || "No Quantity",
    // },

    // {
    //     accessorKey: "article.purchase_price",
    //     header: "PA/USD",
    //     cell: ({ row } : { row : any} ) => row.original.article?.purchase_price || "No purchase_price",
    // },

    // {
    //     accessorKey: "article.selling_price",
    //     header: "PV/USD",
    //     cell: ({ row } : { row : any} ) => row.original.article?.selling_price || "No selling_price",
    // },

    // {
    //     accessorKey: "article.purchase_price",
    //     header: "PA/CDF",
    //     cell: ({ row } : { row : any} ) => row.original.article?.purchase_price || "No purchase_price",
    // },


    // {
    //     // accessorKey: "purchase_price",
    //     header: "PA/CDF",
    //     cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("purchase_price")}</div>
    //     ),
    // },

    // {
    //     // accessorKey: "selling_price",
    //     header: "PV/CDF",
    //     cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("selling_price")}</div>
    //     ),
    // },

    // {
    //     accessorKey: "article.expiration_date",
    //     header: "PEREMPETION",
    //     cell: ({ row } : { row : any} ) => row.original.article?.expiration_date || "No purchase_price",
    // },

    // {
    //     accessorKey: "article.suppliers",
    //     header: "FOURNISSEUR",
    //     cell: ({ row }: { row: any }) => {
    //         // Vérifie si article et suppliers existent avant d'y accéder
    //         const suppliers = row.original.article?.suppliers;
    //         return suppliers?.[0]?.name || "N/A";
    //     },
    // }
    



        
];