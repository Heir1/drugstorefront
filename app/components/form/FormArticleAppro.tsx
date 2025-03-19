"use client"
import React, { useEffect, useState, useMemo } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { ArticleColumns } from '@/components/ui/DataTable/articles/ArticleColumns';
import { useArticleService } from '@/app/redux/slices/articles/useArticleService';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { usePackagingService } from '@/app/redux/slices/packaging/usePackagingService';
import { useCategoryService } from '@/app/redux/slices/category/useCategoryService';
import ICategory from '@/app/interfaces/category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IArticle from '@/app/interfaces/article';
import { createArticle, updateArticle } from '@/app/redux/slices/articles/actions';
import IPackaging from '@/app/interfaces/packaging';
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import { useCurrencyService } from '@/app/redux/slices/currencies/useCurrencyService';
import Link from 'next/link';
import MenuTab from '@/app/components/MenuTab';
import { OptionsOrGroups, GroupBase, SingleValue } from "react-select";
import { useSupplierService } from '@/app/redux/slices/suppliers/useSuppliseService';
import { useMoleculeService } from '@/app/redux/slices/molecules/useMoleculeService';
import { useIndicationService } from '@/app/redux/slices/indications/useIndicationService';
import { usePlacementService } from '@/app/redux/slices/placements/usePlacementService';
import Loading from '@/app/components/loading';
import dynamic from 'next/dynamic';
import { log } from 'console';
import IMovement from '@/app/interfaces/movement';
import { v4 as uuidv4 } from 'uuid';
import { createMovement } from '@/app/redux/slices/movements/actions';
import toast, { Toaster } from 'react-hot-toast'
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import IUser from '@/app/interfaces/user';
// Dynamically import React Select without SSR
const Select = dynamic(() => import('react-select'), { ssr: false });


interface IFormInputs {
    id: string;
    barcode: string;
    location: { value: string; label: string } | null;
    location1: string,
    description: string;
    description1: string;
    packaging1: string;
    category1: string;
    supplier1: string;
    indication: { value: string; label: string } | null;
    molecule: { value: string; label: string } | null;
    packaging: { value: string; label: string } | null;
    category: { value: string; label: string } | null;
    supplier: { value: string; label: string } | null;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    quantityappro: number | null  ;
    purchase_price: number;
    selling_price: number;
  }

