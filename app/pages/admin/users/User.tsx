"use client"
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useUserService } from "@/app/redux/slices/users/useUserService";
import IUser from "@/app/interfaces/user";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import { createUser, deleteUser, updateUser } from '@/app/redux/slices/users/actions';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '@/app/components/loading';
import TableLoading from '@/app/components/TableLoading';
import FormUserCreation from '@/app/components/form/FormUserCreation';
import FormUserUpdate from '@/app/components/form/FormUserUpdate';
import FormUserAutorisation from '@/app/components/form/FormUserAutorisation';

const schema = yup.object().shape({
    // id: yup.string().required("ID is required"),
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    password_confirmation: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required("Confirm Password is required"),
    telephone: yup.string().matches(/^[0-9]+$/, "Phone number must be numeric").required("Phone is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    address: yup.string().required("Address is required"),
    role: yup.string().required("Role is required"),
    session_state: yup.string().oneOf(["active", "inactive"], "Session state is required").required("Session state is required"),
});


interface IFormInputs {
    name: string;
    username: string;
    password: string;
    password_confirmation: string;
    telephone: string;
    email: string;
    address: string;
    role: string;
    session_state: "active" | "inactive"; // Correction ici
}


export default function User() {


    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    
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
        <div>
            <div className=" block print:hidden mx-2 p-5 " >
                <div className="grid grid-cols-11">
                    <div className="col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                        <div className="grid grid-cols-4 place-content-center">
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 uppercase rounded-lg ${ isNewArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("new") } >
                                    <h1>Utilisateurs</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isUpdateArticle && "bg-[#262B62] text-white " } `} onClick={ ()=> setActivation("update") }>
                                    <h1>Mot de passe</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isStateArticle && "bg-[#262B62] text-white " } `} onClick={ ()=> setActivation("state") }>
                                    <h1>Autorisations</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" h-[80vh]" >
                {
                    isNewArticle ? (
                        <FormUserCreation/>
                    )
                    :
                    (
                        isUpdateArticle ? (
                            <FormUserUpdate/>
                        )
                        :
                        (
                            isStateArticle && (
                                <FormUserAutorisation/>
                            )
                        )
                    )
                }
            </div>
        </div>
    )

}
