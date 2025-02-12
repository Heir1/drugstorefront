"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import ICategory from '@/app/interfaces/category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IArticle from '@/app/interfaces/article';
import { createArticle, updateArticle } from '@/app/redux/slices/articles/actions';
import toast, { Toaster } from 'react-hot-toast'



export default function ArticleFormStockRegulNull() {

    return (
        <>
            <div className=" bg-[#7288a5fd] mx-8 border-2 border-white  ">
                <Toaster />
                <form >
                    <div className=" grid grid-cols-12 mx-4 gap-3 py-2 mt-2 " >

                        <div className=" col-span-8 " >

                            <div className=" flex w-full gap-2 " >
                                <div className=" w-[80%] ">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">DESCRIPTION</label>
                                    </div>
                                    <div>
                                        <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" />
                                    </div>
                                </div>
                                <div className=" w-[20%] " >
                                    <label className="text-[13px] font-extrabold"  htmlFor="">DATE</label>
                                    <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" />
                                </div>
                            </div>

                            <div className="flex w-full gap-2 " >
                                <div className=" w-[50%] " >
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">FOURNISSEUR</label>
                                    </div>
                                    <div>
                                        <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">STOCK ACTUEL</label>
                                    </div>
                                    <div>
                                        <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">QTE APPRO</label>
                                    </div>
                                    <div>
                                        <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">PA/USD</label>
                                    </div>
                                    <div>
                                        <input readOnly className="w-full text-[14px] bg-yellow-400 h-10 pl-4 uppercase rounded-lg " type="text" />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">PA/CDF</label>
                                    </div>
                                    <div>
                                        <input readOnly className="w-full text-[14px] bg-green-600 h-10 pl-4 uppercase rounded-lg " type="text" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=" col-span-4 gap-4 flex items-center  " >
                            <div className=" w-[70%] flex flex-col space-y-2 gap-2 " >
                                <label className="text-[13px] font-extrabold "  htmlFor="">COMMENTAIRE</label>
                                <textarea className="w-full text-[14px] bg-[#F2F7FC] h-16 p-4 rounded-lg " />
                            </div>
                            <div className=" flex flex-col gap-2  w-[30%] " >
                                <button disabled={true} type="submit" className=" w-full  border-[1px] bg-[#D32F2F] text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 rounded-lg ">Annuler cet article</button>
                                <button disabled={true} type="submit" className=" w-full text-center p-2 bg-[#28A745]  text-white transition duration-300  rounded-lg  text-[14px]  " >Modifier cet article</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )

}
