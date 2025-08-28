import IUser from '@/app/interfaces/user';
import { loginUser } from '@/app/redux/slices/login/actions';
import { AppDispatch, RootState } from '@/app/redux/store/store';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

type FormData = {
    email: string;
    password: string;
};

interface IsAuth {
    setIsAuth: (value: boolean) => void; // Type for the function prop
    updateProductState: () => Promise<void>
}
      

export default function FormAuth({setIsAuth, updateProductState}:IsAuth) {

      
        const dispatch = useDispatch<AppDispatch>();
        const { control, handleSubmit } = useForm<FormData>();
        const [isRateToUpdate, setIsRateToUpdate] = useState(false);
        const { user, loading, error } = useSelector((state: RootState) => state.login);
       
      
        const today = new Date();
        const formattedDate:string = today.toISOString().split('T')[0];

        // const onSubmit = (data: FormData) => {
      
            
        //   // console.log(" Now ",formattedDate);
        //   // console.log(" Updated ",rates[0].updated_at?.split('T')[0]);
      
        //   const email = `${data.email}@gmail.com`;
      
        //   dispatch(loginUser({ email, password: data.password })).then((result) => {
      
        //     if (loginUser.fulfilled.match(result)) {
        //         updateProductState();
        //         setIsAuth(false)
        //     }
      
        //   });
      
        // };

        const onSubmit = (data: FormData) => {

            const email = `${data.email}@gmail.com`; // Formater l'email
          
            // Dispatch de l'action Redux pour connecter l'utilisateur
            dispatch(loginUser({ email, password: data.password })).then((result:any) => {
                console.log("RESULTAT ",result.payload.role);
                
              if (loginUser.fulfilled.match(result)) {

                if(result.payload.role == "admin"){
                    // Si la connexion est réussie
                    updateProductState() // Appeler updateProductState (asynchrone)
                    .then(() => {
                    setIsAuth(false); // Mettre à jour l'état d'authentification après que updateProductState est terminé
                    })
                    .catch((error) => {
                    console.error("Erreur lors de la mise à jour du produit :", error);
                    });
                }
                else{
                  toast.custom((t:any) => (
                      <div
                          className={`${
                          t.visible ? "animate-enter" : "animate-leave"
                          } flex items-center w-full max-w-xs p-4 text-white bg-red-600 border border-red-900 rounded-lg shadow-lg`}
                      >
                          <span className="mr-2 bg-white rounded-full text-[10px] p-[2px] ">❌</span>
                          <div className="flex-1 text-center">
                          {/* <p className="font-bold">Erreur</p> */}
                          <p className="text-sm">Vous n'avez lz droit d'éffectuer cette opération</p>
                          </div>
                      </div>
                  ));
                }
              }

            });
          };

  return (
    <div>

        <div className=" w-full h-[100vh] fixed top-0 bg-[#00000033] " >

        </div>

        <div className=" w-full fixed top-[25%] left-[35%] " >

            <Toaster />

            <div className=" bg-[#7288a5fd] w-[30%] py-10 " >
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center w-full mb-4">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                <input {...field} className="w-[80%] border-[0.8px] border-[#9A9A9A] py-2 px-4 rounded-md text-sm" placeholder="Nom d'utilisateur" type="text" />
                                )}
                            />
                        </div>
                        <div className="flex justify-center w-full mb-2">
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                <input {...field} className="w-[80%] border-[0.8px] border-[#9A9A9A] py-2 px-4 rounded-md text-sm" placeholder="Mot de passe" type="password" />
                                )}
                            />
                        </div>
                        <div className="flex justify-center w-full gap-2 ">
                            <button type="submit" disabled={loading} className="flex justify-center items-center w-[40%] bg-[#262B62] text-white p-3 rounded-md text-sm">
                                {loading ? (
                                <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                ) : (
                                <>Valider</>
                                )}
                            </button>
                            <button onClick={() => setIsAuth(false)} className="w-[40%] bg-yellow-600 text-white p-3 rounded-md text-sm" >
                                Annuler
                            </button>
                        </div>
                        <div className="flex justify-center w-full h-2 py-2">
                            <p className="text-xs font-bold text-red-700">
                                {error && error}
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
