import dynamic from 'next/dynamic';
import React from 'react'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function FormArticleUpdateNull() {
  return (
    <div >
        <form >
            <div className="grid grid-cols-12  gap-x-2 py-5 px-3 " >
                <div className="col-span-6 bg-[#7288a5fd] border-2 border-white p-2  space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                    <div className="grid grid-cols-2 gap-5">
                        <div className=" flex items-center " >
                            <label className=" w-1/3 font-semibold text-sm text-white" htmlFor="">Code barre</label>
                                <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg border-2 border-black" type="text" />
                        </div>
                        <div className=" flex items-center justify-end gap-2 " >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Localisation</label>
                            <Select
                                id="location"
                                placeholder="Sélectionnez"
                                isClearable
                                className="border-2 border-black"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        <div className=" flex items-center " >
                            <label className=" w-[14%] font-semibold text-sm text-white" htmlFor="">Description</label>
                            <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg border-2 border-black" type="text" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        <div className=" flex items-center justify-between " >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Indication</label>
                            <Select
                                placeholder="Sélectionnez une indication"
                                isClearable
                                className="border-2 border-black w-[87.5%] "
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex items-center justify-between " >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Molécule</label>
                                <Select
                                    placeholder="Sélectionnez un molécule"
                                    isClearable
                                    className="border-2 border-black w-[87.5%]"
                                />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex items-center " >
                            <label className=" w-1/3  font-semibold text-sm text-white" htmlFor="">Emballage</label>
                            <Select
                                placeholder="Sélectionnez l'emballage "
                                isClearable
                                className="border-2 border-black w-full "
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2 " >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Catégorie</label>
                            <Select
                                placeholder="Sélectionnez une categorie"
                                isClearable
                                className="border-2 border-black"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 bg-[#7288a5] border-2 border-white p-2 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex justify-between " >
                            <div>
                                <label className=" font-semibold text-sm text-white " htmlFor="">Fournisseur</label>
                                    <Select
                                        placeholder="Sélectionnez un fournisseur"
                                        isClearable
                                        className="border-2 border-black w-[150%] "
                                    />
                            </div>
                            <div className="" >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Péremption</label>
                                <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg border-2 border-black"  type="date" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-8 gap-2 ">
                        <div className="" >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Alerte</label>
                            <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4 " type="number" />
                        </div>
                        <div className="" >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Qté</label>
                            <input  className="w-full text-[14px] bg-blue-500 h-10 pl-4 uppercase rounded-lg pr-4 " type="number" readOnly />
                        </div>
                        <div className="col-span-2" >
                            <label className=" font-semibold text-sm text-white" htmlFor="">Devise</label>
                            <div className="flex justify-between  items-center pb-3 border-2 border-white " >
                                <>
                                    <div className=" w-1/3 flex justify-between items-center">
                                        <input
                                            type="radio"
                                            id="USD"
                                            value={2}
                                        />
                                        <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                    </div>
                                    <div className=" w-1/3 flex justify-between items-center">
                                        <input
                                            type="radio"
                                            id="CDF"
                                            value={1}
                                        />
                                        <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                    </div>
                                </>
                            </div>
                        </div>
                        <div className=" col-span-3 flex gap-1 " >
                            <div>
                                <label className=" font-semibold text-sm text-white" htmlFor="">P.A</label>
                                <input  className="w-full text-[14px] text-center bg-[#F2F7FC] h-10 pl-[8px] uppercase rounded-lg pr-4 border-2 border-black" type="number"  />
                            </div>
                            <div>
                                <label className=" font-semibold text-sm text-white" htmlFor="">P.V</label>
                                <input  className="w-full text-[14px] text-center bg-[#F2F7FC] h-10 pl-[8px] uppercase rounded-lg pr-4 border-2 border-black" type="number" readOnly />
                            </div>
                        </div>
                        <div className="" >
                            <label className=" font-semibold text-sm text-white" htmlFor="">TAUX MB</label>
                            <input className="w-full bg-blue-500 text-[14px] h-10 pl-4 uppercase rounded-lg pr-4 " value={1.25} type="number" name="" id="" readOnly/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 pt-8 ">
                        <div className="" >
                            <button type="submit" className=" w-full text-center p-2 bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Modifier</button>
                        </div>
                        <div className=" " >
                            <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg ">Annuler</button>
                        </div>
                    </div>

                </div>

            </div>  
        </form>
    </div>
  )
}
