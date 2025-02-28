'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Cash() {

    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);
    
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
                        <div className="grid grid-cols-5 gap-1 place-content-center">
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isNewArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("new") } >
                                    <h1>Transactions</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isUpdateArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("update") }>
                                    <h1>Import/Export</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center uppercase py-2 rounded-lg ${ isStateArticle && "bg-[#262B62] text-white px-2 " } `} onClick={ ()=> setActivation("state") }>
                                    <h1>Rapports</h1>
                                </div>
                            </Link>
                            <Link href={``}>
                                <div className={`flex justify-center items-center uppercase py-2 rounded-lg ${ isReportArticle && "bg-[#262B62] text-white" } `}>
                                    <h1>Rapport</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" h-[80vh] " >
                <div className=" mx-7 bg-[#7288a5d0] mt-4 " >
                    <div className=" grid grid-cols-11 gap-2  " >
                        <div className="col-span-3 border-2 border-gray-400">
                            <div className=" pl-2 ml-2 -mt-[13] bg-[#7288a5d0] w-[25%] " >
                                <h1 className=" uppercase font-extrabold text-[14px]" >Date Op</h1>
                            </div>
                            <div className=" flex items-center gap-2 p-4 my-4 " >
                                <div>
                                    <h1 className="font-extrabold uppercase text-[12px] " >Date Trans</h1>
                                </div>
                                <div>
                                    <input className=" px-2 " type="date" name="" id="" />
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div>
                                    <h1 className=" uppercase font-extrabold text-[14px] " >Antidate</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 border-2 border-gray-400  ">
                            <div className="pl-2 ml-2 -mt-[13] bg-[#7288a5d0] w-[80%] " >
                                <h1 className=" uppercase font-extrabold text-[14px] " >Recherche par date transaction</h1>
                            </div>
                            <div className=" flex " >
                                <div className="space-y-4 ml-4 mt-2 w-[65%]  " >
                                    <div className=" flex justify-between gap-2 " >
                                        <h1 className=" uppercase font-extrabold text-[12px] " >
                                            Date début
                                        </h1>
                                        <div>
                                            <input className=" px-2 "  type="date" name="" id="" />
                                        </div>
                                    </div>
                                    <div className=" flex justify-between gap-2  " >
                                        <div>
                                            <h1 className=" uppercase font-extrabold text-[12px] " >
                                                Date Fin
                                            </h1>
                                        </div>
                                        <div>
                                            <input className=" px-2 " type="date" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                                <div className=" w-[35%] px-2 flex justify-center items-center" >
                                    <button className=" w-full font-extrabold  border-2 border-gray-500 bg-slate-200 text-[14px] uppercase " >Recherche</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 border-2 border-gray-400">
                            <div className="pl-2 ml-2 -mt-[13] bg-[#7288a5d0] w-[80%] " >
                                <h1 className=" uppercase font-extrabold text-[14px] " >Filtre recherche transaction</h1>
                            </div>
                            <div className=" grid grid-cols-4 gap-2 px-2 mt-3 " >
                                <div>
                                    <div>
                                        <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Type</h1>
                                    </div>
                                    <div>
                                        <input className=" w-full  pl-2 " type="text" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Description</h1>
                                    </div>
                                    <div>
                                        <input className=" w-full  pl-2 " type="text" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Devise</h1>
                                    </div>
                                    <div>
                                        <input className=" w-full  pl-2 " type="text" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Guichet</h1>
                                    </div>
                                    <div>
                                        <input className=" w-full  pl-2 " type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" grid grid-cols-11 mt-2 gap-2 border-2 border-gray-300" >
                        <div className=" col-span-3 " >
                            <div className=" w-full p-2 " >
                                <div className=" uppercase text-[12px] font-extrabold w-[50%] pl-4 bg-[#7288a5d0] mb-1" >
                                    <h1>Type transaction</h1>
                                </div>
                                <div className=" grid grid-cols-3 gap-4 p-4 border-2 border-gray-300 " >
                                    <div >
                                        <div className=" flex gap-2" >
                                            <input type="radio" name="" id="" />
                                            <h1 className=" uppercase font-extrabold " >Recette</h1>
                                        </div>
                                    </div>
                                    <div >
                                        <div className=" flex gap-2 " >
                                            <input type="radio" name="" id="" />
                                            <h1 className=" uppercase font-extrabold " >Dépense</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full p-2 " >
                                <textarea className=" p-2  w-full "  name="" id=""></textarea>
                            </div>
                            <div className=" w-full flex items-center pr-2 gap-4 " >
                                <div className=" w-1/2  pl-2  " >
                                    <h1 className=" uppercase font-extrabold mb-2" >Devise</h1>
                                    <div className="flex gap-4  border-2 border-gray-300" >
                                        <div >
                                            <div className=" flex gap-2" >
                                                <input type="radio" name="" id="" />
                                                <h1 className=" uppercase font-extrabold text-[12px] " >CDF</h1>
                                            </div>
                                        </div>
                                        <div >
                                            <div className=" flex gap-2 " >
                                                <input type="radio" name="" id="" />
                                                <h1 className=" uppercase font-extrabold text-[12px] text-yellow-500 " >USD</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" w-1/2 " >
                                    <div className=" gap-2" >
                                        <h1 className=" font-extrabold uppercase mb-2" >Montant</h1>
                                        <input className=" w-full " type="number" name="" id="" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="button" value="" />
                            </div>
                        </div>
                        <div className=" col-span-8 border-2 border-gray-300" >

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  )
}
