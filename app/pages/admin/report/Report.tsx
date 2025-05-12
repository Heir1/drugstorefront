"use client"
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function Report() {
  return (
    <div className="  mx-7 h-[80vh] mt-[5em] " >
        <div className=" flex justify-center bg-blue-700 py-2 " >
            <h1 className=" uppercase text-white font-extrabold " >Rapports</h1>
        </div>
        <div className=" grid grid-cols-12 gap-4  h-[70vh] w-full bg-[#7288a5fd] pt-6 px-6 " >
            <div className="col-span-4">
                <div className="grid grid-cols-5 gap-4 h-[70vh]">
                    <div className=" col-span-2 border-2 border-white" >
                        <div className=" flex justify-center mt-4 ">
                            <div>
                                <div className=" mb-2 " >
                                    <h1 className=" uppercase font-extrabold text-xs " >Achat Conso</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="streamline:download-box-1-solid" width="32" height="32"  style={{color: '#008000'}} />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-center mt-4 ">
                            <div>
                                <div className=" mb-2 " >
                                    <h1 className=" uppercase font-extrabold text-xs " >Achat Détail</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="streamline:upload-box-1-solid" width="32" height="32"  style={{color: '#008000'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-span-3 border-2 border-white py-4 " >
                        <div className="grid grid-cols-2 ">
                            <div className="space-y-3 mb-2 " >
                                <div className=" flex justify-center " >
                                    <h1 className=" uppercase font-extrabold text-xs " >Vente conso</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="mdi:cart" width="32" height="32"  style={{color: '#fff'}} />
                                </div>
                            </div>
                            <div className="space-y-3 mb-2 " >
                                <div className=" flex justify-center ">
                                    <h1 className=" uppercase font-extrabold text-xs " >Vente Détail</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="noto:basket" width="32" height="32"  style={{color: '#008000'}} />
                                </div>
                            </div>
                            <div className="space-y-3 mb-2 " >
                                <div className=" flex justify-center ">
                                    <h1 className=" uppercase font-extrabold text-xs " >Crédit Conso</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="pepicons-pop:chain" width="32" height="32"  style={{color: '#ffffff'}} />
                                </div>
                            </div>
                            <div className="space-y-3 mb-2 " >
                                <div className=" flex justify-center ">
                                    <h1 className=" uppercase font-extrabold text-xs " >Crédit Détail</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="pepicons-pop:chain" width="32" height="32"  style={{color: '#ffffff'}} />
                                </div>
                            </div>
                            <div className="space-y-3 mb-2 " >
                                <div className=" flex justify-center ">
                                    <h1 className=" uppercase font-extrabold text-xs " >Facture</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="fa-solid:file-invoice" width="32" height="32"  style={{color: '#ffffff'}} />
                                </div>
                            </div>
                            <div className="space-y-3 mb-2 " >
                                <div className=" flex justify-center ">
                                    <h1 className=" uppercase font-extrabold text-xs " >Proforma</h1>
                                </div>
                                <div className=" flex justify-center ">
                                    <Icon icon="basil:invoice-solid" width="32" height="32"  style={{color: '#ffffff'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 border-2 border-white">
                        <div className="grid grid-cols-3">
                            <div className=" flex justify-center mt-4 ">
                                <div>
                                    <div>
                                        <h1 className=" uppercase font-extrabold text-xs mb-2 " >Vente Détail CDF</h1>
                                    </div>
                                    <div className=" flex justify-center ">
                                        <Icon icon="noto:basket" width="32" height="32"  style={{color: '#fff'}} />
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center mt-4 ">
                                <div>
                                    <div>
                                        <h1 className=" uppercase font-extrabold text-xs mb-2 " >Vente Détail (+) </h1>
                                    </div>
                                    <div className=" flex justify-center ">
                                        <Icon icon="noto:basket" width="32" height="32"  style={{color: '#ffffff'}} />
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center mt-4 ">
                                <div>
                                    <div>
                                        <h1 className=" uppercase font-extrabold text-xs mb-2 " >Gain Vente</h1>
                                    </div>
                                    <div className=" flex justify-center  ">
                                        <Icon className="border-2 border-white rounded-full p-2 " icon="ic:outline-phone-android" width="48" height="48"  style={{color: '#ffffff'}} />
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center mt-4 ">
                                <div>
                                    <div>
                                        <h1 className=" uppercase font-extrabold text-xs mb-2 " >Remise</h1>
                                    </div>
                                    <div className=" flex justify-center ">
                                        <Icon icon="ic:round-discount" width="32" height="32"  style={{color: '#fff'}} />
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center mt-4 ">
                                <div>
                                    <div>
                                        <h1 className=" uppercase font-extrabold text-xs mb-2 " >Vente Détail Client</h1>
                                    </div>
                                    <div className=" flex justify-center ">
                                        <Icon icon="noto:basket" width="32" height="32"  style={{color: '#ffffff'}} />
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center mt-4 ">
                                <div>
                                    <div>
                                        <h1 className=" uppercase font-extrabold text-xs mb-2 " >Réquisition</h1>
                                    </div>
                                    <div className=" flex justify-center ">
                                        <Icon icon="twemoji:spiral-notepad" width="32" height="32"  style={{color: '#ffffff'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-span-2 border-2 border-white" >
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Regul Achat</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="mdi:basket-remove" width="32" height="32"  style={{color: '#fff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Regul Vente</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="ix:tasks-done" width="32" height="32"  style={{color: '#ffffff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Regul caisse admin</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="material-icon-theme:folder-download-open" width="32" height="32"  style={{color: '#ffffff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Paiement crédit</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="pepicons-pencil:credit-card-circle-filled" width="32" height="32"  style={{color: '#ffffff'}} />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className=" col-span-4 border-2 border-white" >
                <div className="grid grid-cols-3 gap-2 pt-10 ">
                    <div className=" flex justify-center mt-4 " >
                        <Link href={`/pages/admin/rapport/lowstockarticle`} >
                            <div>
                                <div>
                                    <h1 className=" uppercase font-extrabold text-xs " >Alert stock</h1>
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
                                <h1 className=" uppercase font-extrabold text-xs " >Compte clients</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="fa:users" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <Link href={`/pages/admin/formrate`} >
                                <div>
                                    <h1 className=" uppercase font-extrabold text-xs " >Taux de change</h1>
                                </div>
                                <div className=" flex justify-center " >
                                    <Icon icon="streamline:pie-chart-solid" width="32" height="32" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 " >
                        <div>
                            <Link href={`/pages/admin/rapport/expiredarticle`} >
                                <div>
                                    <h1 className=" uppercase font-extrabold text-xs " >Alerte Peremption</h1>
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
                                    <h1 className=" uppercase font-extrabold text-xs " >Stock Actuel</h1>
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
                                <h1 className=" uppercase font-extrabold text-xs " >Stock / Période</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="clarity:blocks-group-solid-badged" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" col-start-2 flex justify-center mt-4 " >
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-xs " >Stock Inventaire</h1>
                            </div>
                            <div className=" flex justify-center " >
                                <Icon icon="noto-v1:package" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        {/* <h1 className=" uppercase font-extrabold text-xs " >Compte Clients</h1> <Icon icon="mdi:journal" width="24" height="24" /> */}
                    </div>

                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-xs " >Journal caisse co</h1>
                            </div>
                            <div className=" flex justify-center ">
                                <Icon icon="flat-color-icons:alarm-clock" width="32" height="32" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <Link href={`/pages/admin/cash/rapport`} >
                                <div>
                                    <h1 className=" uppercase font-extrabold text-xs " >Journal caisse</h1>
                                </div>
                                <div className=" flex justify-center " >
                                    <Icon icon="mdi:journal" width="32" height="32" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-4 ">
                        <div>
                            <div>
                                <h1 className=" uppercase font-extrabold text-xs " >Journal export</h1>
                            </div>
                            <div className=" flex justify-center ">
                                <Icon icon="material-symbols:export-notes" width="24" height="24"  style={{color: '#ffffff'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-span-2 border-2 border-white" >
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Prix interne</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="ic:baseline-download-for-offline" width="32" height="32"  style={{color: '#fff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Prix externe</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="ic:baseline-download-for-offline" width="32" height="32"  style={{color: '#ffffff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Produits</h1>
                        </div>
                        <div className=" flex justify-center  ">
                            <Icon icon="solar:box-minimalistic-bold-duotone" width="48" height="48"  style={{color: '#ffffff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Fournisseurs</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="flat-color-icons:globe" width="32" height="32"  style={{color: '#fff'}} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-4 ">
                    <div>
                        <div>
                            <h1 className=" uppercase font-extrabold text-xs mb-2 " >Etat Produits</h1>
                        </div>
                        <div className=" flex justify-center ">
                            <Icon icon="ic:baseline-download-for-offline" width="32" height="32"  style={{color: '#FFD700'}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
