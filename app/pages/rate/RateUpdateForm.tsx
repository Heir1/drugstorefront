'use client';

import { AppDispatch, RootState } from '@/app/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRateService } from '@/app/redux/slices/rates/useRateService';
import { useRouter } from 'next/navigation';
import { updateRate } from '@/app/redux/slices/rates/actions';

type FormData = {
  rate: number;
};

export default function RateUpdate() {

  const dispatch = useDispatch<AppDispatch>();
  const { rates, rateStatus, rateError } = useRateService()
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { rate: 0 }, // Toujours une valeur par défaut
  });
  const router = useRouter();

  useEffect(() => {
    if (rates.length > 0) {
      setValue("rate", rates[0].value);
    }
  }, [rates, setValue]);

  const onSubmit = (data: FormData) => {

    dispatch(updateRate({ id: Number(rates[0]?.id), value: data.rate  })).then((result) => {
        router.push('pages/admin/dashboard');
    });

  };

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div className="h-full flex flex-col justify-center items-center">
            <div className="mb-20">
                <h1 className="text-center font-semibold">Bienvenue</h1>
                <h1 className="text-center font-bold text-[30px]">Arsue Pharma</h1>
                <p className="text-center text-[10px]">Remplissez les champs ci-dessous <br /> pour vous connecter</p>
            </div>
            <div className="flex justify-center w-full mb-4">
                <Controller
                    name="rate"
                    control={control}
                    rules={{ required: true, min: 0 }}
                    render={({ field }) => (
                        <input {...field} className="w-[80%] border px-4 py-2 rounded-md text-sm" type="number" placeholder="Taux actuel" />
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
            <div>
                <h1 className="text-xs">Arsue Pharma V3.16.01.23</h1>
            </div>
        </div>
    </form>

  );
}


// <div className="h-screen flex items-center justify-center bg-gray-100">
//     <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h1 className="text-center font-bold text-xl mb-4">Mise à jour du taux</h1>
    {/* </div>
</div> */}