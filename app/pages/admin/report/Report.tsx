"use client"
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function Report() {
  return (
    <div className="  mx-7 h-[80vh] mt-[5em] " >
        <div className=" flex justify-center bg-blue-700 py-2 " >
            <h1 className=" uppercase text-white font-extrabold " >Rapports</h1>
        </div>
        <div className=" grid grid-cols-12 gap-4  h-[74vh] w-full bg-[#7288a5fd] py-6 px-6 " >
            <div className=" border-2 border-white" >

            </div>
            <div className=" col-span-2 border-2 border-white" ></div>
            <div className=" col-span-2 border-2 border-white" ></div>
            <div className=" col-span-5 border-2 border-white" >
                <div className="grid grid-cols-3 gap-2 pt-10 ">
                    <div className=" flex justify-center mt-4 " >
                        <Link href={`/pages/admin/rapport/lowstockarticle`} >
                            <div>
                                <div>
                                    <h1 className=" uppercase font-extrabold text-sm " >Alert stock</h1>
                                </div>
                                <div className=" flex justify-center " >
                                    <Icon icon="subway:file-2" width="32" height="32" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-sm " >Compte clients</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="fa:users" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-sm " >Taux de change</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="streamline:pie-chart-solid" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 " >
                        <div>
                            <Link href={`/pages/admin/rapport/expiredarticle`} >
                                <div>
                                    <h1 className=" uppercase font-extrabold text-sm " >Alerte Peremption</h1>
                                </div>
                                <div className=" flex justify-center " >
                                    <Icon icon="noto-v1:timer-clock" width="32" height="32" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <Link href={`/pages/admin/rapport/articles`} >
                                <div>
                                    <h1 className=" uppercase font-extrabold text-sm " >Stock Actuel</h1>
                                </div>
                                <div className=" flex justify-center " >
                                    <Icon icon="noto-v1:package" width="32" height="32" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-sm " >Stock / Période</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="clarity:blocks-group-solid-badged" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" col-start-2 flex justify-center mt-4 " >
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-sm " >Stock Inventaire</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="noto-v1:package" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        {/* <h1 className=" uppercase font-extrabold text-sm " >Compte Clients</h1> <Icon icon="mdi:journal" width="24" height="24" /> */}
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <h1 className=" uppercase font-extrabold text-sm " >Journal caisse co</h1>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-sm " >Journal caisse</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="mdi:journal" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <h1 className=" uppercase font-extrabold text-sm " >Journal export</h1>
                    </div>
                </div>
            </div>
            <div className=" col-span-2 border-2 border-white" ></div>
        </div>
    </div>
  )
}
