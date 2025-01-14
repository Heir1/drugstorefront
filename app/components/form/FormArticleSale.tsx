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
import { useRateService } from '@/app/redux/slices/rates/useRateService';
// Dynamically import React Select without SSR
const Select = dynamic(() => import('react-select'), { ssr: false });


interface IFormInputs {
    id: string;
    barcode: string;
    location: { value: string; label: string } | null;
    description: string;
    description1: string;
    indication: { value: string; label: string } | null;
    molecule: { value: string; label: string } | null;
    packaging: { value: string; label: string } | null;
    category: { value: string; label: string } | null;
    supplier: { value: string; label: string } | null;
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

    const [article, setArticle] = useState<any>(null)

    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { suppliers, supplierStatus, supplierError } = useSupplierService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { placements, placementStatus, placementError } = usePlacementService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();

    
    const [isNewArticle, setIsNewArticle] = useState(true);
    const [isUpdateArticle, setIsUpdateArticle] = useState(false);
    const [isStateArticle, setIsStateArticle] = useState(false);
    const [isExportArticle, setIsExportArticle] = useState(false);
    const [isReportArticle, setIsReportArticle] = useState(false);

    const [ cdfPaidAmount, setCdfPaidAmount ] = useState(0)
    const [ usdPaidAmount, setUsdPaidAmount ] = useState(0)
    const [ currency, setCurrency ] = useState(false);

    const { rates } = useRateService()

    const rate = rates[0]?.value
      
