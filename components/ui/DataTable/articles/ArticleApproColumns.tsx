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
import { useRateService } from "@/app/redux/slices/rates/useRateService";


const CellComponent = ({ row }: { row: any }) => {

    const articleRow = row.original

    const { rates , rateStatus, rateError } = useRateService();

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
        accessorKey: "created_at",
        header: "DATE D'ACHAT",
        cell: ({ row } : { row : any} ) => row.original.created_at.split("T")[0].split("-").reverse().join("-") ,
    },
    {
        accessorKey: "article.description",
        header: "PRODUIT",
        // id: "article.description", // Explicitly set the ID
        cell: ({ row } : { row : any} ) => row.original.article?.description || "No Description",
    },

    {
        accessorKey: "quantity",
        header: "QTE",
        cell: ({ row } : { row : any} ) => row.original?.quantity || 0,
    },

    {
        accessorKey: "article.purchase_price",
        header: "PA/CDF",
        cell: ({ row } : { row : any} ) => row.original.article?.purchase_price || "No purchase_price",
    },

    {
        header: "PV/USD",
        cell: ({ row }: { row: any }) => {
            const { rates } = useRateService();
            const rate = rates?.[0]?.value ?? 1; // Fallback to 1 if rates are unavailable
            return (
                <div className="capitalize">{(row.original.article?.selling_price / rate).toFixed(2)}</div>
            );
        },
    },

    {
        header: "PA/USD",
        cell: ({ row }: { row: any }) => {
            const { rates } = useRateService();
            const rate = rates?.[0]?.value ?? 1; // Fallback to 1 if rates are unavailable
            return (
                <div className="capitalize">{(row.original.article?.purchase_price / rate).toFixed(2)}</div>
            );
        },
    },

    {
        accessorKey: "article.suppliers",
        header: "FOURNISSEUR",
        // id: "article.suppliers", // Explicitly set the ID
        cell: ({ row }: { row: any }) => {
            // Vérifie si article et suppliers existent avant d'y accéder
            const suppliers = row.original.article?.suppliers;
            return suppliers?.[0]?.name || "N/A";
        },
    },

    {
        accessorKey: "created_by",
        header: "UTILISATEUR",
        cell: ({ row } : { row : any} ) => row.original.created_by,
    }
    



        
];