"use client"
import React from 'react'
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
import { createArticle } from '@/app/redux/slices/articles/actions';
import IPackaging from '@/app/interfaces/packaging';
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import { useCurrencyService } from '@/app/redux/slices/currencies/useCurrencyService';


interface IFormInputs {
    barcode: string;
    location: string;
    description: string;
    indication: string;
    molecule: string;
    packaging: string;
    category: string;
    supplier: string;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    purchase_price: number;
    selling_price: number;
  }


//   type FormValues = {
//     currency: 'USD' | 'EUR'; // Champ de type devise avec deux choix possibles
//   };

export default function Old() {

    const { articles, articleStatus, error } = useArticleService()  
    const { packagings, packagingStatus, packagingError } = usePackagingService()
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { currencies, currencyStatus, currencyError } = useCurrencyService();
  
    const { control, register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            barcode : "",
            location : "",
            description : "",
            indication : "",
            molecule : "",
            packaging : "",
            category : "",
            supplier : "",
            expirationDate : "",
            alert : 0,
            currency : 1,
            quantity : 0,
            purchase_price : 0,
            selling_price : 0,
        }
    });




    // const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    // const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    //     defaultValues: {
    //       currency: 'USD', // Valeur par défaut pour currency
    //     }
    //   });



  
    const dispatch = useDispatch<AppDispatch>();
  
  
    const onSubmit = async (data: IFormInputs) => {
  
      const { barcode, category, currency,  description, packaging, quantity, expirationDate, alert, purchase_price, selling_price  } = data

      
  
      const articleData:IArticle = {
        barcode: barcode,
        description ,
        quantity : quantity ,
        expiration_date: expirationDate,
        category_id: Number(category),
        packaging_id: Number(packaging),
        selling_price,
        purchase_price,
        alert : false,
        currency_id: Number(currency) 
      }

      console.log(articleData);
      
  
    //     try {
    //         await dispatch(createArticle(articleData));
      
    //     } catch (err) {
    //         // Handle errors that happen outside the action (e.g., network failures)
    //         // setOpenForm(false);
    //         console.error(err);
    //     }
  
    };


    // const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     console.log('Form Data:', data); // Affiche la devise choisie dans la console
    // };


    // const onSubmit = (data: FormValues) => {
    //     console.log('Form Data:', data); // Affiche les données du formulaire dans la console
    //   };

    return (
        <div className="" >
            <Tabs
                defaultActiveKey="nouveau"
                id="pharmacy-tabs"
                className="mb-3"
                style={{
                marginTop: '50px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                fontSize: '14px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Tab
                eventKey="nouveau"
                title="Nouveau"
                style={{
                    fontSize: '14px',
                    borderRadius: '8px 8px 0 0', // Rounded top corners
                    
                }}
                >

                <div className=" px-10 space-y-4  ">

                <div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-7  py-4 pr-4 rounded-lg  " style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                        <div className="grid grid-cols-12 gap-y-6 ">
                            <div className='col-span-2 flex items-center  mx-4'>
                            <label className='text-white' htmlFor="">Code barre</label>
                            </div>
                            <div className="col-span-4">

                            <Controller
                                name="barcode"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field} className='border-0 w-full rounded-lg  py-1 px-3 ' type="text" />}
                            />

                            </div>
                            <div className='col-span-2 flex items-center  mx-4'>
                            <label className='text-white' htmlFor="">Localisation</label>
                            </div>
                            <div className="col-span-4">
                            <Controller
                                name="location"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                <select className='w-full py-1 px-3 rounded-lg' {...field}>
                                    <option value="location1">Localisation 1</option>
                                    <option value="location2">Localisation 2</option>
                                    <option value="location3">Localisation 3</option>
                                </select>
                                )}
                                // rules={{ required: 'La localisation est requise' }}
                            />

                            {/* <input className='border-0 w-full rounded-lg py-1 px-3' type="text" /> */}
                            </div>
                            <div className='col-span-2 flex items-center  mx-4'>
                            <label className='text-white' htmlFor="">Description</label>
                            </div>
                            <div className="col-span-10">

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => <input className='border-0 w-full rounded-lg py-1 px-3' {...field} type="text" />}
                                rules={{ required: 'La description est requise' }}
                            />

                            </div>
                            <div className='col-span-2 flex items-center mx-4'>
                            <label className='text-white' htmlFor="">Indication</label>
                            </div>
                            <div className="col-span-10">
                            {/* <input className='border-0 w-full rounded-lg py-1 px-3' type="text" /> */}

                            <Controller
                                name="indication"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input className='border-0 w-full rounded-lg py-1 px-3' {...field} type="text" />}
                                // rules={{ required: 'La indication est requise' }}
                            />

                            </div>
                            <div className='col-span-2 flex items-center  mx-4'>
                            <label className='text-white' htmlFor="">Molecule</label>
                            </div>
                            <div className="col-span-10">

                                <Controller
                                name="molecule"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select className='w-full py-1 px-3 rounded-lg' {...field}>
                                    <option value="molecule1">Molécule 1</option>
                                    <option value="molecule2">Molécule 2</option>
                                    <option value="molecule3">Molécule 3</option>
                                    </select>
                                )}
                                // rules={{ required: 'La molécule est requise' }}
                                />

                            </div>
                            <div className='col-span-2 flex items-center mx-4'>
                            <label className='text-white' htmlFor="">Emballage</label>
                            </div>
                            <div className="col-span-10">

                            <Controller
                                name="packaging"
                                control={control}
                                render={({ field }) => (
                                <select className='w-full py-1 px-3 rounded-lg' {...field}>
                                    <option value="">Séléctionnez le type d'emballage</option>
                                    {
                                    packagings.map((packaging:IPackaging) => (
                                        <option key={packaging.id} value={packaging.id}>{packaging.name}</option>
                                    ) )
                                    }
                                </select>
                                )}
                                rules={{ required: 'L\'emballage est requis' }}
                            />

                            </div>
                            <div className='col-span-2 flex items-center  mx-4'>
                            <label className='text-white' htmlFor="">Categorie</label>
                            </div>
                            <div className="col-span-10">
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                <select className='w-full py-1 px-3 rounded-lg' {...field}>
                                    <option value="category1">Séléctionnez le type de catégorie</option>
                                    {
                                    categories.map((category:ICategory) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ) )
                                    }
                                </select>
                                )}
                                rules={{ required: 'La catégorie est requise' }}
                            />
                            </div>
                        </div>
                        </div>

                        <div className="col-span-5 py-4 pl-8 " style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                        <div className="grid grid-cols-12 gap-y-6 ">
                            <div className='col-span-2 flex items-center'>
                            <label className='text-white' htmlFor="">Fournisseur</label>
                            </div>
                            <div></div>
                            <div className="col-span-8">
                            <Controller
                                name="supplier"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                <select className='w-full py-1 px-3 rounded-lg' {...field}>
                                    <option value="supplier1">Fournisseur 1</option>
                                    <option value="supplier2">Fournisseur 2</option>
                                    <option value="supplier3">Fournisseur 3</option>
                                </select>
                                )}
                                // rules={{ required: 'Le fournisseur est requis' }}
                            />
                            </div>
                            <div className='col-span-3 flex items-center'>
                            <label className='text-white' htmlFor="">Alerte</label>
                            </div>
                            <div className="col-span-2">

                            <Controller
                                name="alert"
                                control={control}
                                render={({ field }) => <input className='border-0 w-full rounded-lg  py-1 px-3' {...field} type="number" />}
                                rules={{ required: 'Le champ Alerte est requis' }}
                            />

                            </div>
                            <div className='col-span-3 flex items-center justify-end mx-6 '>
                            <label className='text-white' htmlFor="">Peremption</label>
                            </div>
                            <div className="col-span-3">

                            <Controller
                                name="expirationDate"
                                control={control}
                                render={({ field }) => <input className='border-0 w-full rounded-lg py-1 px-3' {...field} type="date" />}
                                rules={{ required: 'La date de péremption est requise' }}
                            />

                            </div>
                            <div></div>


                            <div className="col-span-12 space-y-9 ">

                            <div className='grid grid-cols-12'>


                                <Controller
                                name="currency"
                                control={control}
                                render={({ field }) => (
                                    <div className="col-span-3  flex items-end ">
                                        <div className='grid grid-cols-12 '>
                                        {/* value="USD" value="EUR" */}

                                            {
                                                currencies.map((currency) => (
                                                    <div key={currency.id} className=" col-span-6 flex gap-2 ">
                                                        <label className='text-white text-[12px]' htmlFor="">{currency.name}</label>
                                                        <input
                                                            type="radio"
                                                            id={`${currency.name}`}
                                                            value={currency.id}
                                                            {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                        />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                )}
                                rules={{ required: 'La monnaie est requise' }}
                                />



                                <div className='col-span-8 flex justify-between space-x-4' >
                                <div className="">
                                    <div className="form-group space-y-2">
                                    <label className='text-white text-[12px]' htmlFor="">QTE</label>
                                    <Controller
                                        name="quantity"
                                        control={control}
                                        render={({ field }) => <input className='border-0 w-full rounded-lg  py-1 px-3' {...field} type="number" />}
                                        rules={{ required: 'Le champ Quantité est requis' }}
                                    />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form-group space-y-2">
                                    <label className='text-white text-[12px]' htmlFor="">P.A</label>
                                    <Controller
                                        name="purchase_price"
                                        control={control}
                                        render={({ field }) => <input className='border-0 w-full rounded-lg  py-1 px-3' {...field} type="number" />}
                                        rules={{ required: 'Le champ Prix d achat est requis' }}
                                    />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="form-group space-y-2">
                                    <label className='text-white text-[12px]' htmlFor="">P.V</label>
                                    <Controller
                                        name="selling_price"
                                        control={control}
                                        render={({ field }) => <input className='border-0 w-full rounded-lg  py-1 px-3' {...field} type="number" />}
                                        rules={{ required: 'Le champ Prix de vente est requis' }}
                                    />
                                    </div>
                                </div>
                                </div>

                                <div className='col-span-2 flex items-center mt-4 '>
                                <label className='text-white' htmlFor="">TAUX MB</label>
                                </div>
                                <div></div>

                                <div className="col-span-8 mt-4 bg-white flex justify-center items-center rounded-lg">
                                    <span className='text-black text-lg font-semibold italic' >1.25</span> 
                                </div>

                            </div>


                            <div className='grid grid-cols-12 gap-4 '>
                                <div className='col-span-5' >
                                <button className='text-white btn btn-success w-full' >Enregistrer</button>
                                </div>
                                <div className='col-span-5'>
                                <button className='text-white btn btn-warning w-full' >Annuler</button>
                                </div>
                            </div>

                            </div>



                        </div>
                        </div>

                    </div>
                    </form>



                </div>

                    {
                    articleStatus == "loading" ? 
                        <div className="w-full flex justify-center mt-8">
                        <div className="w-[8em] h-[8em] px-auto">
                            <Icon icon="svg-spinners:90-ring-with-bg" className="text-[#597EEE] text-[3em]"/>
                        </div>
                        </div>
                    :

                        <div className=' text-white ' >
                        <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
                        </div>
                    }


                </div>

                </Tab>

                 <Tab
                eventKey="mettreajour"
                title="Mettre à jour"
                style={{
                    fontSize: '14px',
                    borderRadius: '8px 8px 0 0', // Rounded top corners
                    
                }}
                >

                <div className=" px-10 space-y-4">

                    <form>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-7  py-4 pr-4 rounded-lg" style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                            <div className="grid grid-cols-12 gap-y-6 ">
                                <div className='col-span-2 flex items-center  mx-4'>
                                <label className='text-white' htmlFor="">Code barre</label>
                                </div>
                                <div className="col-span-4">
                                <input className='border-0 w-full rounded-lg  py-1 px-3 ' type="text" />
                                </div>
                                <div className='col-span-2 flex items-center  mx-4'>
                                <label className='text-white' htmlFor="">Localisation</label>
                                </div>
                                <div className="col-span-4">
                                <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                                </div>
                                <div className='col-span-2 flex items-center  mx-4'>
                                <label className='text-white' htmlFor="">Description</label>
                                </div>
                                <div className="col-span-10">
                                <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                                </div>
                                <div className='col-span-2 flex items-center mx-4'>
                                <label className='text-white' htmlFor="">Indication</label>
                                </div>
                                <div className="col-span-10">
                                <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                                </div>
                                <div className='col-span-2 flex items-center  mx-4'>
                                <label className='text-white' htmlFor="">Molecule</label>
                                </div>
                                <div className="col-span-10">
                                <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                                    <option value="">Nacl</option>
                                    <option value="">H2o</option>
                                    <option value="">N</option>
                                </select>
                                </div>
                                <div className='col-span-2 flex items-center mx-4'>
                                <label className='text-white' htmlFor="">Emballage</label>
                                </div>
                                <div className="col-span-10">
                                <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                                    <option value="">Carton</option>
                                    <option value="">Sachet</option>
                                    <option value="">Flacon</option>
                                </select>
                                </div>
                                <div className='col-span-2 flex items-center  mx-4'>
                                <label className='text-white' htmlFor="">Categorie</label>
                                </div>
                                <div className="col-span-10">
                                <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                                    <option value="">Paracetamol</option>
                                    <option value="">Paracetamol</option>
                                    <option value="">Paracetamol</option>
                                </select>
                                </div>
                            </div>
                            </div>

                            <div className="col-span-5 py-4 pl-8 " style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                            <div className="grid grid-cols-12 gap-y-6 ">
                                <div className='col-span-2 flex items-center'>
                                <label className='text-white' htmlFor="">Fournisseur</label>
                                </div>
                                <div></div>
                                <div className="col-span-8">
                                <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                                    <option value="">Nacl</option>
                                    <option value="">H2o</option>
                                    <option value="">N</option>
                                </select>
                                </div>
                                <div className='col-span-3 flex items-center'>
                                <label className='text-white' htmlFor="">Alerte</label>
                                </div>
                                <div className="col-span-2">
                                <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                                </div>
                                <div className='col-span-3 flex items-center justify-end mx-6 '>
                                <label className='text-white' htmlFor="">Peremption</label>
                                </div>
                                <div className="col-span-3">
                                <input className='border-0 w-full rounded-lg py-1 px-3' type="date" />
                                </div>
                                <div></div>


                                <div className="col-span-12 space-y-9 ">

                                <div className='grid grid-cols-12'>

                                    <div className="col-span-3  flex items-end ">
                                    <div className='grid grid-cols-12 '>

                                        <div className="flex gap-2 ">
                                        <label className='text-white text-[12px]' htmlFor="">USD</label>
                                        <input className='form-check-input' type="radio" />
                                        </div>

                                        <div className="col-start-6 flex gap-2">
                                        <label className='text-white text-[12px]' htmlFor="">CDF</label>
                                        <input className='form-check-input' type="radio" />
                                        </div>

                                    </div>
                                    </div>

                                    <div className='col-span-8 flex justify-between space-x-4' >
                                    <div className="">
                                        <div className="form-group space-y-2">
                                        <label className='text-white text-[12px]' htmlFor="">QTE</label>
                                        <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="form-group space-y-2">
                                        <label className='text-white text-[12px]' htmlFor="">P.A</label>
                                        <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="form-group space-y-2">
                                        <label className='text-white text-[12px]' htmlFor="">P.V</label>
                                        <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                                        </div>
                                    </div>
                                    </div>

                                    <div className='col-span-2 flex items-center mt-4 '>
                                    <label className='text-white' htmlFor="">TAUX MB</label>
                                    </div>
                                    <div></div>

                                    <div className="col-span-8 mt-4 bg-white flex justify-center items-center rounded-lg">
                                        <span className='text-black text-lg font-semibold italic' >1.25</span> 
                                    </div>

                                </div>


                                <div className='grid grid-cols-12 gap-4 '>
                                    <div className='col-span-5' >
                                    <button className='text-white btn btn-success w-full' >Modifier</button>
                                    </div>
                                    <div className='col-span-5'>
                                    <button className='text-white btn btn-warning w-full' >Annuler</button>
                                    </div>
                                </div>

                                </div>



                            </div>
                            </div>

                        </div>
                    </form>

                    {
                        articleStatus == "loading" ? 
                            <div className="w-full flex justify-center mt-8">
                            <div className="w-[8em] h-[8em] px-auto">
                                <Icon icon="svg-spinners:90-ring-with-bg" className="text-[#597EEE] text-[3em]"/>
                            </div>
                            </div>
                        :

                            <div className=' text-white ' >
                            <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
                            </div>
                    }

                </div>

                </Tab>

                <Tab
                    eventKey="etatproduits"
                    title="État produits"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px 8px 0 0', // Rounded top corners
                        padding: '10px 0',
                    }}
                >
                <div className="p-4 text-lg h-screen">
                    {
                        articleStatus == "loading" ? 
                            <div className="w-full flex justify-center mt-8">
                            <div className="w-[8em] h-[8em] px-auto">
                                <Icon icon="svg-spinners:90-ring-with-bg" className="text-[#597EEE] text-[3em]"/>
                            </div>
                            </div>
                        :

                            <div className=' text-white ' >
                            <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
                            </div>
                    }
                </div>
                </Tab>

                <Tab
                    eventKey="importexport"
                    title="Import/Export"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px 8px 0 0', // Rounded top corners
                        padding: '10px 0',
                    }}
                >
                <div className="p-4 text-lg h-screen mx-10 rounded-2xl ">
                    
                </div>
                </Tab>

                <Tab
                    eventKey="rapports"
                    title="Rapports"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #F57C00', // Darker orange bottom border
                        borderRadius: '8px 8px 0 0', // Rounded top corners
                        padding: '10px 0',
                    }}
                >
                <div className="p-4 text-lg h-screen">
                    Manage your prescriptions and refills.
                </div>
                </Tab> 

            </Tabs>
        </div>
    )

}
