import React, { useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserService } from "@/app/redux/slices/users/useUserService";
import IUser from "@/app/interfaces/user";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import { createUser, deleteUser, updateUser } from '@/app/redux/slices/users/actions';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '@/app/components/loading';
import * as yup from "yup";
import TableLoading from '@/app/components/TableLoading';

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

export default function FormUserCreation() {

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
    };

    return (
        <div>
            <div className=" mx-7" >
                <Toaster />
            {/* selectedUser ? handleUpdate :  */}
                <form onSubmit={handleSubmit(selectedUser ? handleUpdate : handleCreate)} className="max-w-full mx-auto p-6 bg-[#7288a5d0] shadow-lg rounded-lg space-y-4">

                    <div className=" grid grid-cols-12 gap-2 " >
                        <div className=" col-start-2 col-span-4 space-y-3 border-2 border-white py-2 px-3   " >
                            <div className=" flex items-center w-full gap-4 ">
                                <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">Name</label>
                                <input type="text" {...register("name")} className={` ${errors.name && 'border-2 border-red-500 ' }  w-full `} 
                                />
                            </div>
                            <div className=" flex items-center gap-4 ">
                                <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">telephone</label>
                                <input type="text" {...register("telephone")} className={` ${errors.telephone && 'border-2 border-red-500 ' } w-full`} />
                            </div>
                            <div className=" flex items-center gap-4 ">
                                <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">E-mail</label>
                                <input type="text" {...register("email")} className={` ${errors.email && 'border-2 border-red-500 ' } w-full`} />
                            </div>
                            <div className=" flex items-center gap-4 ">
                                <label className=" w-1/3 block text-sm text-white uppercase font-extrabold ">Adresse</label>
                                {/* <textarea {...register("address")} className={` ${errors.address && 'border-2 border-red-500 ' } w-full `} name="" id=""></textarea>
                                {errors?.address?.message} */}
                                <input type="text" {...register("address")} className={` ${errors.address && 'border-2 border-red-500 ' } w-full `}  />
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
                                <input type="text" {...register("username")} className={` ${errors.username && 'border-2 border-red-500 ' }  w-full `} />
                            </div>
                            <div className="gap-4 ">
                                <label className="block text-sm text-white uppercase font-extrabold ">MOT DE PASSE</label>
                                <input type="password" {...register("password")} className={` ${errors.password && 'border-2 border-red-500 ' } w-full`} />
                            </div>
                            <div className="gap-4 ">
                                <label className="block text-sm text-white uppercase font-extrabold ">RESAISIR LE MOT DE PASSE</label>
                                <input type="password" {...register("password_confirmation")} className={` ${errors.role && 'border-2 border-red-500 ' }  w-full `} />
                            </div>
                        </div>
                        <div className=" col-span-3 flex flex-col justify-center space-y-4 border-2 border-white py-2 px-3   " >
                            <div className="w-full flex justify-center">
                                <button type="submit" className=" w-1/2  bg-gray-400   font-extrabold p-[4px] " >
                                    NOUVEAU
                                </button>
                            </div>
                            <div  className="w-full flex justify-center">
                                <button type="submit" className=" w-1/2  bg-gray-400 font-extrabold p-[4px] ">
                                    MODIFIER
                                </button>
                            </div>
                            <div className="w-full flex justify-center">
                                <button onClick={ () => handleDelete(String(selectedUser?.id)) }   className=" w-1/2   bg-gray-400 font-extrabold p-[4px] ">
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

            <div className="p-4 mx-3">
                <div className="overflow-x-auto flex flex-col justify-between  h-[calc(100vh-28rem)] border-2 border-white bg-[#7288a5d0] ">
                    
                    <div className=" h-[calc(100vh-25rem)] border-2 border-green-700 overflow-y-scroll " >
                        <table className="w-full uppercase border border-gray-300">
                            <thead>
                            {/* bg-gray-700 */}
                                <tr className="bg-white uppercase">
                                    <th className=" border border-gray-500 text-left pl-1 ">NOM COMPLET</th>
                                    <th className=" border border-gray-500 text-left pl-1 ">IDENTIFIANT</th>
                                    <th className=" border border-gray-500 text-left pl-1 ">ROLE</th>
                                    <th className=" border border-gray-500 text-left pl-1 ">TELEPHONE</th>
                                    <th className=" border border-gray-500 text-left pl-1 ">E-MAIL</th>
                                    <th className=" border border-gray-500 text-left pl-1 ">ADRESSE PHYSIQUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userStatus == 'loading' ? (
                                        <TableLoading/>
                                    )
                                    :
                                    (
                                        users.map((user: IUser) => (
                                            <tr key={user.id} className={` border ${ selectedUser?.id == user?.id ? 'bg-blue-700 text-white ' : 'bg-gray-100' }  border-gray-500 hover:cursor-pointer `} onClick={()=> handleEdit(user)} >
                                                <td className="border border-gray-500 pl-1">{user.name}</td>
                                                <td className="border border-gray-500 pl-1">{user.username}</td>
                                                <td className="border border-gray-500 pl-1">{user.role}</td>
                                                <td className="border border-gray-500 pl-1">{user.telephone}</td>
                                                <td className="border border-gray-500 pl-1">{user.email}</td>
                                                <td className="border border-gray-500 pl-1">{user.address}</td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>

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
    )

}
