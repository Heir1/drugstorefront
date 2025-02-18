"use client"
import React, { useEffect, useState, useMemo, use } from 'react'
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
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import Iinvoice from '@/app/interfaces/invoice';
import { createInvoice } from '@/app/redux/slices/invoices/actions';
import { usePaymentModeService } from '@/app/redux/slices/paymentmodes/usePaymentModeService';
import Invoice from '../invoice/Invoice';
import { useInvoiceNumberService } from '@/app/redux/slices/invoices/useInvoiceService';
// Dynamically import React Select without SSR
const Select = dynamic(() => import('react-select'), { ssr: false });


interface IFormInputs {
    id: string;
    barcode: string;
    location: { value: string; label: string } | null;
    location1: string;
    description: string;
    description1: string;
    packaging1: string;
    category1: string;
    supplier1: string;
    molecule1: string;
    indication1: string;
    indication: { value: string; label: string } | null;
    molecule: { value: string; label: string } | null;
    packaging: { value: string; label: string } | null;
    category: { value: string; label: string } | null;
    supplier: { value: string; label: string } | null;
    paymentmode: { value: string; label: string } | null;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    quantity1: number;
    quantityappro: number;
    purchase_price: number;
    selling_price: number;
}


type CartItem = IFormInputs & {
    prix_total: number; // Ajouter un champ pour le prix total unitaire
};

interface CartItem1 {
    id: string;
    quantity1: number;
    prix_total: number;
}


