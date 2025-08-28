"use client"
import React, { useState } from 'react'
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { logoutUser } from '../redux/slices/login/actions';
import Loading from '@/app/components/loading';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {

    const [ dateDropdown, setDataDropdown ] = useState(false);
    const { user, loading, error } = useSelector((state: RootState) => state.login);



    const userJSON = localStorage.getItem('user');

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();


    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            localStorage.removeItem('user');
            router.push('/'); // Redirection après logout
        } catch (error) {
            console.error("Erreur de déconnexion:", error);
        }
    };

        // useEffect(() => {
        //     if (!user) {
        //       router.push('/');
        //     }
        // }, [user, router]); // ✅ Déclenché uniquement quand `user` change


    if(userJSON){
        return (
            <>
                {
                    dateDropdown && 
                        <div onClick={() => setDataDropdown(!dateDropdown) } className='fixed top-0 left-0  w-full h-screen bg-transparent z-30 ' >
                        </div>
                }
    
                {
                    loading && <Loading/>
                }
                
                <div className="print:hidden grid grid-cols-12  mt-2 mx-2 h-10 my-2 gap-5 px-5 " >
                    <div className=" col-span-2 flex justify-center h-10  items-center shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9]  rounded-xl py-2  hover:cursor-pointer">
                        <Link href={`/pages/admin/dashboard`} >
                            <h1 className=" leading-[36px]  font-[700]  text-[18px] text-[#262B62]   " >Arsue Pharma </h1>
                        </Link>
                    </div>
    
                    <div className="col-span-10  h-10  shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9]  rounded-xl py-2 place-content-center ">
    
                        <div className="grid grid-cols-12" >
                            <div className=" col-span-8 " >
                                <div className="grid grid-cols-12  ">
                                    <div className=" flex justify-center items-center hover:cursor-pointer  col-span-2  space-x-2 " >
                                        <Icon icon="mynaui:file-solid" width="18" height="18" style={{color: '#000000'}} />
                                        <h1>Fichier</h1>
                                    </div>
                                    <div className=" relative   col-span-2 " >

                                        <div className="flex justify-center items-center hover:cursor-pointer" >
                                            
                                            <Icon icon="material-symbols:database" width="18" height="18"  />
                                            
                                            <DropdownMenu>
                                                
                                                <DropdownMenuTrigger asChild>
                                                    <h1 className=" ml-2 " >Données</h1>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className="w-56 ">

                                                    <DropdownMenuGroup>
                                                        <Link href={`/pages/admin/articles`}>
                                                            <DropdownMenuItem>
                                                                <span className=" text-sm " > Aricles</span>
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuSeparator />
                                                            <Link href={`/pages/admin/Supplies`} >
                                                                <DropdownMenuItem>
                                                                    <span className=" text-sm " > Stock</span>
                                                                </DropdownMenuItem>
                                                            </Link>
                                                        <DropdownMenuSeparator />
                                                            <Link className="flex items-center space-x-2" href={`/pages/admin/sales`}>
                                                                <DropdownMenuItem>
                                                                    <span className=" text-sm "> Ventes </span>
                                                                </DropdownMenuItem>
                                                            </Link>
                                                        <DropdownMenuSeparator />

                                                            <DropdownMenuItem>
                                                                <Link className="flex items-center space-x-2" href={``}>
                                                                    <span className=" text-sm "> Fournisseurs </span>
                                                                </Link>
                                                            </DropdownMenuItem>
                                                    
                                                    </DropdownMenuGroup>

                                                    <DropdownMenuSeparator />

                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </div>

                                    </div>
                                    <div className=" flex justify-center items-center  hover:cursor-pointer col-span-2 space-x-2" >
                                        <Icon icon="material-symbols:settings-rounded" width="18" height="18" style={{color: '#000000'}} />
                                        <div className="flex justify-center items-center hover:cursor-pointer" >
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <h1>Paramètres</h1>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuGroup>
                                                </DropdownMenuGroup> 
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>Compta</DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                        {/* /pages/admin/regularisations */}
                                                            <Link className="flex items-center space-x-2" href={`/pages/admin/regularisations/appro`}>
                                                                <DropdownMenuItem>
                                                                    <span className=" text-sm "> Regul Appro </span>
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <Link className="flex items-center space-x-2" href={`/pages/admin/regularisations/sale`}>
                                                                <DropdownMenuItem>
                                                                    <span className=" text-sm ">Regul Vente</span>
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <Link className="flex items-center space-x-2" href={`/pages/admin/cash/regul`}>
                                                                <DropdownMenuItem>
                                                                    <span className=" text-sm ">Regul Caisse Admin</span>
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>Comptes clients</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Link className="flex items-center space-x-2" href={`/pages/admin/cash`}>
                                                                    <DropdownMenuItem>
                                                                        <span className=" text-sm ">Caisse Admin</span>
                                                                    </DropdownMenuItem>
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>Import / Export</DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>Système</DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem>Configuration générale</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <Link className="flex items-center space-x-2" href={`/pages/admin/formrate`}>
                                                                <DropdownMenuItem>Taux de change</DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuSeparator />
                                                            <Link className="flex items-center space-x-2" href={`/pages/admin/users`}>
                                                                <DropdownMenuItem>Utilisateurs</DropdownMenuItem>
                                                            </Link>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>

                                                <DropdownMenuSeparator />
                                                </DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    Mot de passe
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>Options</DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>

                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <div >
                                        <Link href={`/pages/admin/report`} className=" flex justify-center items-center hover:cursor-pointer  col-span-2 space-x-2">
                                            <Icon icon="lsicon:report-filled" width="18" height="18" style={{color: '#FE6212'}} />
                                            <h1 className=" text-[#FE6212] " >Rapports</h1>
                                        </Link>
                                    </div>
                                    <div className=" flex justify-center items-center hover:cursor-pointer  col-span-2 space-x-2" >
                                        <Icon icon="material-symbols:help-outline-rounded" width="18" height="18" style={{color: '#000000'}} />
                                        <h1>Aide</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="grid grid-cols-12">
                                    <div className=" flex items-center justify-end col-span-5" >
                                        <h1>Date : 12/12/2025</h1>
                                    </div>
                                    <div className="col-span-2 flex justify-center " >
                                        <div className= " h-8 border-[1px] border-[#262B6280]  " ></div>
                                    </div>
                                    <div onClick={handleLogout} className=" flex items-center justify-start col-span-5 hover:cursor-pointer ">
                                        <Icon  icon="solar:logout-outline" width="24" height="24" style={{color: '#FE6212'}} />
                                        <h1 className="text-[#FE6212] mx-2 " >Déconnexion</h1>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
    
    
                    </div>
                    
                </div>
            </>
        )
    }

}
