import Link from "next/link";

export default function MenuTab() {
  return (
    <div className="mx-2 p-5 " >
        <div className="grid grid-cols-11">
            <div className="col-start-4 col-span-5 shadow-[0px_4px_8px_0px_#00000026] bg-[#F6F7F9] rounded-xl py-1 px-2  ">
                <div className="grid grid-cols-5 place-content-center">
                    <Link href={``}>
                        <div className="flex justify-center items-center py-2 ">
                            <h1>Nouveau</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className="flex justify-center items-center bg-[#262B62] text-white py-2 rounded-lg ">
                            <h1>Mise à jour</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className="flex justify-center items-center py-2 ">
                            <h1>Etat produit</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className="flex justify-center items-center py-2 ">
                            <h1>Import / Export</h1>
                        </div>
                    </Link>
                    <Link href={``}>
                        <div className="flex justify-center items-center py-2 ">
                            <h1>Rapport</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
