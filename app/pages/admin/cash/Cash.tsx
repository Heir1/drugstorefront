'use client'
import TableLoading from '@/app/components/TableLoading';
import ITransaction from '@/app/interfaces/transaction';
import { createTransaction, deleteTransaction, fetchTransactions, updateTransaction } from '@/app/redux/slices/cash/actions';
import { AppDispatch, RootState } from '@/app/redux/store/store';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import IUser from '@/app/interfaces/user';
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import { useUserService } from '@/app/redux/slices/users/useUserService';
import FormAuth from '@/app/components/form/FormAuth';

// Définir le schéma de validation avec Yup
const schema = yup.object().shape({
    transaction_date: yup.string().required('La date de transaction est requise'),
    transaction_type: yup.string().required('Le type de transaction est requis'),
    description: yup.string().required('La description est requise'),
    ticket_counter: yup.string().required('Le nom du guichetier est requis'),
    currency_id: yup.string().required('La devise est requise'),
    amount: yup
      .number()
      .typeError('Le montant doit être un nombre')
      .required('Le montant est requis')
      .positive('Le montant doit être positif'),
  });

export default function Cash() {

    const today = new Date().toISOString().split('T')[0];


    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const [startDate, setStartDate] = useState<string>(today);
    const [endDate, setEndDate] = useState<string>(today);
    const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [ isSearching, setIsSearching ] = useState(false);
    const [ totalIncomeCDF, setTotalIncomeCDF ] = useState(0);
    const [ totalExpenseCDF, setTotalExpenseCDF ] = useState(0);
    const [ totalIncomeUSD, setTotalIncomeUSD ] = useState(0);
    const [ totalExpenseUSD, setTotalExpenseUSD ] = useState(0);
    const { users, userStatus, error } = useUserService();
    const [ isAuth, setIsAuth ] = useState(false);
    const [ id, setId ] = useState("");

    const { rates } = useRateService()
    const rate = rates[0]?.value


    const { transactions, transactionStatus , transactionError } = useSelector((state: RootState) => state.transaction )

    console.log(transactions);
    

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
    resolver: yupResolver(schema),
        defaultValues: {
            transaction_date: today,
            transaction_type: '',
            description: '',
            currency_id: '',
            ticket_counter: '',
            amount: 0,
        },
    });

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

    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        dispatch(fetchTransactions({ startDate, endDate }))
        .then(() => {
          setIsSearching(!isSearching); // Runs after fetch completes
        });
    };

    const onSubmit = (data:ITransaction) => {
        // console.log('Données du formulaire :', data);

        // transaction_date

        const transaction_type = data.transaction_type == "Recette" ? "income" : "expense";
        const currency_id = data.currency_id == "CDF" ? "1" : "2";

        const transactionData:ITransaction = {
            transaction_type,
            amount: data.amount,
            description: data.description,
            created_by: user?.id,
            ticket_counter : data.ticket_counter,
            currency_id,
            transaction_date : data.transaction_date
        }        

        const createUserPromise = dispatch(createTransaction(transactionData)).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Transaction créée avec succès !",
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
                            <p className="text-sm">La transaction a été créée avec succès</p>
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

    useEffect(()=> {
        if(selectedTransaction){


            console.log(selectedTransaction);
            
            
            const transaction_type = selectedTransaction?.transaction_type == "income" ? "Recette" : "Dépense";
            const currency_id = selectedTransaction?.currency_id == "1" ? "CDF" : "USD";

            // Handle ticket_counter value properly
            let ticketCounterValue = "";
            if (selectedTransaction?.ticket_counter) {
            if (typeof selectedTransaction.ticket_counter === 'object') {
                // If it's an IUser object
                ticketCounterValue = selectedTransaction.ticket_counter.id?.toString() || "";
            } else {
                // If it's already an ID (string or number)
                ticketCounterValue = selectedTransaction.ticket_counter.toString();
            }
            }

            setValue("transaction_type", transaction_type);
            setValue("description", selectedTransaction?.description || "");
            setValue("amount", selectedTransaction?.amount || 0);
            setValue("currency_id", currency_id);
            setValue("ticket_counter", ticketCounterValue); // This should match the option value
            
        }
    }, [selectedTransaction])

    
    useEffect(()=>{
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    },[])

    const handleEdit = (transaction:ITransaction) => {

        setSelectedTransaction(transaction);
    }

    const onSubmitUpdate = (data:ITransaction) => {

        const transaction_type = data.transaction_type == "Recette" ? "income" : "expense";
        const currency_id = data.currency_id == "CDF" ? "1" : "2";

        const transactionData:ITransaction = {
            id: selectedTransaction?.id,
            transaction_type,
            amount: data.amount,
            description: data.description,
            ticket_counter : data.ticket_counter,
            currency_id
        }

        console.log(transactionData);
        
        const createUserPromise = dispatch(updateTransaction(transactionData)).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Transaction modifiée avec succès !",
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
                            <p className="text-sm">La transaction a été modifiée avec succès</p>
                        </div>
                    </div>
                ), { duration: 2000 });
                reset();
                setSelectedTransaction(null)
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

    }

    const resetFormInfo = () => {
        setSelectedTransaction(null);
        reset();
    }

    function formatNumberWithSpaces(amount: number): string {
        // Utilise toLocaleString pour formatter le nombre avec espace comme séparateur
        return amount.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    useEffect(() => {

        let totalIncomeCDF = 0;
        let totalExpenseCDF = 0;
        let totalIncomeUSD = 0;
        let totalExpenseUSD = 0;

        transactions.forEach((transaction:any) => {
            if (transaction.currency?.id === "1") { // CDF
                if (transaction.transaction_type === "income") {
                    totalIncomeCDF += transaction.amount;
                } else {
                    totalExpenseCDF += transaction.amount;
                }
            } else { // USD
                if (transaction.transaction_type === "income") {
                    totalIncomeUSD += transaction.amount;
                } else {
                    totalExpenseUSD += transaction.amount;
                }
            }
        })

        setTotalIncomeCDF( Number(totalIncomeCDF)  + Number(totalIncomeUSD*rate));
        setTotalExpenseCDF( Number(totalExpenseCDF)  + Number(totalExpenseUSD*rate));
        setTotalIncomeUSD( Number(totalIncomeUSD)  + Number(totalIncomeCDF/rate));
        setTotalExpenseUSD( Number(totalExpenseUSD)  +  Number(totalExpenseCDF/rate))

    }, [isSearching,transactions])

    const removeCashJournal = (id:any) => {
        setIsAuth(true);
        setId(id)
    }
    
    const onSubmitDelete = async() => {
        
        dispatch(deleteTransaction(Number(id))).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Transaction a été supprimée avec succès !",
        }))
        .catch((err) => {
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la suppression.";
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
                            <p className="text-sm">Transaction a été supprimée avec succès</p>
                        </div>
                    </div>
                ), { duration: 2000 });
                reset();
                setSelectedTransaction(null)
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

    }

    return (
            <div>
                <Toaster />
                {
                    isAuth && <FormAuth updateProductState={onSubmitDelete}  setIsAuth={setIsAuth} />
                }  
                <div className=" block print:hidden mx-2 p-5 " >
                    <div className="grid grid-cols-11">
                        <div className="col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                            <div className="grid grid-cols-4 gap-1 place-content-center">
                                <Link href={``}>
                                    <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isNewArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("new") } >
                                        <h1>Transactions</h1>
                                    </div>
                                </Link>
                                <Link href={``}>
                                    <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isUpdateArticle && "bg-[#2z62B62] text-white" } `} onClick={ ()=> setActivation("update") }>
                                        <h1>Import/Export</h1>
                                    </div>
                                </Link>
                                <Link href={``}>
                                    <div className={`flex justify-center items-center uppercase py-2 rounded-lg ${ isStateArticle && "bg-[#262B62] text-white px-2 " } `} onClick={ ()=> setActivation("state") }>
                                        <h1>Rapports</h1>
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
                                        {/* <input className=" px-2 " type="date" name="" id="" /> */}
                                        <Controller
                                            name="transaction_date"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                {...field}
                                                type="date"
                                                id="date"
                                                />
                                            )}
                                        />
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

                                <form onSubmit={handleSubmitSearch}>
                                    <div className="flex">
                                        <div className="space-y-4 ml-4 mt-2 w-[65%]">
                                            <div className="flex justify-between gap-2">
                                                <h1 className="uppercase font-extrabold text-[12px]">Date début</h1>
                                                <div>
                                                    <input
                                                        className="px-2"
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <div>
                                                    <h1 className="uppercase font-extrabold text-[12px]">Date Fin</h1>
                                                </div>
                                                <div>
                                                    <input
                                                        className="px-2"
                                                        type="date"
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[35%] px-2 flex justify-center items-center">
                                            <button
                                                type="submit"
                                                className="w-full font-extrabold border-2 border-gray-500 bg-slate-200 text-[14px] uppercase"
                                            >
                                                Recherche
                                            </button>
                                        </div>
                                    </div>
                                </form>

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
                                <form onSubmit={handleSubmit( selectedTransaction ? onSubmitUpdate : onSubmit)}>
                                    {/* Type de transaction */}
                                    <div className="w-full p-2">
                                        <div className="uppercase text-[12px] font-extrabold w-[50%] pl-4 bg-[#7288a5d0] mb-1">
                                        <h1>Type transaction</h1>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 p-4 border-2 border-gray-300">
                                        <Controller
                                            name="transaction_type"
                                            control={control}
                                            render={({ field }) => (
                                            <div>
                                                <div className="flex gap-2">
                                                <input
                                                    {...field}
                                                    type="radio"
                                                    value="Recette"
                                                    checked={field.value === 'Recette'}
                                                />
                                                <h1 className="uppercase font-extrabold">Recette</h1>
                                                </div>
                                            </div>
                                            )}
                                        />
                                        <Controller
                                            name="transaction_type"
                                            control={control}
                                            render={({ field }) => (
                                            <div>
                                                <div className="flex gap-2">
                                                <input
                                                    {...field}
                                                    type="radio"
                                                    value="Dépense"
                                                    checked={field.value === 'Dépense'}
                                                />
                                                <h1 className="uppercase font-extrabold">Dépense</h1>
                                                </div>
                                            </div>
                                            )}
                                        />
                                        </div>
                                        {errors.transaction_type && (
                                        <p className="text-red-500 text-sm">{errors.transaction_type.message}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="w-full p-2">
                                        <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                            {...field}
                                            className="p-2 w-full"
                                            placeholder="Description"
                                            />
                                        )}
                                        />
                                        {errors.description && (
                                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                                        )}
                                    </div>

                                    {/* Devise et Montant */}
                                    <div className="w-full flex items-center pr-2 gap-4 mb-4">
                                        <div className="w-1/2 pl-2">
                                        <h1 className="uppercase font-extrabold mb-2">Devise</h1>
                                        <div className="flex gap-4 border-2 border-gray-300 p-2">
                                            <Controller
                                            name="currency_id"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                <div className="flex gap-2">
                                                    <input
                                                    {...field}
                                                    type="radio"
                                                    value={"CDF"}
                                                    checked={field.value === 'CDF'}
                                                    />
                                                    <h1 className="uppercase font-extrabold text-[12px]">CDF</h1>
                                                </div>
                                                </div>
                                            )}
                                            />
                                            <Controller
                                            name="currency_id"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                <div className="flex gap-2">
                                                    <input
                                                    {...field}
                                                    type="radio"
                                                    value="USD"
                                                    checked={field.value === 'USD'}
                                                    />
                                                    <h1 className="uppercase font-extrabold text-[12px] text-yellow-500">
                                                    USD
                                                    </h1>
                                                </div>
                                                </div>
                                            )}
                                            />
                                        </div>
                                        {errors.currency_id && (
                                            <p className="text-red-500 text-sm">{errors.currency_id.message}</p>
                                        )}
                                        </div>
                                        <div className="w-1/2">
                                        <div className="gap-2">
                                            <h1 className="font-extrabold uppercase mb-2">Montant</h1>
                                            <Controller
                                                name="amount"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                    {...field}
                                                    className="w-full"
                                                    type="number"
                                                    placeholder="Montant"
                                                    />
                                                )}
                                            />
                                            {
                                                errors.amount && (<p className="text-red-500 text-sm">{errors.amount.message}</p>
                                            )
                                            }
                                        </div>
                                        </div>
                                    </div>

                                    {/* Guichet */}
                                    <div className="mx-2 space-y-2">
                                        <label htmlFor="guichet" className="font-extrabold text-[13px]">
                                            GUICHET
                                        </label>
                                        <Controller
                                            name="ticket_counter" // ou "created_by" selon votre besoin
                                            control={control}
                                            render={({ field }) => (
                                                <select {...field} className="w-full p-1">
                                                <option value="">Sélectionnez un guichetier</option>
                                                {users.map((user: IUser) => (
                                                    <option key={user.id} value={user.id}>
                                                    {user?.name}
                                                    </option>
                                                ))}
                                                </select>
                                            )}
                                        />
                                        {
                                            errors.ticket_counter && (<p className="text-red-500 text-sm">{errors.ticket_counter.message}</p>
                                            )
                                        }
                                    </div>

                                    {/* Boutons Enregistrer et Annuler */}
                                    <div className="mt-4 flex justify-center gap-4 border-2 mx-[7px] mb-2 p-4">
                                        <div className="w-[40%] border-2">
                                        <button
                                            className="w-full bg-gray-400 uppercase font-bold"
                                            type="submit"
                                        >
                                            {
                                                selectedTransaction ? 'Modifier' : 'Enregistrer'
                                            } 
                                        </button>
                                        </div>
                                        <div className="w-[40%] border-2">
                                        <button
                                            className="w-full bg-gray-400 uppercase font-bold"
                                            type="button"
                                            onClick={() => resetFormInfo() }
                                        >
                                            Annuler
                                        </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className=" col-span-8 border-2 border-gray-300 p-4 " >
                                <div className=" border-2 border-black shadow-2xl h-[70%]  " >
                                {
                                    transactionStatus == "loading" ? (
                                        <TableLoading/>
                                    )
                                    :
                                    (
                                        <table className="w-full uppercase border border-gray-300">
                                            <thead>
                                            {/* bg-gray-700 */}
                                                <tr className="bg-white uppercase">
                                                    <th className=" border border-gray-500 text-left pl-1 ">Transaction</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Montant</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Descrption</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Monnaie</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    transactions?.map((transacion: ITransaction) => (
                                                        <tr key={transacion.id} 
    
                                                        className={` border ${ selectedTransaction?.id == transacion?.id ? 'bg-blue-700 text-white ' : 'bg-gray-100' }  border-gray-500 hover:cursor-pointer `} 
                                                        
                                                        onClick={()=> handleEdit(transacion)} 
                                                        >
                                                            <td className="border border-gray-500 pl-1">
                                                                {
                                                                    transacion.transaction_type == "expense" ? "Dépense" : "Recette"
                                                                }
                                                            </td>
                                                            <td className="border border-gray-500 pl-1">{transacion.amount}</td>
                                                            <td className="border border-gray-500 pl-1">{transacion.description}</td>
                                                            <td className="border border-gray-500 pl-1">{transacion.currency?.name}</td>
                                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">
                                                                <button 
                                                                onClick={() => removeCashJournal(transacion?.id)} 
                                                                className="bg-red-600 text-white px-2 py-1 rounded-lg">Supprimer</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                
                                        </table>
                                    )
                                }
                                </div>
                                <div className=" flex flex-col justify-center border-2 border-black h-[30%] mt-2   " >
                                    <div className=" grid grid-cols-5 gap-4 mb-2 " >
                                        <div className=" col-start-2 flex flex-col" >
                                            <label className=" uppercase text-[13px] font-extrabold " htmlFor="">RECETTES</label>
                                            <input className=" bg-green-600 " readOnly  value={ isNaN(totalIncomeUSD) ? 0 : formatNumberWithSpaces(totalIncomeUSD) } type="text" name="" id="" />
                                        </div>
                                        <div className=" flex flex-col " >
                                            <label className=" uppercase text-[13px] font-extrabold " htmlFor="">Dépenses</label>
                                            <input className=" bg-green-600 " readOnly  value={ isNaN(totalExpenseUSD) ? 0 : formatNumberWithSpaces(totalExpenseUSD) }  type="text" name="" id="" />
                                        </div>
                                        <div className="flex flex-col" >
                                            <label className=" uppercase text-[13px] font-extrabold " htmlFor="">SOLDE</label>
                                            <input className=" bg-green-600 " readOnly  value={ isNaN(totalIncomeUSD -  totalExpenseUSD) ? 0 : formatNumberWithSpaces(totalIncomeUSD -  totalExpenseUSD) }  type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-5 gap-4 " >
                                        <div className=" col-start-2" >
                                            <input className="w-full bg-yellow-600 " readOnly  value={ isNaN(totalIncomeCDF) ? 0 : formatNumberWithSpaces(totalIncomeCDF)  }  type="text" name="" id="" />
                                        </div>
                                        <div>
                                            <input className="w-full bg-yellow-600 " readOnly  value={ isNaN(totalExpenseCDF) ? 0 : formatNumberWithSpaces(totalExpenseCDF)  } type="text" name="" id="" />
                                        </div>
                                        <div>
                                            <input className="w-full bg-yellow-600 " readOnly  value={ isNaN((totalIncomeCDF) - (totalExpenseCDF)) ? 0 : formatNumberWithSpaces((totalIncomeCDF) - (totalExpenseCDF)) }  type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
    )
}
