import React from 'react'
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import Link from 'next/link';

export default function Header() {
  return (
    <div className=" grid grid-cols-12  mt-8 mx-2 h-20 my-2 gap-5 px-5 " >

        <div className=" col-span-2 flex justify-center h-16  items-center shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9]  rounded-xl py-2  hover:cursor-pointer">
            <Link href={`/pages/admin/dashboard`} >
                <h1 className=" leading-[36px]  font-[700]  text-[18px] text-[#262B62]   " >Arsue Pharma </h1>
            </Link>
        </div>

        <div className="col-span-10  h-16  shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9]  rounded-xl py-2 place-content-center ">

            <div className="grid grid-cols-12" >
                <div className=" col-span-8 " >
                    <div className="grid grid-cols-12 pt-2 ">
                        <div className=" flex justify-center items-center hover:cursor-pointer  col-span-2  space-x-2 " >
                            <Icon icon="mynaui:file-solid" width="18" height="18" style={{color: '#000000'}} />
                            <h1>Fichier</h1>
                        </div>
                        <div className=" relative flex justify-center items-center hover:cursor-pointer  col-span-2 " >
                            <Icon icon="material-symbols:database" width="18" height="18" style={{color: '#000000'}} />
                            <h1>Données</h1>
                            <div className=" absolute top-6 left-10  w-[150px] bg-[#262B62] text-white  " >
                                <div className=" pl-6 py-2  " >
                                    <Link href={`/pages/admin/articles`} >
                                        <span className=" text-sm " > Aricles</span>
                                    </Link>
                                </div>
                                <hr />
                                <div className="  pl-6 py-2 ">
                                    <Link className="flex items-center space-x-2" href={`/pages/admin/Supplies`}>
                                        <span className=" text-sm "> Approv </span>
                                    </Link>
                                </div>
                                <hr />
                                <div className="  pl-6 py-2">
                                    <Link className="flex items-center space-x-2" href={`/pages/admin/regulations`}>
                                        <span className=" text-sm "> Régulation </span> 
                                    </Link>
                                </div>
                                <hr />
                                <div className="  pl-6 py-2 ">
                                    <Link className="flex items-center space-x-2" href={`/pages/admin/sales`}>
                                        <span className=" text-sm "> Ventes </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-center items-center  hover:cursor-pointer col-span-2 space-x-2" >
                            <Icon icon="material-symbols:settings-rounded" width="18" height="18" style={{color: '#000000'}} />
                            <h1>Paramètres</h1>
                        </div>
                        <div className=" flex justify-center items-center hover:cursor-pointer  col-span-2 space-x-2" >
                            <Icon icon="lsicon:report-filled" width="18" height="18" style={{color: '#FE6212'}} />
                            <h1 className=" text-[#FE6212] " >Rapports</h1>
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
                        <div className=" flex items-center justify-start col-span-5 hover:cursor-pointer ">
                            <Icon icon="solar:logout-outline" width="24" height="24" style={{color: '#FE6212'}} />
                            <h1 className="text-[#FE6212] mx-2 " >Déconnexion</h1>
                        </div>
                    </div>
                </div>
                
            </div>


        </div>
        
    </div>
  )
}
