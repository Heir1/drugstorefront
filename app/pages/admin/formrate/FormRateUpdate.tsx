"use client"
import { updateRate } from '@/app/redux/slices/rates/actions';
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import { AppDispatch } from '@/app/redux/store/store';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

type FormData = {
    rate: number;
};

export default function FormRateUpdate() {

    const dispatch = useDispatch<AppDispatch>();
    const { rates, rateStatus, rateError } = useRateService()
    const { control, handleSubmit, setValue } = useForm<FormData>({
      defaultValues: { rate: 0 }, // Toujours une valeur par défaut
    });

  
    useEffect(() => {
      if (rates.length > 0) {
        setValue("rate", rates[0].value);
      }
    }, [rates, setValue]);
  
    const onSubmit = (data: FormData) => {
  
      dispatch(updateRate({ id: Number(rates[0]?.id), value: data.rate  })).unwrap()
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
              toast.custom((t:any) => (
              <div className={`${
                  t.visible ? "animate-enter" : "animate-leave"
              } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
              >
              <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">✅</span>
              <div className="flex-1 text-center">
                  <p className="text-sm">La modification de taux a été effectué avec succès</p>
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
  
    };

  return (
    <div className=" grid grid-cols-3 h-[80vh] " >
        <Toaster />
        <div className=" col-start-2  h-[40vh]  mt-[30%] bg-[#7288a5fd]  rounded-lg border-2 border-gray-300 " >
            <form onSubmit={handleSubmit(onSubmit)} className="h-full">

                <div className="h-full flex flex-col justify-center items-center space-y-8 ">

                    <div className=" " >
                        <h1 className=" font-extrabold text-white " >
                            MISE A JOUR DU TAUX
                        </h1>
                    </div>

                    <div className="flex justify-center w-full ">
                        <Controller
                            name="rate"
                            control={control}
                            rules={{ required: true, min: 1 }}
                            render={({ field }) => (
                                <input {...field} className="w-[80%] font-bold  border px-4 py-2 rounded-md text-lg  " type="number" placeholder="Taux actuel" />
                            )}
                        />
                    </div>
                    <div className="flex justify-center w-full">
                        <button type="submit" disabled={ rateStatus == 'loading' ? true : false } className="flex justify-center items-center w-[80%] bg-[#262B62] text-white p-3 rounded-md text-sm">
                        {rateStatus == 'loading' ? (
                            <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        ) : (
                            <>Mettre à jour le taux</>
                        )}
                        </button>
                    </div>
                    <div className="flex justify-center w-full mb-24 h-2 py-2">
                        <p className="text-xs font-bold text-red-700">
                            {rateError && rateError}
                        </p>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