    const { control, reset, register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({
        defaultValues: {
            barcode : "",
            location : null,
            description1: "",
            description : "",
            indication : null,
            molecule : null,
            packaging : null,
            category : null,
            supplier : null,
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

    
        
        const dispatch = useDispatch<AppDispatch>();

        const onSubmit = () => {

            console.log("PANIER1",cart1);
            // articles

            const cartDate = {
                "articles" : cart1 
            }


        }

        // [
        //     {
        //         "id": "5",
        //         "quantity1": 2,
        //         "prix_total": 5000
        //     },
        //     {
        //         "id": "3",
        //         "quantity1": 2,
        //         "prix_total": 7500
        //     }
        // ]

      
        const onSubmit1: SubmitHandler<IFormInputs> = (data) => {

            console.log("ARTICLE ",article.value.id);
            

            const id = article.value.id;

            const quantity1 = parseInt(data.quantity1.toString(), 10); // Convertir en entier
            const price_vente = parseFloat(data.selling_price.toString()); // Convertir en flottant
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
            setValue("purchase_price", selected.value.purchase_price, { shouldValidate: true });
            setValue("selling_price", selected.value.selling_price, { shouldValidate: true });
            setValue('currency', selected.value.currency_id.toString(), { shouldValidate: true });


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
        

        return (
            <>
                <div className="mx-2"  >
                    {/* <form  > */}

                    {/* </form> */}
                    <form onSubmit={handleSubmit(onSubmit1)}>

                        <div className="flex justify-start bg-gray-50 rounded-xl shadow-lg p-5 mx-5 gap-8 items-center">
                        {/* Label Section */}
                        <div className="w-1/3 flex flex-col items-start pl-10">
                            <label className="font-semibold text-sm text-gray-700">
                            Recherche d'article
                            </label>
                        </div>

                        {/* Input Section */}
                        <div className="w-2/3">
                            <Controller
                            name="description1"
                            control={control}
                            render={({ field }) => (
                                <Select
                                {...field}
                                value={article}
                                options={articlesFormated}
                                onChange={handleChange}
                                placeholder="Sélectionnez un article"
                                className="text-sm rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                            />
                        </div>
                        </div>


                        <div className="grid grid-cols-11  gap-x-5 p-5 bg-white mx-5 my-2  rounded-xl space-y-2 shadow-[0px_4px_8px_0px_#00000026]" >
                            <div className="col-span-8 ">
                                <div className="grid grid-cols-4 gap-5">

                                    <div className="space-y-1" >
                                        <label className=" font-semibold text-sm " htmlFor="">Code barre</label>
                                        <Controller
                                            name="barcode"
                                            control={control}
                                            // defaultValue=""
                                            render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" readOnly />}
                                            rules={{ required: 'Le code barre est requis' }}
                                        />
                                    </div>

                                    <div className="space-y-1" >
                                        <label className=" font-semibold text-sm" htmlFor="">Localisation</label>
                                        <Controller
                                            name="location"
                                            control={control}
                                            
                                            render={({ field }) => (
                                            <Select
                                                id="location"
                                                {...field}
                                                options={placementsFormated}
                                                // placeholder="Sélectionnez la localisation du produit"
                                                isClearable
                                                isDisabled
                                            />
                                            )}
                                            rules={{ required: 'La localisation est requise' }}
                                        />
                                    </div>

                                    <div className="space-y-1" >
                                        <label className=" font-semibold text-sm" htmlFor="">Indication</label>
                                        <Controller
                                            name="indication"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={indicationsFormated}
                                                    // placeholder="Sélectionnez une indication"
                                                    isClearable
                                                    isDisabled
                                                />
                                            )}
                                            rules={{ required: 'L indication est requise' }}
                                        />
                                    </div>

                                    <div className="space-y-1" >
                                        <label className=" font-semibold text-sm" htmlFor="">Emballage</label>
                                        <Controller
                                            name="packaging"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={packagingsFormated}
                                                    // placeholder="Sélectionnez le type d'emballage "
                                                    isClearable
                                                    isDisabled
                                                />
                                            )}
                                            rules={{ required: 'L emballage est requis' }}
                                        />
                                    </div>
                                    
                                    <div className="space-y-1" >
                                        <label className=" font-semibold text-sm" htmlFor="">Catégorie</label>
                                        <Controller
                                            name="category"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={categoriesFormated}
                                                    // placeholder="Sélectionnez une categprie"
                                                    isClearable
                                                    isDisabled
                                                />
                                            )}
                                            rules={{ required: 'La catégorie est requise' }}
                                        />
                                    </div>
 

                                    <div className="space-y-1" >
                                        <div className="grid grid-cols-2 gap-2 ">
                                            <div>
                                                <label className=" font-semibold text-sm" htmlFor="">PU USD</label>
                                                <Controller
                                                    name="selling_price"
                                                    control={control}
                                                    render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" readOnly />}
                                                    rules={{ required: 'La quantité est requise' }}
                                                />
                                            </div>
                                            <div>
                                                <label className=" font-semibold text-sm" htmlFor="">PU CDF</label>
                                                <Controller
                                                    name="selling_price"
                                                    control={control}
                                                    render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number"readOnly />}
                                                    rules={{ required: 'La quantité est requise' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1" >
                                        <div className="grid grid-cols-2 gap-2 ">
                                            <div>
                                                <label className=" font-semibold text-sm" htmlFor="">STOCK</label>
                                                <Controller
                                                    name="quantity"
                                                    control={control}
                                                    render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number"readOnly />}
                                                    rules={{ required: 'La quantité est requise' }}
                                                />
                                            </div>
                                            <div>
                                                <label className=" font-semibold text-sm" htmlFor="">VENTE</label>
                                                <Controller
                                                    name="quantity1"
                                                    control={control}
                                                    render={({ field }) => <input min={1} max={article?.value?.quantity}  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                                    rules={{ required: 'La quantité est requise' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1" >
                                        <div className="grid grid-cols-3 gap-2 ">
                                            <div className="col-span-2" >
                                                <label className=" font-semibold text-sm " htmlFor="">Péremption</label>
                                                <Controller
                                                    name="expirationDate"
                                                    control={control}
                                                    render={({ field }) => <input  className="w-full text-[14px] h-10 pl-4 pr-4 uppercase rounded-lg font-bold border-[1px] border-black" {...field} type="date" />}
                                                    rules={{ required: 'La date est requise' }}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-end " >
                                                <button 
                                                    // onClick={handleSubmit(onSubmit1)} 
                                                    type='submit'
                                                    className=" w-full text-center p-[10px] bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Ajouter</button>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>          
                            <div className=" col-span-3 flex " >
                                
                                
                                <div className="w-1/3 flex justify-center items-center">
                                    <label className="text-[12px] text-sm font-semibold" htmlFor="USD">
                                        MODE
                                    </label>
                                </div>

                                <Controller
                                name="currency"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="w-1/3 flex  items-center">
                                            <input
                                                type="radio"
                                                id="USD"
                                                value={1}
                                                checked={field.value === 1} // Check if the value matches 1
                                                onChange={(e) => field.onChange(Number(e.target.value))} // Update the value
                                            />
                                            <label className="text-[12px] text-sm font-semibold mx-2 " htmlFor="USD">
                                                PRO FORMA
                                            </label>
                                        </div>

                                        <div className="w-1/3 flex items-center">
                                            <input
                                                type="radio"
                                                id="CDF"
                                                value={2}
                                                checked={field.value === 2} // Check if the value matches 2
                                                onChange={(e) => field.onChange(Number(e.target.value))} // Update the value
                                            />
                                            <label className="text-[12px] text-sm font-semibold mx-2" htmlFor="CDF">
                                                FACTURE
                                            </label>
                                        </div>
                                    </>
                                )}
                                rules={{ required: 'La monnaie est requise' }} // Validation rule
                                />
                                                    
                            </div>
                            
                        </div>  

                    </form>
                </div>


                <div className="mx-7 p-10 shadow-[0px_4px_8px_0px_#00000026] bg-white  rounded-xl" >
                    <table className="table-auto w-full bg-white shadow-md rounded">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">LOC</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Quantité</th>
                            <th className="px-4 py-2">Prix Unitaire</th>
                            <th className="px-4 py-2">Prix Total</th>
                            <th className="px-4 py-2">Emballage</th>
                            <th className="px-4 py-2">Molécule</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                        </thead>
                        {cart.length === 0 ? (
                            <tbody>
                                <tr className="text-gray-600 p-3 ">
                                    <td>Aucun article dans le panier.</td> 
                                </tr>
                            </tbody>
                        ) : (
                        <tbody>
                        {cart.map((item, index) => (
                            <tr key={index} className="border-t">
                            <td className="px-4 py-2">{item.location?.label}</td>
                            <td className="px-4 py-2">{item.description}</td>
                            <td className="px-4 py-2">{item.quantity1}</td>
                            <td className="px-4 py-2">{item.selling_price.toFixed(2)}</td>
                            <td className="px-4 py-2">{item.prix_total.toFixed(2)}</td>
                            <td className="px-4 py-2">{item.packaging?.label}</td>
                            <td className="px-4 py-2">{item.molecule?.label}</td>
                            <td className="px-4 py-2">
                                <button
                                onClick={() => removeItem(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                Supprimer
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                        )}
                    </table>

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-lg">
                    {/* Header Section */}

                    <div className="grid grid-cols-9  mb-4 ">
                        <div className="col-span-8  ">
                            <h1 className="text-sm font-medium text-gray-700">Total</h1>
                        </div>
                        <div className="col-span-1 text-left ">
                            <h1 className="text-sm font-medium text-gray-700">Différence</h1>
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div className="grid grid-cols-9 gap-2 mb-4">
                        {/* Facture Section */}
                        <div className="col-span-2 flex items-center gap-2 p-2 bg-white rounded border border-gray-900 ">
                            <div className="grid grid-cols-2 w-full text-sm">
                                <div>
                                <h1 className="text-gray-600">Facture</h1>
                                </div>
                                <div className="text-right">
                                <h1 className="font-medium text-gray-800">{getTotalPrice().toFixed(2)}</h1>
                                </div>
                                <div>
                                <h1 className="text-gray-600">Remise</h1>
                                </div>
                                <div className="text-right">
                                <h1 className="font-medium text-gray-800">0</h1>
                                </div>
                                <div>
                                <h1 className="text-gray-600">À Payer</h1>
                                </div>
                                <div className="text-right">
                                <h1 className="font-medium text-gray-800">{getTotalPrice().toFixed(2)}</h1>
                                </div>
                            </div>
                            <h1 className="text-sm font-medium text-blue-600">CDF</h1>
                        </div>

                        {/* USD Section */}
                        <div className="col-span-2 flex items-center gap-2 p-2 bg-white rounded border border-gray-900">
                            <div className="grid grid-cols-1 w-full text-sm">
                                <div className="text-right">
                                <h1 className="font-medium text-gray-800">{(getTotalPrice()/rate).toFixed(2)}</h1>
                                </div>
                                <div className="text-right">
                                <h1 className="font-medium text-gray-800">0</h1>
                                </div>
                                <div className="text-right">
                                <h1 className="font-medium text-gray-800">{(getTotalPrice()/rate).toFixed(2)}</h1>
                                </div>
                            </div>
                            <h1 className="text-sm font-medium text-green-600">USD</h1>
                        </div>

                        {/* Montant Payé Section */}
                        <div className="col-span-2 flex items-center gap-2 p-2 bg-white rounded border border-gray-900">
                            <div className="grid grid-cols-2 w-full text-sm">
                                <div>
                                <h1 className="text-gray-600">Montant payé</h1>
                                </div>
                                <div className="text-right">
                                <input
                                    type="number"
                                    value={cdfPaidAmount}
                                    className="w-full h-8 p-1 border border-gray-300 rounded text-center text-sm"
                                    onChange={(event) => changeCdfHandler(event) }
                                />
                                </div>
                                <div>
                                <h1 className="text-gray-600">Remise</h1>
                                </div>
                                <div className="text-center">
                                <h1 className="font-medium text-gray-800">0</h1>
                                </div>
                            </div>
                            <h1 className="text-sm font-medium text-blue-600">CDF</h1>
                        </div>

                        {/* Montant Payé USD */}
                        <div className="col-span-2 flex items-center gap-2 p-2 bg-white rounded border border-gray-800">
                            <div className="grid grid-cols-1 w-full text-sm">
                                <div className="text-right">
                                <input
                                    type="number"
                                    value={usdPaidAmount}
                                    onChange={(event) => changeDollarHandler(event) }
                                    className="w-full h-8 p-1 border border-gray-300 rounded text-center text-sm"
                                />
                                </div>
                                <div className="flex justify-center">
                                <h1 className="text-center font-medium text-gray-800">0</h1>
                                </div>
                            </div>
                            <h1 className="text-sm font-medium text-green-600">USD</h1>
                        </div>

                        {/* Différence en USD et en CDF */}
                        <div className="flex items-center gap-2 p-2 bg-white rounded border border-gray-800">
                            <div className="grid grid-cols-1 w-full text-sm">
                                <div className="">
                                    <h1 className="text-center font-medium text-gray-800">
                                        { 
                                            (cdfPaidAmount > 0 || usdPaidAmount > 0) ? (
                                                ` ${ !currency ? ((cdfPaidAmount-getTotalPrice()).toFixed(2)) : ((usdPaidAmount*rate-getTotalPrice()).toFixed(2)) } ` 
                                            )
                                            :
                                            (
                                                (0).toFixed(2)
                                            )
                                        }
                                    </h1>
                                </div>
                                <div className="">
                                    <h1 className="text-center font-medium text-gray-800">
                                        { 
                                            (cdfPaidAmount > 0 || usdPaidAmount > 0) ? (
                                                ` ${ !currency ? (((cdfPaidAmount-getTotalPrice())/rate).toFixed(2)) : ((usdPaidAmount-getTotalPrice()/rate).toFixed(2)) } ` 
                                            )
                                            :
                                            (
                                                (0).toFixed(2)
                                            )
                                        }
                                    </h1>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className="text-sm font-medium text-green-600">CDF</h1>
                                </div>
                                <div>
                                    <h1 className="text-sm font-medium text-green-600">USD</h1>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Section */}
                    <div className="grid grid-cols-9 gap-2">
                        <div className="col-span-2 flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                        <h1 className="text-sm text-gray-600">Type Vente</h1>
                        <input
                            type="text"
                            className="w-20 h-8 p-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm font-medium text-gray-800">CASH</span>
                        </div>

                        <div className="col-start-6 col-span-4 bg-white p-2 rounded border border-gray-200">
                        <div className="grid grid-cols-5 gap-2">
                            <button onClick={handleSubmit(onSubmit)}  className="col-span-1 h-8 bg-blue-600 text-white rounded text-sm transition hover:bg-blue-500">
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

            </>
        )
}
