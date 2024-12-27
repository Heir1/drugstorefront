"use client";
import * as React from "react";
import {
  ColumnDef,
} from "@tanstack/react-table";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from '@iconify/react';
import { IArticle } from "@/app/interfaces/article";


const CellComponent = ({ row }: { row: any }) => {


    return (
        <div className="flex justify-around " >
            <div className="text-blue-800 py-1 px-4 rounded-lg bg-white " >Activer</div>
            <div className="bg-red-800 py-1 px-4 rounded-lg text-white ">Desactiver</div>
        </div>
    );

}

export const ArticleColumns: ColumnDef<IArticle>[] = [
    {
        accessorKey: "placement",
        header: "LOC",
        cell: ({ row } : { row : any} ) => (
            <div className="capitalize">{`${row.getValue("placement").name }` }</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "quantity",
        header: "QTE",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("quantity")}</div>
        ),
    },

    {
        accessorKey: "selling_price",
        header: "PV/USD",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("selling_price")}</div>
        ),
    },
    {
        accessorKey: "purchase_price",
        header: "PA/CDF",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("purchase_price")}</div>
        ),
    },

    {
        accessorKey: "expiration_date",
        header: "PEREMPETION",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("expiration_date")}</div>
        ),
    },

    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: CellComponent,
    }

        
];