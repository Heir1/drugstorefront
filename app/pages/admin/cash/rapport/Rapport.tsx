"use client"
import IUser from '@/app/interfaces/user';
import { fetchDetailedTransactions, fetchTransactions } from '@/app/redux/slices/cash/actions';
import { useUserService } from '@/app/redux/slices/users/useUserService';
import { AppDispatch, RootState } from '@/app/redux/store/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PrintFile from '../../rapport/articles/printFile/PrintFile';

export default function Rapport() {

    const dispatch = useDispatch<AppDispatch>();

    const [ startDate, setStartDate ] = useState<string>('');
    const [ endDate, setEndDate ] = useState<string>('');
    const [ createdBy, setCreatedBy ] = useState("all");
    const [ transactionType, setTransactionType ] = useState("all");
    const [ isDisplayed, setIsDisplayed ] = useState(false);
    const { transactions, transactionStatus , transactionError } = useSelector((state: RootState) => state.transaction )
    const [user, setUser] = useState<IUser | null>(null);
    
    const { users, userStatus, error } = useUserService()

    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        dispatch(fetchDetailedTransactions({ startDate, endDate, transactionType, createdBy }))
    };

    
    useEffect(()=>{
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    },[])

    return (
        <div>

            <div className="hidden print:block" >
                {/* <PrintFile articles={articles} totalPurchase={Number(totalPrices.totalPurchasePrice/rate)} totalSelling={Number(totalPrices.totalSellingPrice/rate)} /> */}
            </div>

            <div className=" ml-[23%] w-[54%] flex justify-center col-span-3 border-2 bg-gray-400  mx-7 mt-20  ">
                <div className=' w-[98%] ' >
                    <form onSubmit={handleSubmitSearch}>
                        <div className="flex">
                            <div className="space-y-4 mt-2 w-full pb-2">
                            {/* Champ : Date de début */}
                            <div className="bg-[#7288a5d0] px-4 py-4 space-y-4 shadow-[0px_4px_8px_0px_#00000026] border-2 border-gray-300">
                                <div>
                                <h1 className="uppercase font-extrabold text-[12px]">Saisir date début de la transaction :</h1>
                                </div>
                                <div>
                                <input
                                    className="px-2 w-1/3"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                                </div>
                            </div>

                            {/* Champ : Date de fin */}
                            <div className="bg-[#7288a5d0] px-4 py-4 space-y-4 shadow-[0px_4px_8px_0px_#00000026] border-2 border-gray-300">
                                <div>
                                <h1 className="uppercase font-extrabold text-[12px]">Saisir date fin de la transaction :</h1>
                                </div>
                                <div>
                                <input
                                    className="px-2 w-1/3"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                                </div>
                            </div>

                            {/* Champ : Type d'opération */}
                            <div className="bg-[#7288a5d0] px-4 py-4 space-y-4 shadow-[0px_4px_8px_0px_#00000026] border-2 border-gray-300">
                                <div>
                                <h1 className="uppercase font-extrabold text-[12px]">Type opération :</h1>
                                </div>
                                <div className="mx-2 space-y-2">
                                <select
                                    className="w-1/3 p-1 font-bold"
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                >
                                    <option className="font-bold" value="all">TOUS</option>
                                    <option className="font-bold" value="income">RECETTE</option>
                                    <option className="font-bold" value="expense">DEPENSE</option>
                                </select>
                                </div>
                            </div>

                            {/* Champ : Sélectionner le guichet */}
                            <div className="bg-[#7288a5d0] px-4 py-4 space-y-4 shadow-[0px_4px_8px_0px_#00000026] border-2 border-gray-300">
                                <div>
                                <h1 className="uppercase font-extrabold text-[12px]">Sélectionner le guichet :</h1>
                                </div>
                                <div className="mx-2 space-y-2">
                                <select
                                    className="w-1/3 p-1 font-bold"
                                    value={createdBy}
                                    onChange={(e) => setCreatedBy(e.target.value)}
                                >
                                    <option className="font-bold" value="all">TOUS</option>
                                    {users.map((user) => (
                                    <option key={user.id} className="font-bold" value={user.id}>
                                        {user.name}
                                    </option>
                                    ))}
                                </select>
                                </div>
                            </div>

                            {/* Bouton de recherche */}
                            <div>
                                <button
                                type="submit"
                                className="w-full font-extrabold border-2 border-gray-500 bg-slate-200 text-[14px] uppercase"
                                >
                                Recherche
                                </button>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
