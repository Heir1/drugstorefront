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


const CellComponent = ({ row }: { row: any }) => {

    const articleRow = row.original

    const oldStock =  row.original.article?.quantity - row.original?.quantity;
    
  

    return (
        <>
            <div className="flex justify-start " >
            </div>
        </>
    );

}

export const ArticleApproColumns: ColumnDef<IMovement>[] = [

    {
        accessorKey: "article.placements",
        header: "LOC",
        cell: ({ row }: { row: any }) => {
            // Vérifie si article et placements existent avant d'y accéder
            const placements = row.original.article?.placements;
            return placements?.[0]?.name || "N/A";
        },
    },
    {
        accessorKey: "article.description",
        header: "Description",
        id: "article.description", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original.article?.description || "No Description",
    },
    // {
    //     accessorKey: "",
    //     header: "ANCIEN STOCK",
    //     cell: ({ row } : { row : any} ) => row.original.article?.quantity - row.original?.quantity || "No Quantity",
    // },

    {
        accessorKey: "article.quantity",
        header: "STOCK",
        id: "article.quantity",
        cell: ({ row } : { row : any} ) => row.original.article?.quantity || "No Quantity",
    },
    {
        accessorKey: "old_article_stock",
        header: "Ancien Stock",
        cell: ({ row } : { row : any} ) => row.original?.old_article_stock || "No Quantity",
    },

    {
        accessorKey: "quantity",
        header: "APPRO",
        cell: ({ row } : { row : any} ) => row.original?.quantity || "No Quantity",
    },
    {
        accessorKey: "article.purchase_price",
        header: "PA/USD",
        cell: ({ row } : { row : any} ) => row.original.article?.purchase_price || "No purchase_price",
    },

    {
        accessorKey: "article.selling_price",
        header: "PV/USD",
        cell: ({ row } : { row : any} ) => row.original.article?.selling_price || "No selling_price",
    },

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

    {
        accessorKey: "article.expiration_date",
        header: "PEREMPETION",
        cell: ({ row } : { row : any} ) => row.original.article?.expiration_date || "No purchase_price",
    },

    {
        accessorKey: "article.suppliers",
        header: "FOURNISSEUR",
        cell: ({ row }: { row: any }) => {
            // Vérifie si article et suppliers existent avant d'y accéder
            const suppliers = row.original.article?.suppliers;
            return suppliers?.[0]?.name || "N/A";
        },
    }
    



        
];