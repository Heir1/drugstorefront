"use client"
import React from 'react'
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import Link from 'next/link';
import Image from 'next/image';


export default function Dashboard() {
  
  return (
    <>
            
        <div className="grid grid-cols-12  bg-[#262B62] rounded-3xl mx-6 ">
            <div className=" col-start-3 col-span-3  pt-[8%] ">
                <div className="grid grid-cols-12">
                    <div className=" flex justify-end col-span-12 ">
                        <h1 className=" text-[96px] font-[700] -mr-16 text-[#DCEBFF] " >Arsue</h1>
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className=" flex justify-end items-center col-span-12">
                        <div className=" p-2 bg-[#E9C4D2] rounded-full " >
                            <Icon icon="material-symbols:home-outline" width="24" height="24" />
                        </div>
                        <div>
                            <p className=" text-[#E9C4D2] text-[12px] ml-3 " >Bienvenue dans votre tableau de bord <br /> de gestion de pharmacie</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex justify-center ">
                <Image src={'/nurse.png'} alt={'doctor'} width={200} height={200}/>
            </div>
            <div className="col-span-3 pt-[8%]">
                <div className="grid grid-cols-12">
                    <h1 className=" text-[96px] text-[#DCEBFF] font-[700] -ml-8 " >Pharma</h1>
                </div>
                <div className="grid grid-cols-12 -ml-8 ">
                    <div className="col-span-2 flex justify-end pb-8 ">
                        <div className=" p-2  bg-[#A2D9C2] rounded-full " >
                            <Icon icon="tabler:arrow-roundabout-right" width="24" height="24" />
                        </div>
                    </div>
                    <div className="col-span-10 flex justify-start ml-2 ">
                        <div>
                            <p className=" text-[#A2D9C2] text-[12px] ">Suivez vos stocks, passez vos commandes, <br /> gérez vos ventes, prescriptions clients, et accédez <br /> à des rapports détaillés pour optimiser vos performances.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-10 rounded-3xl gap-10 px-16 mt-6 ">
            <div className="col-span-2 bg-[#F0DA6A] py-14 rounded-3xl ">
                <Link href={`/pages/admin/articles`} >
                    <div className="grid grid-cols-1">
                        <div className=" flex justify-center " >
                            <h1>Articles</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 py-2 ">
                        <div className=" flex justify-center ">
                            <Icon icon="stash:article-duotone" width="128" height="128" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col-span-2 bg-[#A4DAC2] py-14 rounded-3xl ">
                <div className="grid grid-cols-1">
                    <div className=" flex justify-center " >
                        <h1>Stocks</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 py-2">
                    <div className=" flex justify-center ">
                        <Icon icon="vaadin:stock" width="128" height="128" />
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-[#E7C2D4] py-14 rounded-3xl ">
                <div className="grid grid-cols-1">
                    <div className=" flex justify-center " >
                        <h1>Vente</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 py-2">
                    <div className=" flex justify-center ">
                        <Icon icon="icon-park-outline:sales-report" width="128" height="128" />
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-[#92BDF7] py-14 rounded-3xl ">
                <div className="grid grid-cols-1">
                    <div className=" flex justify-center " >
                        <h1>Configuration</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 py-2">
                    <div className=" flex justify-center ">
                        <Icon icon="material-symbols:settings-outline" width="128" height="128" />
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-[#FFD990] py-14 rounded-3xl ">
                <div className="grid grid-cols-1">
                    <div className=" flex justify-center " >
                        <h1>Rapport</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 py-2">
                    <div className=" flex justify-center ">
                        <Icon icon="fluent-mdl2:c-r-m-report" width="128" height="128" />
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-12 mt-6 mb-10 ">
            <div className="col-start-2 col-span-10 px-20 " >
                <div className="grid grid-cols-12 gap-5 ">
                    <div className="col-span-2 px-5 py-4 space-y-20 bg-white rounded-3xl shadow-[0px_4px_8px_0px_#00000026]" >
                        <div className="flex justify-between items-center " >
                            <div>
                                <Icon icon="fluent:alert-on-24-regular" width="24" height="24" />
                            </div>
                            <div>
                                <h1 className="text-[#FE6212] text-[18px] font-bold " >187</h1>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm" >
                                Alerte <br /> de peremption
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 px-5 py-4 space-y-20 bg-white rounded-3xl shadow-[0px_4px_8px_0px_#00000026]" >
                        <div className="flex justify-between items-center " >
                            <div>
                                <Icon icon="lsicon:sales-return-outline" width="16" height="16" />
                            </div>
                            <div>
                                <h1 className="text-[#FE6212] text-[18px] font-bold " >154</h1>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm" >
                                Vente stock
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 px-5 py-4 space-y-20 bg-white rounded-3xl shadow-[0px_4px_8px_0px_#00000026]" >
                        <div className="flex justify-between items-center " >
                            <div>
                                <Icon icon="tdesign:task" width="24" height="24" />
                            </div>
                            <div>
                                <h1 className="text-[#FE6212] text-[18px] font-bold " >221</h1>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm" >
                                Vente du jour
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 px-5 py-4 space-y-20 bg-white rounded-3xl shadow-[0px_4px_8px_0px_#00000026]" >
                        <div className="flex justify-between items-center " >
                            <div>
                                <Icon icon="material-symbols:order-approve-outline" width="24" height="24" />
                            </div>
                            <div>
                                <h1 className="text-[#FE6212] text-[18px] font-bold " >207</h1>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm" >
                                Approvisionnement <br />du jour
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 px-5 py-4 space-y-20 bg-white rounded-3xl shadow-[0px_4px_8px_0px_#00000026]" >
                        <div className="flex justify-between items-center " >
                            <div>
                                <Icon icon="carbon:sales-ops" width="24" height="24" />
                            </div>
                            <div>
                                <h1 className="text-[#FE6212] text-[18px] font-bold " >6</h1>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm" >
                                Top vente <br /> du jour
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 px-5 py-4 space-y-20 bg-white rounded-3xl shadow-[0px_4px_8px_0px_#00000026]" >
                        <div className="flex justify-between items-center " >
                            <div>
                                <Icon icon="stash:article-duotone" width="24" height="24" />
                            </div>
                            <div>
                                <h1 className="text-[#FE6212] text-[18px] font-bold " >4873</h1>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm" >
                                Articles
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )

}
