import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import { updateUser } from '@/app/redux/slices/users/actions';
import toast, { Toaster } from 'react-hot-toast';
import IUser from "@/app/interfaces/user";
import { useUserService } from "@/app/redux/slices/users/useUserService";
import TableLoading from '@/app/components/TableLoading';

// Schéma de validation Yup
const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    role: yup.string().required("Role is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .nullable()
        .notRequired(),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")
        .nullable()
        .notRequired(),
});

interface IFormInputs {
    username: string;
    role: string;
    password?: string | null | undefined;
    password_confirmation?: string | null | undefined;
}

export default function FormUserAutorisation() {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { users, userStatus } = useUserService();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setValue("username", user?.username);
        setValue("password", user?.password || null);
        setValue("password_confirmation", user?.password_confirmation || null);
        setValue("role", user?.role);
    };

    const handleUpdate = async (data: IFormInputs) => {

        console.log(data);

        const { username, password, password_confirmation, role } = data;

        const role1 = role == "admin" ? "user" : "admin"        

        const dataToUpdate = {
            username,
            password,
            password_confirmation,
            role : role1
        }

        const updateData = {
            ...dataToUpdate,
            password: data.password || undefined,
            password_confirmation: data.password_confirmation || undefined,
        };

        const updateUserPromise = dispatch(updateUser({ id: selectedUser?.id, ...updateData }))
        .unwrap()
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
            setSelectedUser(null);
            if (result.status === "fulfilled") {
                toast.success( role1 == "user" ? "Le droit d'administrateur vient d'etre rétiré de l'utilisateur" : "Le droit d'administrateur vient d'etre assigné à l'utilisateur" );
                reset();
            } else {
                toast.error(result.message);
            }
        });
        
    };

    return (
        <div>
            <Toaster />
            <div className="mx-7">
                <div className="overflow-x-auto pt-10 h-[calc(80vh)] border-2 border-white bg-[#7288a5d0]">
                    <form onSubmit={handleSubmit(handleUpdate)}  action="">
                        <div className="grid grid-cols-7">
                            <div className=" col-start-2 col-span-2 " >
                                <h1 className=" text-white font-bold uppercase " >Listes des utilisateurs</h1>
                            </div>
                            <div className=" col-start-5 ml-2 col-span-2 " >
                                <h1 className=" text-white font-bold uppercase " >Utilisateurs avec autorisations spéciales</h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-3">

                            <div className=" col-start-2  border-2 col-span-2 border-gray-400 p-2 " >
                                <div className=" h-full  overflow-y-scroll bg-gray-100 " >
                                    <table className="w-full uppercase border border-gray-300">
                                        <thead>
                                            <tr className="bg-white uppercase">
                                                <th className=" border border-gray-500 text-left pl-1 ">NOM COMPLET</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userStatus == 'loading' ? (
                                                    <TableLoading/>
                                                )
                                                :
                                                (
                                                    users
                                                    .filter((user: IUser) => user.role === "user") // Filtre les utilisateurs avec le rôle "admin"
                                                    .map((user: IUser) => (
                                                        <tr key={user.id} className={` border ${ selectedUser?.id == user?.id ? 'bg-blue-700 text-white ' : 'bg-gray-100' }  border-gray-500 hover:cursor-pointer `} onClick={() => handleEdit(user)}>
                                                            <td className="border border-gray-500 pl-1">{user.name}</td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>

                            <div className="border-2 border-gray-400">
                                <div className="max-w-full mx-auto p-6 bg-[#7288a5d0] shadow-lg rounded-lg space-y-4">
                                    <div className=" space-y-4 " >
                                        <div className=" w-full " >
                                            <button disabled={ selectedUser?.role == "admin" ? true : !selectedUser ? true :  false }  type="submit" className=" w-full  bg-gray-400   font-extrabold p-[4px] " >
                                                AJOUTER
                                            </button>
                                        </div>
                                        <div>
                                            <button disabled={ selectedUser?.role == "user" ? true : !selectedUser ? true : false } type="submit" className=" w-full  bg-gray-400 font-extrabold p-[4px]  ">
                                                RETIRER
                                            </button>
                                        </div>
                                    </div>
                                    <div className=" hidden col-span-3 space-y-3 py-2 px-3   " >
                                        <div className="w-full gap-4 ">
                                            <label className="block text-sm text-white uppercase font-extrabold ">IDENTIFIANT</label>
                                            <input autoComplete='none' type="text" {...register("username")} className={` ${errors.username && 'border-2 border-red-500 ' } pl-2  w-full `} />
                                        </div>
                                        <div className="gap-4 ">
                                            <label className="block text-sm text-white uppercase font-extrabold ">MOT DE PASSE</label>
                                            <input type="password" {...register("password")} className={` pl-2 w-full`} />
                                            {errors.password?.message}
                                        </div>
                                        <div className="gap-4 ">
                                            <label className="block text-sm text-white uppercase font-extrabold ">RESAISIR LE MOT DE PASSE</label>
                                            <input type="password" {...register("password_confirmation")} className={` pl-2 w-full `} />
                                            {errors.password_confirmation?.message}
                                        </div>
                                        <div className="gap-4 ">
                                            <label className="block text-sm text-white uppercase font-extrabold ">ROLE</label>
                                            <input type="text" {...register("role")} className={` pl-2 w-full `} />
                                            {errors.role?.message}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-span-2 border-2 border-gray-400 p-2 " >
                                <div className=" h-full  overflow-y-scroll bg-gray-100 " >
                                    <table className="w-full uppercase border border-gray-300">
                                        <thead>
                                            <tr className="bg-white uppercase">
                                                <th className=" border border-gray-500 text-left pl-1 ">NOM COMPLET</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userStatus == 'loading' ? (
                                                    <TableLoading/>
                                                )
                                                :
                                                (
                                                    users
                                                    .filter((user: IUser) => user.role === "admin") // Filtre les utilisateurs avec le rôle "admin"
                                                    .map((user: IUser) => (
                                                        <tr key={user.id} className={` border ${ selectedUser?.id == user?.id ? 'bg-blue-700 text-white ' : 'bg-gray-100' }  border-gray-500 hover:cursor-pointer `} onClick={() => handleEdit(user)}>
                                                            <td className="border border-gray-500 pl-1">{user.name}</td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>

                        </div>
                 
                    </form>
                </div>
            </div>
        </div>
    );
}