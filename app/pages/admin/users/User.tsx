"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const schema = yup.object().shape({
    // id: yup.string().required("ID is required"),
    name: yup.string().required("Name is required"),
    usename: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
    phone: yup.string().matches(/^[0-9]+$/, "Phone number must be numeric").required("Phone is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    address: yup.string().required("Address is required"),
    role: yup.string().required("Role is required"),
    session_state: yup.string().oneOf(["active", "inactive"], "Session state is required").required("Session state is required"),
});


interface IFormInputs {
    name: string;
    usename: string;
    password: string;
    confirm_password: string;
    phone: string;
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

    const {
        register,
        handleSubmit,
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

    const onSubmit = (data: IFormInputs) => {
        console.log("Form Submitted", data);
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
                <div className=" mx-4" >
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-full mx-auto p-6 bg-[#7288a5d0] shadow-lg rounded-lg space-y-4">

                        <div className=" grid grid-cols-12 gap-2 " >
                            <div className=" col-start-2 col-span-4 space-y-3 border-2 border-white py-2 px-3   " >
                                <div className=" flex items-center w-full gap-4 ">
                                    <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">Name</label>
                                    <input type="text" {...register("name")} className={` ${errors.name && 'border-2 border-red-500 ' }  w-full `} />
                                </div>
                                <div className=" flex items-center gap-4 ">
                                    <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">telephone</label>
                                    <input type="text" {...register("phone")} className={` ${errors.phone && 'border-2 border-red-500 ' } w-full`} />
                                </div>
                                <div className=" flex items-center gap-4 ">
                                    <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">E-mail</label>
                                    <input type="text" {...register("email")} className={` ${errors.email && 'border-2 border-red-500 ' } w-full`} />
                                </div>
                                <div className=" flex items-center gap-4 ">
                                    <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">Adresse</label>
                                    <textarea {...register("address")} className={` ${errors.address && 'border-2 border-red-500 ' } w-full `} name="" id=""></textarea>
                                </div>
                                <div className=" flex items-center gap-4 ">
                                    <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">ROLE</label>
                                    <input type="text" {...register("role")} className={` ${errors.role && 'border-2 border-red-500 ' }  w-full `} />
                                </div>
                                <div className=" flex items-center " >
                                    <label className=" w-1/3 block text-sm text-white uppercase font-extrabold">Etat session</label>
                                    <div className="mt-1 space-x-4">
                                        <label className="uppercase font-extrabold text-white " ><input type="radio" value="active" {...register("session_state")} /> Actif</label>
                                        <label className="uppercase font-extrabold text-white " ><input type="radio" value="inactive" {...register("session_state")} /> Non Actif</label>
                                    </div>
                                    {errors.session_state && <p className="text-red-500 text-xs mt-1">{errors.session_state.message}</p>}
                                </div>
                            </div>
                            <div className=" col-span-3 space-y-3 border-2 border-white py-2 px-3   " >
                                <div className="w-full gap-4 ">
                                    <label className="block text-sm text-white uppercase font-extrabold ">IDENTIFIANT</label>
                                    <input type="text" {...register("usename")} className={` ${errors.usename && 'border-2 border-red-500 ' }  w-full `} />
                                </div>
                                <div className="gap-4 ">
                                    <label className="block text-sm text-white uppercase font-extrabold ">MOT DE PASSE</label>
                                    <input type="password" {...register("password")} className={` ${errors.password && 'border-2 border-red-500 ' } w-full`} />
                                </div>
                                <div className="gap-4 ">
                                    <label className="block text-sm text-white uppercase font-extrabold ">RESAISIR LE MOT DE PASSE</label>
                                    <input type="password" {...register("confirm_password")} className={` ${errors.role && 'border-2 border-red-500 ' }  w-full `} />
                                </div>
                            </div>
                            <div className=" col-span-3 flex flex-col justify-center space-y-4 border-2 border-white py-2 px-3   " >
                                <div className="w-full flex justify-center">
                                    <button className=" w-1/2  bg-gray-400   font-extrabold p-[4px] " >
                                        NOUVEAU
                                    </button>
                                </div>
                                <div  className="w-full flex justify-center">
                                    <button className=" w-1/2  bg-gray-400 font-extrabold p-[4px] ">
                                        MODIFIER
                                    </button>
                                </div>
                                <div className="w-full flex justify-center">
                                    <button className=" w-1/2   bg-gray-400 font-extrabold p-[4px] ">
                                        SUPPRIMER
                                    </button>
                                </div>
                                <div  className="w-full flex justify-center">
                                    <button className=" w-1/2  bg-gray-400 font-extrabold p-[4px]  ">
                                        ANNULER
                                    </button>
                                </div>
                            </div>
                        </div>
                    
                    </form>
                </div>

                <div className="p-4 ">
                    <div className="overflow-x-auto flex flex-col justify-between  h-[calc(100vh-28rem)] border-2 border-white bg-[#7288a5d0] ">
                        
                        <div className=" h-[calc(100vh-25rem)] border-2 border-green-700 overflow-y-scroll " >
                            <table className="w-full text-white uppercase border border-gray-300">
                                <thead>
                                {/* bg-gray-700 */}
                                    <tr className="bg-white text-white uppercase">
                                        <th className=" border border-gray-500 text-left pl-1 ">LOC</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Description</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">QTE</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Prix unitaire</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Prix total</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Emballage</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Molécule</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {cart.map((item, index) => (
                                        <tr key={index} className="bg-white border text-white uppercase border-gray-600">
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.location1}</td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.description}</td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.quantity1}</td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.purchase_price.toFixed(2)}</td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.prix_total.toFixed(2)}</td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.packaging?.label} </td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.molecule?.label}</td>
                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">
                                            <button onClick={() => removeItem(index)} className="bg-red-600 text-white uppercase px-2 py-1 rounded-lg">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))} */}
                                </tbody>

                                {/* <td className="px-4 py-2">{item.location?.label}</td>
                            <td className="px-4 py-2">{item.description}</td>
                            <td className="px-4 py-2">{item.quantity1}</td>
                            <td className="px-4 py-2">{item.selling_price.toFixed(2)}</td>
                            <td className="px-4 py-2">{item.prix_total.toFixed(2)}</td>
                            <td className="px-4 py-2">{item.packaging?.label}</td>
                            <td className="px-4 py-2">{item.molecule?.label}</td> */}
                                <tfoot>
                                    {/* <tr className="bg-gray-900 font-bold text-white uppercase">
                                    <td className="p-2 border border-gray-500" colSpan={2}>Total</td>
                                    <td className="p-2 border border-gray-500">{totalAmount} $</td>
                                    <td className="p-2 border border-gray-500">{totalAmount} $</td>
                                    <td className="p-2 border border-gray-500" colSpan={4}></td>
                                    </tr> */}
                                </tfoot>
                            </table>
                        </div>

                        <div className="px-4 bg-[#7288a5d0] shadow-lg">
                        {/* Header Section */}

                            <div className="grid grid-cols-9   ">
                                <div className="col-span-8  ">
                                    <h1 className="text-sm font-extrabold ">Total</h1>
                                </div>
                                <div className="col-span-1 text-left ">
                                    <h1 className="text-sm font-extrabold ">Différence</h1>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )

}
