"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import ICategory from '@/app/interfaces/category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IArticle from '@/app/interfaces/article';
import { createArticle, updateArticle } from '@/app/redux/slices/articles/actions';
import toast, { Toaster } from 'react-hot-toast'



export default function ArticleActivationFormNull() {

    return (
        <>
            <div className=" bg-[#7288a5fd] mx-2 border-2 border-white  ">
                <form >
                    <div className=" grid grid-cols-12 mx-4 gap-3 p-2 mt-2 " >
                        <div className=" col-span-4 " >
                            <div>
                                <label className="text-[13px] font-extrabold "  htmlFor="">PRODUIT</label>
                            </div>
                            <div>
                                <input readOnly className="w-full text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " type="text" />
                            </div>
                            <div className=" flex items-center space-y-2 gap-2 " >
                                <label className="text-[13px] font-extrabold "  htmlFor="">COMMENTAIRE</label>
                                <textarea className="w-full text-[12px] bg-[#F2F7FC] h-16 p-4 rounded-lg " />
                            </div>
                        </div>
                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-extrabold"  htmlFor="">STOCK</label>
                            </div>
                        </div>
                        <div className=" col-span-3 gap-2 flex items-center " >
                            <div className=" w-full " >
                                <button disabled={true} type="submit" className=" w-full  border-[1px] bg-[#D32F2F] text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 rounded-lg ">Désactiver</button>
                            </div>
                            <div className="w-full" >
                                <button disabled={true} type="submit" className=" w-full text-center p-2 bg-[#28A745]  text-white transition duration-300  rounded-lg  text-[14px]  " >Activer</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )

}
