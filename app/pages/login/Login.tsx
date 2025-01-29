'use client'
import Image from "next/image";
import { AppDispatch, RootState } from '@/app/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { loginUser } from "@/app/redux/slices/login/actions";
import { useRouter } from 'next/navigation'



export default function Login() {

  const router = useRouter()

  const [email1, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error } = useSelector((state: RootState) => state.login);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const email = email1 + '@gmail.com';

    dispatch(loginUser({ email, password }))
        .then((result) => {
            if (loginUser.fulfilled.match(result)) {
                // console.log("Connexion réussie :", result.payload);
                router.push('pages/admin/dashboard');
            }
        });
};


  return (
    <div className="h-screen bg-[url('/loginbg1.jpg')] bg-contain" >
      <div className="grid grid-cols-6 h-screen " >
        <div className="col-start-5 col-span-2 h-full bg-white ">
          <form onSubmit={handleSubmit} className="h-full" >
            <div className=" h-full flex flex-col justify-center items-center " >

              <div className=" mb-20 " >
                <h1 className="  text-center font-semibold ">Bienvenue</h1>
                <h1 className="  text-center font-bold text-[30px] ">Arsue Pharma</h1>
                <p className="  text-center text-[10px] ">Remplissez les champs ci-dessous <br /> pour vous connecter </p>
              </div>

              <div className=" flex justify-center  w-full mb-4 " >
                <input className=" w-[80%]  border-[0.8px] border-[#9A9A9A] py-2 px-4 rounded-md text-sm " placeholder="Nom d'utilisateur" type="text"
                  value={email1}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className=" flex justify-center  w-full mb-10  " >
                <input className=" w-[80%] border-[0.8px] border-[#9A9A9A] py-2 px-4 rounded-md text-sm " placeholder="Mot de passe" type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className=" flex justify-center  w-full ">
                <button type="submit" disabled={loading} className=" flex justify-center items-center w-[80%] bg-[#262B62] text-white p-3 rounded-md text-sm " > 
                  {
                    loading ? (
                      <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    )
                    :
                    (
                      <>Se connecter</>
                    )
                  }
                </button>
              </div>

              <div className="flex justify-center  w-full mb-24 h-2 py-2 ">
                <p className=" text-xs font-bold text-red-700 ">
                  {error&& error }
                </p>
              </div>

              <div>
                <h1 className=" text-xs " >Arsue Pharma   V3.16.01.23</h1>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

{/* <img className=" h-[80vh] w-full rounded-3xl " src="/loginbg1.jpg" alt="" /> */}
// bg-[url('/loginbg1.jpg')]  bg-cover   bg-[url('/loginbg.jpeg')] h-screen relative bg-[url('/bglumushealth.png')] h-screen bg-cover bg-no-repeat