export default function FormArticleSale() {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [cart1, setCart1] = useState<CartItem1[]>([]);

    const [article, setArticle] = useState<any>(null);
    const [ paymentMode, setPaymentMode ] = useState<any>(null);

    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { suppliers, supplierStatus, supplierError } = useSupplierService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { placements, placementStatus, placementError } = usePlacementService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();
    const {paymentModes, paymentModeStatus, paymentModeError} = usePaymentModeService();
    const [submittedData, setSubmittedData] = useState<any>(null);
    const { invoiceNumber } = useInvoiceNumberService();


    console.log(paymentModes);
    
    

    
    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);
    const [ isInvoice, setIsInvoice ] = useState(false);
    const [ clientName, setClientName ] = useState("NOT SET");

    const [cdfPaidAmount, setCdfPaidAmount] = useState<number | undefined>(); 
    const [ usdPaidAmount, setUsdPaidAmount ] = useState<number | undefined>();
    const [ currency, setCurrency ] = useState(false);

    const { rates } = useRateService()

    const rate = rates[0]?.value
      
    const { control, reset, register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({
        defaultValues: {
            barcode : "",
            location : null,
            location1: "",
            description1: "",
            description : "",
            packaging1 : "",
            category1 : "",
            supplier1 : "",
            molecule1 : "",
            indication1 : "",
            indication : null,
            molecule : null,
            packaging : null,
            category : null,
            supplier : null,
            paymentmode: null,
            expirationDate : "",
            alert : 0,
            currency : 1,
            quantity : 0,
            quantity1: 1,
            quantityappro: 1,
            purchase_price : 0,
            selling_price : 0,
        }

    });


    const articlesFormated = useMemo(() => 
        articles.map((article:any) => ({ 
            value: article , // Convertir id en string
            label: article.description ,
        })), 
        [articles]
    );

    const paymentModeFormated = useMemo(() => 
        paymentModes.map((paymentMode:any) => ({ 
            value: paymentMode.id , // Convertir id en string
            label: paymentMode.name ,
        })), 
        [paymentModes]
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
        packagings.map((packaging) => ({ 
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


    useEffect(() => {
        if (paymentModeFormated.length > 0) {
            setValue("paymentmode", paymentModeFormated[0]); // Définir la valeur par défaut
        }
    }, [paymentModeFormated, setValue]);

    
    const dispatch = useDispatch<AppDispatch>();

    // const onSubmit = async ( data: IFormInputs) => {
    
    const onSubmit = async(data: any) => {

        setIsInvoice(true);
        setSubmittedData(data)
    }

    useEffect(() => {
        const handleCreateInvoice = async () => {
            if (isInvoice) {
                const { paymentmode } = submittedData;
            
                const cartDate: any = {
                    paymentmode: paymentmode.value,
                    articles: cart1,
                };
        
                try {
                    // Attendre la fin de la création de la facture
                    const result = await dispatch(createInvoice(cartDate));
            
                    // Si la création de la facture a réussi, exécutez onSubmitProf()
                    if (result.meta.requestStatus === 'fulfilled') {
                        onSubmitProf();
                    } else {
                        console.error('Erreur lors de la création de la facture');
                    }
                } catch (error) {
                    console.error('Erreur dans la création de la facture', error);
                }
            }
        };
        
        handleCreateInvoice();
    }, [isInvoice, submittedData, dispatch, cart1]);

      
    const onSubmit1: SubmitHandler<IFormInputs> = (data) => {

        console.log("DATA ", data);
        

        const id = article.value.id;

        const quantity1 = parseInt(data.quantity1.toString(), 10); // Convertir en entier
        const price_vente = parseFloat(data.purchase_price.toString()); // Convertir en flottant
        const prix_total = quantity1 * price_vente;
    
        // Vérifier si un article avec la même description existe
        const existingItemIndex = cart.findIndex(
            (item) => item.description === data.description
        );
    
        if (existingItemIndex !== -1) {
            // Si l'article existe, mettre à jour la quantité et le prix total
            const updatedCart = [...cart];
            const updatedCart1 = [...cart1];
            updatedCart[existingItemIndex].quantity1 += Number(quantity1);
            updatedCart[existingItemIndex].prix_total += Number(prix_total);
            updatedCart1[existingItemIndex].quantity1 += Number(quantity1);
            updatedCart1[existingItemIndex].prix_total += Number(prix_total);
            setCart(updatedCart);
            setCart1(updatedCart1);
        } else {
            // Ajouter un nouvel article au panier
            const newItem: CartItem = {
            ...data,
            quantity1,
            prix_total,
            };

            const newItem1: CartItem1 = {
            id: article.value.id,
            quantity1,
            prix_total
            }

            setCart([...cart, newItem]);
            setCart1([...cart1, newItem1]);

        }

        console.log("PANIER ",cart1);
        
    
        // Réinitialiser le formulaire après soumission
        // reset();
    };


    const handleChange = (selected: any) => {
        
        setArticle(selected)

        setValue("barcode", selected.value.barcode, { shouldValidate: true });
        setValue("description", selected.value.description, { shouldValidate: true });
        setValue("alert", selected.value.alert, { shouldValidate: true });
        setValue("expirationDate", selected.value.expiration_date, { shouldValidate: true });
        setValue("quantity", selected.value.quantity, { shouldValidate: true });
        setValue("purchase_price", selected.value.selling_price, { shouldValidate: true });
        setValue("selling_price", Number((Number(selected.value.selling_price)/rate).toFixed(3)), { shouldValidate: true });
        setValue('currency', selected.value.currency_id.toString(), { shouldValidate: true });
        setValue('packaging1', selected.value.packaging.name, { shouldValidate: true });
        setValue('category1', selected.value.category.name, { shouldValidate: true });
        setValue('location1', selected.value.placements[0].name, { shouldValidate: true });
        setValue('supplier1', selected.value.suppliers[0].name, { shouldValidate: true });
        setValue('molecule1', selected.value.molecules[0].name, { shouldValidate: true });
        setValue('indication1', selected.value.indications[0].name, { shouldValidate: true });
        


        // Assuming 'content.location' contains the value we need to set for the Select
        const selectedLocation = placementsFormated.find(option => option.label === selected.value.placements[0].name); 

        // Assuming 'content.indication' contains the value we need to set for the Select
        const selectedIndication = indicationsFormated.find(option => option.label === selected.value.indications[0].name); 

        // Assuming 'content.molecule' contains the value we need to set for the Select
        const selectedMolecule = moleculeFormated.find(option => option.label === selected.value.molecules[0].name);  

        // Assuming 'content.location' contains the value we need to set for the Select
        const selectedPackaging = packagingsFormated.find(option => option.label === selected.value.packaging.name);  

        // Assuming 'content.category' contains the value we need to set for the Select
        const selectedCategory = categoriesFormated.find(option => option.label === selected.value.category.name); 

        // Assuming 'content.supplier' contains the value we need to set for the Select
        const selectedSupplier = suppliersFormated.find(option => option.label === selected.value.suppliers[0].name); 
        
        
        console.log(selectedPackaging);
        
        

        if (selectedLocation) {
            // Setting the value for 'location' using react-hook-form's setValue
            setValue("location", selectedLocation, { shouldValidate: true });
        }

        if (selectedIndication) {
            // Setting the value for 'location' using react-hook-form's setValue
            setValue("indication", selectedIndication, { shouldValidate: true });
        }

        if (selectedMolecule) {
            // Setting the value for 'location' using react-hook-form's setValue
            setValue("molecule", selectedMolecule, { shouldValidate: true });
        }

        if (selectedPackaging) {
            // Setting the value for 'location' using react-hook-form's setValue
            setValue("packaging", selectedPackaging, { shouldValidate: true });
        }

        if (selectedCategory) {
            // Setting the value for 'location' using react-hook-form's setValue
            setValue("category", selectedCategory, { shouldValidate: true });
        }

        if (selectedSupplier) {
            // Setting the value for 'location' using react-hook-form's setValue
            setValue("supplier", selectedSupplier, { shouldValidate: true });
        }
    };

    const removeItem = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
        setCart1(cart1.filter((_, i) => i !== index));
    };

    const getTotalPrice = (): number => {
        return cart.reduce((total, item) => total + item.prix_total, 0);
    };


    const changeDollarHandler = (event:any) => {
        setCurrency(true)
        setUsdPaidAmount(Number(event.target.value));
    }

    const changeCdfHandler = (event:any) => {
        setCurrency(false)
        setCdfPaidAmount(Number(event.target.value))
    }

    const  handleChangePaymentMode = (event:any) => {
        setPaymentMode(event.label)
    }

    const formatProducts = (products: typeof cart) => {
        return products.map((product, index) => ({
            barcode: product.barcode,
            description: product.description,
            quantity: cart1[index].quantity1,
            selling_price: product.selling_price,
            prix_total: product.prix_total,
        }));
    };

    const onSubmitProf = () => {

        setIsInvoice(false)
        
        const products = formatProducts(cart);

        window.print();


    }


        return (
            <>

                <div className="hidden print:block" >
                    <Invoice products={formatProducts(cart)} client={clientName} invoicenumber={invoiceNumber.data} isInvoice={isInvoice}  />
                </div>

                <div className="block print:hidden" >
                    <div className="mx-2"  >

                        <form onSubmit={handleSubmit(onSubmit1)}>
        
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
                                            control={control}
                                            defaultValue=""
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

                                <div className="col-span-8  ">
                                    <div className="grid grid-cols-8 gap-2">
                                        <div className=" col-span-1 " >
                                            <div>
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">LOCALISATION</label>
                                            </div>
                                            <div>
                                                <Controller
                                                    name="location1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#4594ff] pl-4 uppercase font-bold  " type="text" readOnly   />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-1 " >
                                            <div>
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">MOLECULE</label>
                                            </div>
                                            <div>
                                                <Controller
                                                    name="molecule1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#4594ff] pl-4 font-bold  uppercase " type="text" readOnly   />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-2 " >
                                            <div>
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">INDICATION</label>
                                            </div>
                                            <div>
                                                <Controller
                                                    name="indication1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#4594ff] pl-4 font-bold uppercase " type="text" readOnly   />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-2 " >
                                            <div>
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">CATEGORIE</label>
                                            </div>
                                            <div>
                                                <Controller
                                                    name="category1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#4594ff] pl-4 font-bold uppercase " type="text" readOnly   />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-1 " >
                                            <div>
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">EMBALLAGE</label>
                                            </div>
                                            <div>
                                                <Controller
                                                    name="packaging1"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#4594ff] font-bold pl-4 uppercase " type="text" readOnly   />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-1 " >
                                            <div>
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">PEREMPTION</label>
                                            </div>
                                            <div>
                                                <Controller
                                                    name="expirationDate"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => <input  className="w-full text-[14px] bg-[#4594ff] font-bold  pl-4 pr-4 uppercase rounded-lg " {...field} type="date" readOnly />}
                                                    rules={{ required: 'La date est requise' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-1 " >
                                            <div className="flex items-center gap-1 " >
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">PV/USD</label>
                                                <Controller
                                                    name="selling_price"
                                                    control={control}
                                                    defaultValue={1}
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-yellow-400 pl-4 font-extrabold uppercase " type="number"  readOnly />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-1 " >
                                            <div className="flex items-center gap-1 " >
                                                <label className="text-[13px] font-medium text-white "  htmlFor="">PV/CDF</label>
                                                <Controller
                                                    name="purchase_price"
                                                    control={control}
                                                    defaultValue={1}
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#4594ff] pl-4 font-extrabold uppercase " type="number"  readOnly />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" col-span-2 " >
                                            <div className="flex items-center " >
                                                <label className=" w-1/2 text-[13px] font-medium text-white "  htmlFor="">QTE STOCK</label>
                                                <Controller
                                                    name="quantity"
                                                    control={control}
                                                    defaultValue={1}
                                                    render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="number" readOnly  />}
                                                    rules={{ required: 'Le code barre est requis' }}
                                                />
                                            </div>
                                        </div>

                                        <div className=" col-start-6 col-span-3 flex items-center gap-2 " >

                                            <div className=" w-1/2 flex gap-2 " >

                                                    <label className="text-[13px] font-medium text-white "  htmlFor="">VENTE</label>
                                                    <Controller
                                                        name="quantity1"
                                                        control={control}
                                                        defaultValue={1}
                                                        render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] pl-4 uppercase " type="number"  max={article?.value?.quantity} />}
                                                        rules={{ required: 'Le code barre est requis' }}
                                                    />

                                            </div>
        
                                            <div className=" w-1/2 " >
                                                <button type="submit" className=" w-full text-center p-2 bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Ajouter</button>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                                <div className=" col-span-4  border-2 border-white p-2 " >
                                    <div className=" col-span-3 space-y-2 " >

                                        <div className=" w-full flex " >
                                            <div>
                                                <h6 className="font-bold" >MODE</h6>
                                            </div>
                                            <div className=" flex items-center  ml-10 gap-2 " >
                                                <input type="radio" />
                                                <h6 className=" font-bold " >FACTURE</h6>
                                            </div>
                                            <div className=" flex items-center ml-2 gap-2 " >
                                                <input type="radio" />
                                                <h6 className=" font-bold " >PROFORMA</h6>
                                            </div>
                                        </div>

                                        <div className=" w-full " >
                                            <label htmlFor="" className=" font-bold " >Num : {invoiceNumber.data} </label>
                                        </div>
                                        
                                        <div className=" w-full  flex " >
                                            <div className=" w-1/2 flex items-center gap-2 " >
                                                <label htmlFor="" className=" font-bold" >Client</label>
                                                <input className=" rounded-sm border-[1px] border-gray-700 py-[2px] px-[2px] text-sm "  type="text" onChange={ (e) => setClientName(e.target.value) } />
                                            </div>
                                        </div>

                                        {/* <div className=" w-full  pl-[58px] " >
                                            <div className=" w-1/2 flex items-center gap-2 " >
                                                <button type="button" onClick={onSubmitProf} className="col-span-1 h-8 bg-[#4594ff] text-white rounded text-sm transition hover:bg-blue-500 px-4 " >
                                                    Imprimer proforma
                                                </button>
                                            </div>
                                        </div> */}
                                        
                                                            
                                    </div>
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
                                                <th className=" border border-gray-500 text-left pl-1 ">QTE</th>
                                                <th className=" border border-gray-500 text-left pl-1 ">Prix unitaire</th>
                                                <th className=" border border-gray-500 text-left pl-1 ">Prix total</th>
                                                <th className=" border border-gray-500 text-left pl-1 ">Emballage</th>
                                                <th className=" border border-gray-500 text-left pl-1 ">Molécule</th>
                                                <th className=" border border-gray-500 text-left pl-1 ">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item, index) => (
                                            <tr key={index} className="bg-white border text-gray-700 border-gray-600">
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.location1}</td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.description}</td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.quantity1}</td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.purchase_price.toFixed(2)}</td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.prix_total.toFixed(2)}</td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.packaging?.label} </td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">{item.molecule?.label}</td>
                                                <td className=" border border-gray-500 pl-1 uppercase text-[13px] font-bold ">
                                                <button onClick={() => removeItem(index)} className="bg-red-600 text-white px-2 py-1 rounded-lg">Supprimer</button>
                                                </td>
                                            </tr>


                                            ))}
                                        </tbody>

                                        {/* <td className="px-4 py-2">{item.location?.label}</td>
                                    <td className="px-4 py-2">{item.description}</td>
                                    <td className="px-4 py-2">{item.quantity1}</td>
                                    <td className="px-4 py-2">{item.selling_price.toFixed(2)}</td>
                                    <td className="px-4 py-2">{item.prix_total.toFixed(2)}</td>
                                    <td className="px-4 py-2">{item.packaging?.label}</td>
                                    <td className="px-4 py-2">{item.molecule?.label}</td> */}
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

                                <div className="px-4 bg-[#7288a5d0] shadow-lg">
                                {/* Header Section */}

                                    <div className="grid grid-cols-9   ">
                                        <div className="col-span-8  ">
                                            <h1 className="text-sm font-extrabold ">Total</h1>
                                        </div>
                                        <div className="col-span-1 text-left ">
                                            <h1 className="text-sm font-extrabold ">Différence</h1>
                                        </div>
                                    </div>

                                    {/* Main Content Section */}
                                    <div className="grid grid-cols-9 gap-2 ">
                                        {/* Facture Section */}
                                        <div className="col-span-2 flex items-center gap-2  ">
                                            <div className="grid grid-cols-2 w-full text-sm">
                                                <div className="  " >
                                                    <h1 className=" font-extrabold ">Facture</h1>
                                                </div>
                                                <div className="text-right bg-green-700 mb-1 p-1 ">
                                                    <h1 className="font-extrabold ">{getTotalPrice().toFixed(2)}</h1>
                                                </div>
                                                <div>
                                                <h1 className="font-extrabold ">Remise</h1>
                                                </div>
                                                <div className="text-right bg-green-700 mb-1 p-1">
                                                    <h1 className="font-extrabold ">0</h1>
                                                </div>
                                                <div>
                                                    <h1 className=" font-extrabold ">À Payer</h1>
                                                </div>
                                                <div className="text-right bg-green-700 p-1">
                                                    <h1 className="font-extrabold ">{getTotalPrice().toFixed(2)}</h1>
                                                </div>
                                            </div>
                                            <div className="bg-green-700 h-full flex items-center p-1 " >
                                                <h1 className="text-sm font-extrabold ">CDF</h1>
                                            </div>
                                        </div>

                                        {/* USD Section */}
                                        <div className="col-span-2 flex items-center gap-2 ">
                                            <div className="grid grid-cols-1 w-full text-sm">
                                                <div className="text-right bg-yellow-400 p-1 mb-1">
                                                    <h1 className="font-extrabold ">{(getTotalPrice()/rate).toFixed(2)}</h1>
                                                </div>
                                                <div className="text-right bg-yellow-400 p-1 mb-1">
                                                    <h1 className="font-extrabold ">0</h1>
                                                </div>
                                                <div className="text-right bg-yellow-400 p-1">
                                                    <h1 className="font-extrabold ">{(getTotalPrice()/rate).toFixed(2)}</h1>
                                                </div>
                                            </div>
                                            <div className=" bg-yellow-400 h-full flex items-center p-1 " >
                                                <h1 className="font-extrabold ">USD</h1>
                                            </div>
                                        </div>

                                        {/* Montant Payé Section */}
                                        <div className="col-span-2 flex items-center gap-2  ">
                                            <div className="grid grid-cols-2 w-full text-sm">
                                                <div className=" ml-2 " >
                                                    <h1 className="font-extrabold">Montant payé</h1>
                                                </div>
                                                <div className="text-right">
                                                    <input
                                                        type="number"
                                                        // value={cdfPaidAmount}
                                                        className="w-full text-red-800 font-bold bg-green-700 h-8 py-4 border border-gray-300 mb-2 rounded text-center text-sm"
                                                        onChange={(event) => changeCdfHandler(event) }
                                                    />
                                                </div>
                                                <div className=" ml-2 " >
                                                    <h1 className="font-extrabold ">Remise</h1>
                                                </div>
                                                <div className="text-center text-red-800 bg-green-700 mt-1 p-2 ">
                                                    <h1 className="font-extrabold">0</h1>
                                                </div>
                                            </div>
                                            <div className=" bg-green-700 flex items-center h-full p-1" >
                                                <h1 className="text-sm font-extrabold">CDF</h1>
                                            </div>
                                        </div>

                                        {/* Montant Payé USD */}
                                        <div className="col-span-2 flex items-center gap-2 p-2">
                                            <div className="grid grid-cols-1 w-full text-sm">
                                                <div className="text-right mb-2 ">
                                                    <input
                                                        type="number"
                                                        // value={usdPaidAmount}
                                                        onChange={(event) => changeDollarHandler(event) }
                                                        className="w-full h-8 p-1 bg-yellow-400  border border-gray-300 rounded text-center text-sm"
                                                    />
                                                </div>
                                                <div className="flex justify-center bg-yellow-400 p-2 ">
                                                    <h1 className="text-center font-medium text-gray-800">0</h1>
                                                </div>
                                            </div>
                                            <div className="bg-yellow-400 h-full flex items-center p-1 " >
                                                <h1 className="text-sm font-bold ">USD</h1>
                                            </div>
                                        </div>

                                        {/* Différence en USD et en CDF */}
                                        <div className="flex items-center gap-2 p-2">
                                            <div className="grid grid-cols-1 w-full text-sm">
                                                <div className="bg-green-700 mb-2 p-1 ">
                                                    <h1 className="text-center font-bold text-gray-800">
                                                        { 
                                                            ((cdfPaidAmount ?? 0) > 0 || (usdPaidAmount ?? 0) > 0) ? (
                                                                `${ !currency 
                                                                    ? (( (cdfPaidAmount ?? 0) - getTotalPrice() ).toFixed(2)) 
                                                                    : (( (usdPaidAmount ?? 0) * rate - getTotalPrice() ).toFixed(2)) }`
                                                            ) : (
                                                                (0).toFixed(2)
                                                            )
                                                        }
                                                    </h1>
                                                </div>
                                                <div className="bg-green-700 p-1">
                                                    <h1 className="text-center font-bold text-gray-800">
                                                        { 
                                                            ((cdfPaidAmount ?? 0) > 0 || (usdPaidAmount ?? 0) > 0) ? (
                                                                ` ${ !currency 
                                                                    ? ((( (cdfPaidAmount ?? 0) - getTotalPrice()) / rate).toFixed(2)) 
                                                                    : (((usdPaidAmount ?? 0) - (getTotalPrice() / rate)).toFixed(2)) } ` 
                                                            ) : (
                                                                (0).toFixed(2)
                                                            )
                                                        }
                                                    </h1>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h1 className="text-sm font-bold ">CDF</h1>
                                                </div>
                                                <div>
                                                    <h1 className="text-sm font-bold text-red-800">USD</h1>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Footer Section */}
                                    <div className="grid grid-cols-9 gap-2">
                                        <div className="col-span-3 flex items-center gap-2  p-2 rounded">
                                        <h1 className="text-sm text-gray-600">Type Vente</h1>
                                        {/* <input
                                            type="text"
                                            className="w-20 h-8 p-1 border border-gray-300 rounded text-sm"
                                        /> */}

                                            <Controller
                                                name="paymentmode"
                                                control={control}
                                                // defaultValue={paymentModeFormated[0]}
                                                render={({ field }) => (
                                                    <Select
                                                    {...field}
                                                    options={paymentModeFormated}
                                                    className="text-sm z-50  rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    menuPlacement="top" 
                                                    />
                                                )}

                                                rules={{ required: 'Le type de vente est requis' }}
                                            />


                                        {/* <span className="text-sm font-medium text-gray-800">{paymentMode}</span> */}
                                        </div>

                                        <div className="col-start-6 col-span-4 ">
                                            <div className="grid grid-cols-5 gap-2">
                                                <button type="button" onClick={handleSubmit(onSubmit)}  className="col-span-1 h-8 bg-[#4594ff] text-white rounded text-sm transition hover:bg-blue-500">
                                                Enregistrer
                                                </button>
                                                <button className="col-span-1 h-8 bg-red-600 text-white rounded text-sm transition hover:bg-red-500">
                                                Annuler
                                                </button>
                                                <input
                                                type="text"
                                                className="col-span-1 h-8 p-1 border border-gray-300 rounded text-sm"
                                                />
                                                <div className="col-span-1 flex items-center gap-2">
                                                <label className="flex items-center gap-1">
                                                    <input type="checkbox" />
                                                    <span className="text-sm">F/P</span>
                                                </label>
                                                <label className="flex items-center gap-1">
                                                    <input type="checkbox" />
                                                    <span className="text-sm">B/L</span>
                                                </label>
                                                </div>
                                                <button className="col-span-1 h-8 bg-yellow-500 text-white rounded text-sm transition hover:bg-yellow-400">
                                                Reprint
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>

                            </div>
                        </div>

                    </div>



                    
                </div>

            </>
        )
}
