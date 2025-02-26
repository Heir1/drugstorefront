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
    
    const dispatch = useDispatch<AppDispatch>();

    const { users, userStatus, error } = useUserService();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            session_state: "active",
        },
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

    // const onSubmit = (data: IFormInputs) => {
    //     console.log("Form Submitted", data);
    //   };

    // }

    const handleCreate = async (data: IFormInputs) => {
        
        const createUserPromise = dispatch(createUser(data)).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Utilisateur créé avec succès !",
        }))
        .catch((err) => {
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la création.";
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
                            <p className="text-sm">L'utilisateur a été créé avec succès</p>
                        </div>
                    </div>
                ), { duration: 2000 });
                reset();
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
            }
        });

    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setValue("telephone", user?.telephone);
        setValue("name", user?.name);
        setValue("email", user?.email);
        setValue("address", user?.address);
        setValue("role", user?.role);
        setValue("username", user?.username);
        setValue("password", user?.password);
        setValue("password_confirmation", user?.password_confirmation);
    };

    const handleUpdate = async (data: IFormInputs) => {

        const updateUserPromise = dispatch(updateUser({ id:selectedUser?.id, ...data })).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Utilisateur modifié avec succès !",
        }))
        .catch((err) => {
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la création.";
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
                            <p className="text-sm">L'utilisateur a été modifié avec succès</p>
                        </div>
                    </div>
                ), { duration: 2000 });
                reset();
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
            }
        });

    };
    
    const handleDelete = async (id: string) => {

        const deleteUserPromise = dispatch(deleteUser(id)).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Utilisateur supprimé avec succès !",
        }))
        .catch((err) => {
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la création.";
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
                            <p className="text-sm">L'utilisateur a été supprimé avec succès</p>
                        </div>
                    </div>
                ), { duration: 2000 });
                reset();
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
            }
        });

        // try {
        //     const actionResult = await dispatch(deleteUser(id));
        //     unwrapResult(actionResult);
        //     // Actions à effectuer en cas de succès, par exemple, rediriger l'utilisateur
        // } catch (error) {
        //     // Gérer l'erreur ici
        //     console.error('Échec de la suppression de l\'utilisateur :', error);
        // }
    };


    return (
        <div>
            <div className=" block print:hidden mx-2 p-5 " >
                <div className="grid grid-cols-11">
                    <div className="col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                        <div className="grid grid-cols-5 place-content-center">
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isNewArticle && "bg-[#262B62] text-white uppercase" } `} onClick={ ()=> setActivation("new") } >
                                    <h1>Utilisateurs</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isUpdateArticle && "bg-[#262B62] text-white uppercase" } `} onClick={ ()=> setActivation("update") }>
                                    <h1>Mot de passe</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isStateArticle && "bg-[#262B62] text-white uppercase" } `} onClick={ ()=> setActivation("state") }>
                                    <h1>Autorisations</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg ${ isReportArticle && "bg-[#262B62] text-white uppercase" } `}>
                                    <h1>Rapport</h1>
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
