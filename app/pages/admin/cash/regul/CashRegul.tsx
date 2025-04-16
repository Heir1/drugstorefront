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
    transaction_op: yup.string().required('La date de transaction est requise'),
    transaction_id: yup.string().required('La date de transaction est requise'),
    operator: yup.string().required('La date de transaction est requise'),
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

export default function CashRegul() {

    const today = new Date().toISOString().split('T')[0];


    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);

    const [searchFilters, setSearchFilters] = useState({
        type: '',
        description: '',
        currency: '',
        ticketCounter: ''
    });

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
            transaction_op: '',
            transaction_type: '',
            description: '',
            currency_id: '',
            ticket_counter: '',
            operator: '',
            transaction_id: '',
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

    const filteredTransactions = transactions?.filter((transaction) => {
        // Filtre par type
        const typeMatch = searchFilters.type === '' || 
          (transaction.transaction_type === 'expense' ? 'Dépense' : 'Recette').toLowerCase().includes(searchFilters.type.toLowerCase());
        
        // Filtre par description
        const descriptionMatch = searchFilters.description === '' || 
          (transaction.description || '').toLowerCase().includes(searchFilters.description.toLowerCase());
        
        // Filtre par devise
        const currencyMatch = searchFilters.currency === '' || 
          (transaction.currency?.name || '').toLowerCase().includes(searchFilters.currency.toLowerCase());
        
        // Filtre par guichet
        const ticketCounterMatch = searchFilters.ticketCounter === '' || 
        (typeof transaction.ticket_counter === 'object' && 
         transaction.ticket_counter !== null &&
         'name' in transaction.ticket_counter &&
         transaction.ticket_counter.name?.toLowerCase().includes(searchFilters.ticketCounter.toLowerCase()));
        
        return typeMatch && descriptionMatch && currencyMatch && ticketCounterMatch;
    });

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
            let operator = ""

            if (typeof selectedTransaction.created_by === 'object') {
                // If it's an IUser object
                operator = selectedTransaction?.created_by?.name?.toString() || "";
            }

            if (selectedTransaction?.ticket_counter) {
                if (typeof selectedTransaction.ticket_counter === 'object') {
                    // If it's an IUser object
                    ticketCounterValue = selectedTransaction.ticket_counter.name?.toString() || "";
                } else {
                    // If it's already an ID (string or number)
                    ticketCounterValue = selectedTransaction.ticket_counter.toString();
                }
            }
            // .split("T")[0].split("-").reverse().join("-")
            setValue("transaction_type", transaction_type);
            setValue("transaction_date", selectedTransaction?.transaction_date  || "");
            setValue("operator", operator);
            setValue("transaction_op", String(selectedTransaction?.created_at).split("T")[0].split("-").reverse().join("-")  || "");
            setId(String(selectedTransaction?.id))
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

    const removeCashJournal = () => {
        setIsAuth(true);
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
                                    <div className={`flex justify-center items-center py-2 rounded-lg uppercase ${ isUpdateArticle && "bg-[#262B62] text-white" } `} onClick={ ()=> setActivation("update") }>
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

                            {/* <div className="col-span-3 border-2 border-gray-400">
                                <div className=" pl-2 ml-2 -mt-[13] bg-[#7288a5d0] w-[25%] " >
                                    <h1 className=" uppercase font-extrabold text-[14px]" >Date Op</h1>
                                </div>
                                <div className=" flex items-center gap-2 p-4 my-4 " >
                                    <div>
                                        <h1 className="font-extrabold uppercase text-[12px] " >Date Trans</h1>
                                    </div>
                                    <div>
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
                            </div> */}

                            <div className="col-span-5 border-2 border-gray-400  ">
                                <div className="pl-2 ml-2 -mt-[13] bg-[#7288a5d0] w-[80%] " >
                                    <h1 className=" uppercase font-extrabold text-[14px] " >Recherche par date transaction</h1>
                                </div>

                                <form onSubmit={handleSubmitSearch}>
                                    <div className="flex items-center ">
                                        <div className="ml-4 mt-2 w-[70%] flex gap-4 ">
                                            <div className="flex justify-between items-center gap-2 ">
                                                <h1 className="uppercase font-extrabold text-[12px]">Du</h1>
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
                                            <div className="flex justify-between items-center gap-2 ">
                                                <div>
                                                    <h1 className="uppercase font-extrabold text-[12px]">Au</h1>
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
                                        <div className="w-[30%] px-2 flex justify-center items-center">
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

                            <div className="col-span-6 border-2 border-gray-400">
                                <div className="pl-2 ml-2 -mt-[13] bg-[#7288a5d0] w-[80%] " >
                                    <h1 className=" uppercase font-extrabold text-[14px] " >Filtre recherche transaction</h1>
                                </div>
                                <div className=" grid grid-cols-4 gap-2 px-2 mt-3 " >
                                    <div>
                                        <div>
                                            <h1 className="uppercase text-[12px] font-extrabold mb-2">Type</h1>
                                        </div>
                                        <div>
                                            <input className="w-full pl-2" type="text" value={searchFilters.type} onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Description</h1>
                                        </div>
                                        <div>
                                            <input className="w-full pl-2" type="text" value={searchFilters.description} onChange={(e) => setSearchFilters({...searchFilters, description: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Devise</h1>
                                        </div>
                                        <div>
                                            <input className="w-full pl-2" type="text" value={searchFilters.currency} onChange={(e) => setSearchFilters({...searchFilters, currency: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1 className="uppercase text-[12px] font-extrabold mb-2 " >Guichet</h1>
                                        </div>
                                        <div>
                                            <input 
                                                className="w-full pl-2" 
                                                type="text" 
                                                value={searchFilters.ticketCounter}
                                                onChange={(e) => setSearchFilters({...searchFilters, ticketCounter: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=" h-[65vh]  grid grid-cols-11 mt-2 gap-2 border-2 border-gray-300" >
                            <div className=" col-span-11 border-2 border-gray-300 p-4 " >
                                <div className=" border-2 border-black shadow-2xl h-[60%]  " >
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
                                                    <th className=" border border-gray-500 text-left pl-1 ">DATE TRANS</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">DATE OP</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Type</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Montant</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Descrption</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Devise</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Guichet</th>
                                                    <th className=" border border-gray-500 text-left pl-1 ">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredTransactions?.map((transaction: ITransaction) => (
                                                        <tr key={transaction.id} 
    
                                                        className={` border ${ selectedTransaction?.id == transaction?.id ? 'bg-blue-700 text-white ' : 'bg-gray-100' }  border-gray-500 hover:cursor-pointer `} 
                                                        
                                                        onClick={()=> handleEdit(transaction)} 
                                                        >
                                                            <td className="border border-gray-500 pl-1">{String(transaction.transaction_date).split("T")[0].split("-").reverse().join("-")}</td>
                                                            <td className="border border-gray-500 pl-1">{String(transaction.created_at).split("T")[0].split("-").reverse().join("-")}</td>
                                                            <td className="border border-gray-500 pl-1">
                                                                {
                                                                    transaction.transaction_type == "expense" ? "Dépense" : "Recette"
                                                                }
                                                            </td>
                                                            <td className="border border-gray-500 pl-1">{transaction.amount}</td>
                                                            <td className="border border-gray-500 pl-1">{transaction.description}</td>
                                                            <td className="border border-gray-500 pl-1">{transaction.currency?.name}</td>
                                                            <td className="border border-gray-500 pl-1">
                                                                {
                                                                    typeof transaction.ticket_counter === 'object' && transaction.ticket_counter !== null 
                                                                        && transaction.ticket_counter.name
                                                                }
                                                            </td>
                                                            <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">
                                                                <button 
                                                                onClick={() => removeCashJournal()} 
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
                                <div className="grid grid-cols-12 gap-2  border-2 border-black h-[40%] mt-2 p-2" >

                                    <div className="col-span-3">
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => (
                                                <textarea
                                                    {...field}
                                                    disabled
                                                    className="p-2 w-full bg-blue-700 h-32 "
                                                    placeholder="Description"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-5 ">
                                        <div className="grid grid-cols-5 gap-2 ">
                                            <div>
                                                <Controller
                                                    name="transaction_date"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled
                                                            className="w-full bg-blue-700"
                                                            type="text"
                                                            placeholder="Date"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Controller
                                                    name="transaction_op"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled
                                                            className="w-full bg-blue-700"
                                                            type="text"
                                                            placeholder="Date"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Controller
                                                    name="transaction_type"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled
                                                            className="w-full bg-blue-700"
                                                            type="text"
                                                            placeholder="Date"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Controller
                                                    name="amount"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled
                                                            className="w-full bg-blue-700"
                                                            type="text"
                                                            placeholder="Date"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Controller
                                                    name="currency_id"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled
                                                            className="w-full bg-blue-700"
                                                            type="text"
                                                            placeholder="Date"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-5">
                                                <div>
                                                    <h1>
                                                        Guichetier
                                                    </h1>
                                                </div>
                                                <div>
                                                    <Controller
                                                        name="ticket_counter"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                disabled
                                                                className="w-full bg-blue-700"
                                                                type="text"
                                                                placeholder="Guichetier"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-5">
                                                <div>
                                                    <h1>Opérateur</h1>
                                                </div>
                                                <div>
                                                    <Controller
                                                        name="operator"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                {...field}
                                                                disabled
                                                                className="w-full bg-blue-700"
                                                                type="text"
                                                                placeholder="Operateur"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <div>
                                            <textarea className=" w-full h-28 "  name="" id=""></textarea>
                                        </div>
                                        <div>
                                            {
                                                selectedTransaction && (
                                                    <div className=" flex gap-2 " >
                                                        <div className=' w-1/2 ' >
                                                            <button
                                                                onClick={() => removeCashJournal()} 
                                                                className=" w-full bg-gray-200 px-2 py-1 rounded-lg">Authorisation
                                                            </button>
                                                        </div>
                                                        <div className=' w-1/2 ' >
                                                            <button 
                                                                className=" w-full bg-gray-200 px-2 py-1 rounded-lg">Valider
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
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