export default function FormArticleAppro() {


    const [article, setArticle] = useState<any>(null)
    const [cart, setCart] = useState<IFormInputs[]>([]);
    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { suppliers, supplierStatus, supplierError } = useSupplierService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { placements, placementStatus, placementError } = usePlacementService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();
    const [submittedData, setSubmittedData] = useState<any>(null);
    const [number, setNumber] = useState<number | ''>(''); // Utiliser une chaîne vide au départ
    const [result, setResult] = useState<number | ''>(''); // Même chose pour le résultat
    const {  rates } = useRateService();
    const [ user, setUser ] = useState<IUser | null>(null);
    const rate = rates[0]?.value


    
    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);
      
    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({
        defaultValues: {
            id : "",
            barcode : "",
            location : null,
            location1: "",
            description1: "",
            description : "",
            indication : null,
            molecule : null,
            packaging : null,
            packaging1 : "",
            category : null,
            category1 : "",
            supplier : null,
            supplier1 : "",
            expirationDate : "",
            alert : 0,
            currency : 1,
            quantity : 0,
            quantityappro: null,
            purchase_price : 0,
            selling_price : 0,
        }
    });

    const articlesFormated = useMemo(() => 
        articles.map((article) => ({ 
            value: article , // Convertir id en string
            label: article.description ,
        })), 
        [articles]
    );

    const placementsFormated = useMemo(() => 
        placements.map((location) => ({ 
            value: location.id.toString(), // Convertir id en string
            label: location.name,
        })), 
        [placements] // Dépend uniquement de `placements`
    );

    const indicationsFormated = useMemo(() => 
        indications.map((indication) => ({ 
            value: indication.id.toString(), // Convertir id en string
            label: indication.name,
        })), 
        [indications] // Dépend uniquement de `indications`
    );

    const moleculeFormated = useMemo(() => 
        molecules.map((molecule) => ({ 
            value: molecule.id.toString(), // Convertir id en string
            label: molecule.name,
        })), 
        [molecules] // Dépend uniquement de `indications`
    );

    const packagingsFormated = useMemo(() => 
        packagings.map((packaging:any) => ({ 
            value: packaging.id.toString(), // Convertir id en string
            label: packaging.name,
        })), 
        [packagings] // Dépend uniquement de `packaging`
    );

    const categoriesFormated = useMemo(() => 
        categories.map((category) => ({ 
            value: category.id.toString(), // Convertir id en string
            label: category.name,
        })), 
        [categories] // Dépend uniquement de `categories`
    );

    const suppliersFormated = useMemo(() => 
        suppliers.map((supplier) => ({ 
            value: supplier.id.toString(), // Convertir id en string
            label: supplier.name,
        })), 
        [suppliers] // Dépend uniquement de `suppliers`
    );

    useEffect(()=>{
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    },[])


    const dispatch = useDispatch<AppDispatch>();

    
    const addToCart = async (data: IFormInputs) => {

        console.log("CART ",cart);
        
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.description === data.description);
            if (existingItem) {
              return prevCart.map(item => 
                item.description === data.description 
                  ? { ...item, quantityappro: Number(item.quantityappro) + Number(data.quantityappro) } 
                  : item
              );
            }
            return [...prevCart, data];
        });
    
    };

    const onSubmit = async (data: any) => {

        const cartData: any = {
            movement_type_id: 1,
            articles: cart,
            created_by: user?.name,
        };

        const createMovementPromise = dispatch(createMovement(cartData)).unwrap()
        .then(() => ({
            status: "fulfilled",
            message: "Approvisionnement créé avec succès !",
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
                setCart([]);
                toast.custom((t:any) => (
                <div className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
                >
                <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">✅</span>
                <div className="flex-1 text-center">
                    <p className="text-sm">Mouvement effectué avec succès</p>
                </div>
                </div>
            ), { duration: 2000 });
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

    
    const removeItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
    };

    // const totalPurchase = cart.reduce((sum, item) => sum + item.purchase_price * item.quantityappro, 0);
    const totalPurchase = cart.reduce((sum, item) => sum + item.purchase_price * (item.quantityappro ?? 0), 0);
    const totalSelling = cart.reduce((sum, item) => sum + item.selling_price * (item.quantityappro ?? 0), 0);
    
    
    //   const totalAmount = cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0);
    

    const handleChange = (selected: any) => {

        
        console.log("PRODUCT ");
        setArticle(selected)

        
        setValue("id", selected.value.id, { shouldValidate: true });
        setValue("barcode", selected.value.barcode, { shouldValidate: true });
        setValue("description", selected.value.description, { shouldValidate: true });
        setValue("alert", selected.value.alert, { shouldValidate: true });
        setValue("expirationDate", selected.value.expiration_date, { shouldValidate: true });
        setValue("quantity", selected.value.quantity, { shouldValidate: true });
        setValue("purchase_price", selected.value.purchase_price, { shouldValidate: true });
        setValue("selling_price", selected.value.selling_price, { shouldValidate: true });
        setValue('currency', selected.value.currency_id.toString(), { shouldValidate: true });
        setValue('packaging1', selected.value.packaging.name, { shouldValidate: true });
        setValue('category1', selected.value.category.name, { shouldValidate: true });
        setValue('location1', selected.value.placements[0].name, { shouldValidate: true });
        setValue('supplier1', selected.value.suppliers[0].name, { shouldValidate: true });

        setNumber(Number(selected.value.purchase_price))
        setResult(Number(selected.value.selling_price))

    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Si le champ est vide, réinitialiser le nombre et le résultat
        if (value === '') {
          setNumber('');
          setResult('');
          return;
        }
    
        // Convertir la valeur en nombre
        const parsedValue = parseFloat(value);
    
        // Mettre à jour l'état uniquement si la valeur est un nombre valide
        if (!isNaN(parsedValue)) {
          setNumber(parsedValue);
          setResult(parsedValue * 1.25); // Calculer le double
        }
        
    }

    return (
        <>
            <div className="mx-2"  >
                <Toaster />
                <form onSubmit={handleSubmit(addToCart)}>

                    <div className=" grid grid-cols-12 border-[1px] border-white mx-4 gap-3 p-2 " >
                        <div className=" col-span-3 " >
                            <div>
                                <label className=" text-[13px] font-medium text-white "  htmlFor="">CODE BARRE</label>
                            </div>
                            <div>
                                <Controller
                                    name="barcode"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase " type="text" readOnly />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-6 " >
                            <div>
                                <label className=" text-[13px] font-medium text-white " htmlFor="">DESCRIPTION</label>
                            </div>
                            <div>
                                <Controller
                                    name="description1"
                                    defaultValue="" // Ajoute une valeur par défaut
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            value={article}
                                            options={articlesFormated}
                                            onChange={handleChange}
                                            placeholder="Sélectionnez un article"
                                            className="uppercase"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className=" grid grid-cols-12 border-[1px] border-white mx-4 gap-3 p-2 mt-2 " >
                        <div className=" col-span-3 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">DESCRIPTION</label>
                            </div>
                            <div>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="text" readOnly />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-3 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">EMBALLAGE</label>
                            </div>
                            <div>
                                <Controller
                                    name="packaging1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="text" readOnly   />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-3 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">CATEGORIE</label>
                            </div>
                            <div>
                                <Controller
                                    name="category1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="text" readOnly   />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-3 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">FOURNISSEUR</label>
                            </div>
                            <div>
                                <Controller
                                    name="supplier1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="text" readOnly   />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">CODE BARRE</label>
                            </div>
                            <div>
                                <Controller
                                    name="barcode"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[12px] bg-[#F2F7FC] pl-4 uppercase " type="text" readOnly   />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">LOCALISATION</label>
                            </div>
                            <div>
                                <Controller
                                    name="location1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="text" readOnly   />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">QTE STOCK</label>
                            </div>
                            <div>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    defaultValue={1}
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="number"  readOnly  />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>

                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">QTE APPRO</label>
                            </div>
                            <div>
                                <Controller
                                    name="quantityappro"
                                    control={control}
                                    // defaultValue={1}
                                    render={({ field }) => <input {...field} value={field.value ?? ""}  className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="number" required  />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" flex items-center  col-span-1  " >
                            <Controller
                                name="currency"
                                control={control}
                                defaultValue={1}
                                render={({ field }) => (
                                    <div className=" flex justify-between items-center" >
                                        <div className=" w-1/3 flex justify-between items-center">
                                            <input
                                                type="radio"
                                                id="USD"
                                                value={2}
                                                {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                />
                                            <label className=' text-[12px]  text-sm font-semibold text-white' htmlFor="">USD</label>
                                        </div>
                                        <div className=" w-1/3 flex justify-between items-center">
                                            <input
                                                type="radio"
                                                id="CDF"
                                                value={1}
                                                {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                />
                                            <label className=' text-[12px]  text-sm font-semibold text-white' htmlFor="">CDF</label>
                                        </div>
                                    </div>
                                )}
                                rules={{ required: 'La monnaie est requise' }}
                            />
                        </div>

                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">PA</label>
                            </div>
                            <div>
                                <Controller
                                    name="purchase_price"
                                    control={control}
                                    
                                    defaultValue={1}
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="number" onChange={handleNumberChange} value={number} />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>

                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">PV</label>
                            </div>
                            <div>
                                <Controller
                                    name="selling_price"
                                    control={control}
                                    defaultValue={1}
                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="number" value={result}  readOnly />}
                                    rules={{ required: 'Le code barre est requis' }}
                                />
                            </div>
                        </div>
                        <div className=" col-span-1 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">Taux MB</label>
                            </div>
                            <div>
                                <span className=" bg-blue-600 px-4 py-1 " >
                                    1.25
                                </span>
                            </div>
                        </div>
                        <div className=" col-span-2 " >
                            <div>
                                <label className="text-[13px] font-medium text-white "  htmlFor="">PEREMPTION</label>
                            </div>
                            <div>
                                <Controller
                                    defaultValue=""
                                    name="expirationDate"
                                    control={control}
                                    render={({ field }) => <input  className={`w-full text-[14px] ${errors.expirationDate ? 'bg-red-800' : 'bg-[#F2F7FC]' }   pl-4 pr-4 uppercase rounded-lg `} {...field} type="date" />}
                                    rules={{
                                        required: 'La date est requise',
                                        validate: (value) => {
                                          const selectedDate = new Date(value);
                                          const today = new Date();
                                          today.setHours(0, 0, 0, 0); // Remove time part to compare only dates
                                          return selectedDate >= today || "Elle doit être dans le futur";
                                        },
                                    }}
                                />
                            </div>
                            <div>
                                {errors.expirationDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.expirationDate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="" >
                            <button type="submit" className=" w-full text-center p-2 bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Ajouter</button>
                        </div>
                    </div>
                    
                </form>

                <div className="p-4">
                    <div className="overflow-x-auto flex flex-col justify-between  h-[calc(100vh-25rem)] border-2 border-white bg-[#7288a5d0] ">
                        <div className=" h-[calc(100vh-25rem)] border-2 border-green-700 overflow-y-scroll " >
                            <table className="w-full text-white border border-gray-300">
                                <thead>
                                {/* bg-gray-700 */}
                                    <tr className="bg-white text-gray-700">
                                        <th className=" border border-gray-500 text-left pl-1 ">LOC</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Description</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">STOCK</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">APPRO</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">P.A/CDF</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">P.V/CDF</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">PEREMPTION</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Fournisseur</th>
                                        <th className=" border border-gray-500 text-left pl-1 ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                    <tr key={index} className="bg-white border text-gray-700 border-gray-600">
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.location1}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.description}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.quantity}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.quantityappro}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.purchase_price}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.selling_price} </td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.expirationDate}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.supplier1}</td>
                                        <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">
                                        <button onClick={() => removeItem(index)} className="bg-red-600 text-white px-2 py-1 rounded-lg">Supprimer</button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    {/* <tr className="bg-gray-900 font-bold text-white">
                                    <td className="p-2 border border-gray-500" colSpan={2}>Total</td>
                                    <td className="p-2 border border-gray-500">{totalAmount} $</td>
                                    <td className="p-2 border border-gray-500">{totalAmount} $</td>
                                    <td className="p-2 border border-gray-500" colSpan={4}></td>
                                    </tr> */}
                                </tfoot>
                            </table>
                        </div>
                        <div className=" grid grid-cols-6 bg-[#7288a5d0] h-[10vh] " >
                            <div className=" ml-2 flex items-center ">
                                <h1 className=" font-bold " >USD</h1>
                                <div className=" font-bold   ml-2 flex justify-center bg-yellow-500  w-full " >
                                    {(totalPurchase/rate).toFixed(2)}
                                </div>
                            </div>
                            <div className=" ml-4 flex items-center ">
                                <h1 className=" font-bold " >CDF</h1>
                                <div className=" font-bold   ml-2 flex justify-center bg-green-600  w-full " >
                                    {totalPurchase}
                                </div>
                            </div>
                            <div className=" ml-4 flex items-center ">
                                <div className=" ml-2 flex justify-center w-full border-2 border-black " >
                                    <select className=" w-full "  name="" id="">
                                        <option className=" " value="" >Type d'appro</option>
                                        <option value="">NORMAL</option>
                                        <option value="">REGUL STOCK</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" flex items-center col-start-6 gap-2 mr-2 " >
                                <div className=" w-1/2" >
                                    <button onClick={handleSubmit(onSubmit)} className=" bg-gray-300  w-full " >Enregistrer</button>
                                </div>
                                <div className=" w-1/2">
                                    <button className=" bg-gray-300 w-full " >Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
