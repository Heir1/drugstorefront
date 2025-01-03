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
import { OptionsOrGroups, GroupBase } from "react-select";
import { useSupplierService } from '@/app/redux/slices/suppliers/useSuppliseService';
import { useMoleculeService } from '@/app/redux/slices/molecules/useMoleculeService';
import { useIndicationService } from '@/app/redux/slices/indications/useIndicationService';
import { usePlacementService } from '@/app/redux/slices/placements/usePlacementService';
import Loading from '@/app/components/loading';
import dynamic from 'next/dynamic';
import { log } from 'console';
// Dynamically import React Select without SSR
const Select = dynamic(() => import('react-select'), { ssr: false });


interface IFormInputs {
    barcode: string;
    location: { value: string; label: string } | null;
    description: string;
    indication: { value: string; label: string } | null;
    molecule: { value: string; label: string } | null;
    packaging: { value: string; label: string } | null;
    category: { value: string; label: string } | null;
    supplier: { value: string; label: string } | null;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    purchase_price: number;
    selling_price: number;
  }

  interface ArticleFormUpdateprops {
    content: any;
    setIsUpdateFormOpen: (value: boolean) => void; // Type for the function prop
}


export default function FormArticleUpdate({content, setIsUpdateFormOpen}:ArticleFormUpdateprops) {

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
      
        const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({
            defaultValues: {
                barcode : "",
                location : null,
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
                purchase_price : 0,
                selling_price : 0,
            }
        });

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


        useEffect(() => {
        
            if (content) {
                // alert("")
                console.log(content);
                
                // console.log(`${content?.types.name}%${content?.types?.id}`);
                console.log(content.barcode);
                console.log(content.description);
                
                setValue("barcode", content.barcode, { shouldValidate: true });
                setValue("description", content.description, { shouldValidate: true });
                setValue("alert", content.alert, { shouldValidate: true });
                setValue("expirationDate", content.expiration_date, { shouldValidate: true });
                setValue("quantity", content.quantity, { shouldValidate: true });
                setValue("purchase_price", content.purchase_price, { shouldValidate: true });
                setValue("selling_price", content.selling_price, { shouldValidate: true });
                setValue('currency', content.currency_id.toString(), { shouldValidate: true });

                // Assuming 'content.location' contains the value we need to set for the Select
                const selectedLocation = placementsFormated.find(option => option.label === content.placements[0].name); 

                // Assuming 'content.indication' contains the value we need to set for the Select
                const selectedIndication = indicationsFormated.find(option => option.label === content.indications[0].name); 

                // Assuming 'content.molecule' contains the value we need to set for the Select
                const selectedMolecule = moleculeFormated.find(option => option.label === content.molecules[0].name);  

                // Assuming 'content.location' contains the value we need to set for the Select
                const selectedPackaging = packagingsFormated.find(option => option.label === content.packaging.name);  

                // Assuming 'content.category' contains the value we need to set for the Select
                const selectedCategory = categoriesFormated.find(option => option.label === content.category.name); 

                // Assuming 'content.supplier' contains the value we need to set for the Select
                const selectedSupplier = suppliersFormated.find(option => option.label === content.suppliers[0].name); 


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

                // setValue("family", `${content?.family.name}%${content?.family?.id}`, { shouldValidate: true });
                // setValue("forme", `${content?.forme.name}%${content?.forme?.id}`, { shouldValidate: true });
                // setValue("category", `${content?.category.name}%${content?.category?.id}`, { shouldValidate: true });
                // setValue("types", `${content?.types.name}%${content?.types?.id}`, { shouldValidate: true });
                // setValue("paquetage",`${content?.paquetage.name}%${content?.paquetage?.id}`, { shouldValidate: true });
                // setValue("description", content.description, { shouldValidate: true });
            }
        }, [content,setValue, placementsFormated, packagingsFormated]);

      
      
        const onSubmit = async (data: IFormInputs) => {
    
            console.log(data);
            
      
          const { barcode, location, description, indication, molecule, packaging, category, supplier,alert, expirationDate, quantity, purchase_price, selling_price , currency  } = data
    
          
      
          const articleData:IArticle = {
            barcode: barcode,
            placements : [Number(location?.value)],
            description ,
            indications : [Number(indication?.value)],
            molecules : [Number(molecule?.value)],
            quantity : quantity ,
            expiration_date: expirationDate,
            category_id: Number(category?.value),
            suppliers : [Number(supplier?.value)],
            packaging_id: Number(packaging?.value),
            selling_price,
            purchase_price,
            alert : Number(alert),
            currency_id: Number(currency) 
          }
    
          console.log(articleData);
          
      
            try {
                await dispatch(updateArticle({ id : content.id, data : articleData}));
          
            } catch (err) {
                // Handle errors that happen outside the action (e.g., network failures)
                // setOpenForm(false);
                console.error(err);
            }
      
        };

        return (
            <>
                <div className="fixed z-40 left-0 top-0  w-full h-screen bg-[#00000040]" onClick={()=> setIsUpdateFormOpen(false)}>
                </div>
                <div className=" fixed z-50 top-[15%] left-[0%] mx-5 "  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-11  gap-x-5 p-5 " >
                            <div className="col-span-6 bg-white p-10  rounded-xl space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm " htmlFor="">Code barre</label>
                                        <Controller
                                            name="barcode"
                                            control={control}
                                            // defaultValue=""
                                            render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " type="text" />}
                                            rules={{ required: 'Le code barre est requis' }}
                                        />
                                    </div>
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Localisation</label>
                                        <Controller
                                            name="location"
                                            control={control}
                                            
                                            render={({ field }) => (
                                            <Select
                                                id="location"
                                                {...field}
                                                options={placementsFormated}
                                                placeholder="Sélectionnez la localisation du produit"
                                                isClearable
                                            />
                                            )}
                                            rules={{ required: 'La localisation est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Description</label>
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                            rules={{ required: 'La description est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Indication</label>
                                        <Controller
                                            name="indication"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={indicationsFormated}
                                                    placeholder="Sélectionnez une indication"
                                                    isClearable
                                                />
                                            )}
                                            rules={{ required: 'L indication est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Molécule</label>
                                        <Controller
                                            name="molecule"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={moleculeFormated}
                                                    placeholder="Sélectionnez un molécule"
                                                    isClearable
                                                />
                                            )}
                                            rules={{ required: 'Le molécule est requis' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Emballage</label>
                                        <Controller
                                            name="packaging"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={packagingsFormated}
                                                    placeholder="Sélectionnez le type d'emballage "
                                                    isClearable
                                                />
                                            )}
                                            rules={{ required: 'L emballage est requis' }}
                                        />
                                    </div>
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Catégorie</label>
                                        <Controller
                                            name="category"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={categoriesFormated}
                                                    placeholder="Sélectionnez une categprie"
                                                    isClearable
                                                />
                                            )}
                                            rules={{ required: 'La catégorie est requise' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 bg-white rounded-xl p-10 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Fournisseur</label>
                                        <Controller
                                            name="supplier"
                                            control={control}
                                            
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    options={suppliersFormated}
                                                    placeholder="Sélectionnez un fournisseur"
                                                    isClearable
                                                />
                                            )}
                                            rules={{ required: 'Le fournisseur est requis' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Alerte</label>
                                        <Controller
                                            name="alert"
                                            control={control}
                                            render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                            rules={{ required: 'L alerte est requise' }}
                                        />
                                    </div>
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Péremption</label>
                                        <Controller
                                            name="expirationDate"
                                            control={control}
                                            render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg " {...field} type="date" />}
                                            rules={{ required: 'La date est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-5">
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">Quantité</label>
                                        <Controller
                                            name="quantity"
                                            control={control}
                                            render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                            rules={{ required: 'La quantité est requise' }}
                                        />
                                    </div>
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">P.A</label>
                                        <Controller
                                            name="purchase_price"
                                            control={control}
                                            render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                            rules={{ required: 'Le prix dachat est requis' }}
                                        />
                                    </div>
                                    <div className="space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">P.V</label>
                                        <Controller
                                            name="selling_price"
                                            control={control}
                                            render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" {...field} type="number" />}
                                            rules={{ required: 'Le prix de vente est requis' }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-5 ">
                                    <div className=" flex justify-between items-end pb-3 " >

                                            <Controller
                                                name="currency"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <div className=" w-1/3 flex justify-between items-center">
                                                            <input
                                                                type="radio"
                                                                id="USD"
                                                                value={1}
                                                                {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                            />
                                                            <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                                        </div>
                                                        <div className=" w-1/3 flex justify-between items-center">
                                                            <input
                                                                type="radio"
                                                                id="CDF"
                                                                value={2}
                                                                {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                            />
                                                            <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                                        </div>
                                                    </>
                                                )}
                                                rules={{ required: 'La monnaie est requise' }}
                                            />
                                    </div>
                                    <div className=" col-span-2  space-y-2" >
                                        <label className=" font-semibold text-sm" htmlFor="">TAUX MB</label>
                                        <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4" value={1.25} type="number" name="" id="" readOnly/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 pt-8 ">
                                    <div className=" " >
                                        <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " onClick={()=> setIsUpdateFormOpen(false)}>Annuler</button>
                                    </div>
                                    <div className="" >
                                        <button type="submit" className=" w-full text-center p-2 bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Modifier</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </form>
                </div>
            </>
        
        )

}
