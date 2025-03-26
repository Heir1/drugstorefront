"use client"
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import ICategory from '@/app/interfaces/category';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store/store';
import IArticle from '@/app/interfaces/article';
import { createArticle, updateArticle } from '@/app/redux/slices/articles/actions';
import IMovement from '@/app/interfaces/movement';
import { deleteMovement, updateMovement } from '@/app/redux/slices/movements/actions';
import toast, { Toaster } from 'react-hot-toast'
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import IUser from '@/app/interfaces/user';
import FormAuth from './FormAuth';

interface IFormInputs {
    description : string;
    approv : number;
    quantity : number;
    purchase_price : number;
    purchase_price1 : number;
    supplier : string;
    date : string;
}

interface ArticleFormActivationprops {
    content: any;
    setisStockRegulFormOpen: (value: boolean) => void; // Type for the function prop
}

export default function StockRegulForm({content, setisStockRegulFormOpen}:ArticleFormActivationprops) {

    console.log("LOG ",content);

    const {  rates } = useRateService();
    const rate = rates[0]?.value
    const [ user, setUser ] = useState<IUser | null>(null);
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isDelete, setIsDelete ] = useState(false);
    const [ submittedData, setSubmittedData ] = useState<IFormInputs | null>(null);     

    const { control,setValue, register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        defaultValues: {
            description : "",
            approv : 0,
            quantity : 0,
            purchase_price : 0,
            purchase_price1 : 0,
            supplier: "",
            date: "",
        }
    });

    useEffect(()=>{
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    },[])

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: IFormInputs) => {

        setIsAuth(true);
        setSubmittedData(data);

    };

    const updateProductStock = async() => {

        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
        const quantity = submittedData?.quantity ? submittedData?.quantity : 0

        const StockRegul:IMovement = {
            article_id : content.article_id,
            quantity,
            movement_type_id : content.movement_type_id,
            movement_date: formattedDate,
            updated_by: user?.name,
        }

        const updateMovementPromise = dispatch(updateMovement({ id: content.id, data: StockRegul })).unwrap().then(() => ({
                status: "fulfilled",
                message: "Mouvement de stock mis à jour avec succès !",
            }))
            .catch((err) => {
                const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la mise à jour.";
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
                            <p className="text-sm">{result.message}</p>
                        </div>
                    </div>
                ), { duration: 2000 });

                // Temporiser la fermeture du formulaire après l'affichage du toast
                setTimeout(() => {
                    setisStockRegulFormOpen(false);
                }, 2500); // Attendre 2,5 secondes avant de fermer le formulaire

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

                    // Fermer le formulaire même en cas d'erreur
                    setisStockRegulFormOpen(false);
                }
            });
    }

    const onSubmit1 = async () => {
        setIsDelete(true);
        setIsAuth(true);
    };

    const onSubmitDelete =  async () => {
         
        const deleteMovementPromise = dispatch(deleteMovement(content.id)).unwrap().then(() => ({
          status: "fulfilled",
          message: "Appovisionnement supprimé avec succès !",
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
                  <p className="text-sm">{result.message}</p>
                </div>
              </div>
            ), { duration: 2000 });
      
            // Temporiser la fermeture du formulaire après l'affichage du toast
            setTimeout(() => {
              setisStockRegulFormOpen(false);
            }, 2500); // Attendre 2,5 secondes avant de fermer le formulaire
      
          } else {
            console.log("RESULTAT ",result);
            
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
      
            // Fermer le formulaire même en cas d'erreur
            setisStockRegulFormOpen(false);
          }
        });

    }

    useEffect(() => {
        
        if (content) {
            // alert("")

            console.log(content);
            
            
            setValue("description", content.article?.description, { shouldValidate: true });
            setValue("quantity", content?.quantity, { shouldValidate: true });
            setValue("approv", content?.article.quantity, { shouldValidate: true });
            setValue("purchase_price", content?.article.purchase_price, { shouldValidate: true });
            setValue("purchase_price1", Number((Number(content?.article.purchase_price)/rate).toFixed(2)) , { shouldValidate: true });
            setValue("supplier", content?.article.suppliers[0].name, { shouldValidate: true });
            setValue("date", String(content?.article.created_at).split("T")[0], { shouldValidate: true });
            // supplier 
            
            

        }
    }, [content,setValue]);


    if (!content) return null; // Évite un rendu avec des valeurs non définies

    
    
    return (
        <>
            <div className=" bg-[#7288a5fd] mx-8 border-2 border-white  "  >
                <Toaster />
                {
                    isAuth && <FormAuth updateProductState={ isDelete ? onSubmitDelete : updateProductStock}  setIsAuth={setIsAuth} />
                }  
                {/* onSubmitDelete */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" grid grid-cols-12 mx-4 gap-3 py-2 mt-2 " >

                        <div className=" col-span-8 " >

                            <div className=" flex w-full gap-2 " >
                                <div className=" w-[80%] ">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">DESCRIPTIONN</label>
                                    </div>
                                    <div>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => <input readOnly className="w-full font-bold text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                        rules={{ required: 'La description est requise' }}
                                    />
                                    </div>
                                </div>
                                <div className=" w-[20%] " >
                                    <label className="text-[13px] font-extrabold"  htmlFor="">DATE</label>
                                    <Controller
                                        name="date"
                                        control={control}
                                        render={({ field }) => <input readOnly className="w-full font-bold text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                        rules={{ required: 'La description est requise' }}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full gap-2 " >
                                <div className=" w-[50%] " >
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">FOURNISSEUR</label>
                                    </div>
                                    <div>
                                        <Controller
                                        name="supplier"
                                        control={control}
                                        render={({ field }) => <input readOnly className="w-full font-bold text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " {...field} type="text" />}
                                        rules={{ required: 'La description est requise' }}
                                    />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">STOCK ACTUEL</label>
                                    </div>
                                    <div>
                                        <Controller
                                            name="approv"
                                            control={control}
                                            render={({ field }) => <input className="w-full font-bold text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg " {...field} type="number" readOnly />}
                                            rules={{ required: 'La description est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">QTE APPRO</label>
                                    </div>
                                    <div>
                                        <Controller
                                            name="quantity"
                                            control={control}
                                            render={({ field }) => <input className="w-full font-bold text-[14px] bg-[#4594ff] h-10 pl-4 uppercase rounded-lg " {...field} type="number" />}
                                            rules={{ required: 'La description est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">PA/USD</label>
                                    </div>
                                    <div>
                                        <Controller
                                            name="purchase_price1"
                                            control={control}
                                            render={({ field }) => <input className="w-full text-[14px] font-bold bg-yellow-400 h-10 pl-4 uppercase rounded-lg " {...field} type="number" readOnly />}
                                            rules={{ required: 'La description est requise' }}
                                        />
                                    </div>
                                </div>
                                <div className="w-[15%]">
                                    <div>
                                        <label className="text-[13px] font-extrabold "  htmlFor="">PA/CDF</label>
                                    </div>
                                    <div>
                                        <Controller
                                            name="purchase_price"
                                            control={control}
                                            render={({ field }) => <input className="w-full font-bold text-[14px] bg-green-600 h-10 pl-4 uppercase rounded-lg " {...field} type="number" readOnly />}
                                            rules={{ required: 'La description est requise' }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=" col-span-4 gap-4 flex items-center  " >
                            <div className=" w-[70%] flex flex-col space-y-2 gap-2 " >
                                <label className="text-[13px] font-extrabold "  htmlFor="">COMMENTAIRE</label>
                                <textarea className="w-full text-[14px] bg-[#F2F7FC] h-16 p-4 rounded-lg " />
                            </div>
                            <div className=" flex flex-col gap-2  w-[30%] " >
                                <button className=" w-full  border-[1px] hover:bg-[#D32F2F] hover:text-white border-[#D32F2F] text-center  text-[14px] p-2 transition duration-300 text-[#D32F2F] rounded-lg "
                                // onClick={handleSubmit(onSubmitDelete)}
                                onClick={() => onSubmit1()}
                                >Annuler cet article</button>
                                <button type="submit" className=" w-full text-center p-2 bg-[#4594ff]  text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]" >Modifier cet article</button>
                            </div>

                        </div>

                    </div>
                </form>

            </div>
        </>
    )

}