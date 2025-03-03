import { loginUser } from '@/app/redux/slices/login/actions';
import { AppDispatch, RootState } from '@/app/redux/store/store';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type FormData = {
    email: string;
    password: string;
};

interface IsAuth {
    setIsAuth: (value: boolean) => void; // Type for the function prop
}
      

export default function FormAuth({setIsAuth}:IsAuth) {

      
        const dispatch = useDispatch<AppDispatch>();
        const { control, handleSubmit } = useForm<FormData>();
        const [isRateToUpdate, setIsRateToUpdate] = useState(false);
        const { user, loading, error } = useSelector((state: RootState) => state.login);
       
      
        const today = new Date();
        const formattedDate:string = today.toISOString().split('T')[0];

        const onSubmit = (data: FormData) => {
      
            
          // console.log(" Now ",formattedDate);
          // console.log(" Updated ",rates[0].updated_at?.split('T')[0]);
      
          const email = `${data.email}@gmail.com`;
      
          dispatch(loginUser({ email, password: data.password })).then((result) => {
      
            if (loginUser.fulfilled.match(result)) {
                setIsAuth(false)
            }
      
          });
      
        };

  return (
    <div className=" w-full fixed top-[25%] left-[35%] " >
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
                    <div className="flex justify-center w-full">
                        <button type="submit" disabled={loading} className="flex justify-center items-center w-[80%] bg-[#262B62] text-white p-3 rounded-md text-sm">
                            {loading ? (
                            <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            ) : (
                            <>Valider</>
                            )}
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
  )
}
