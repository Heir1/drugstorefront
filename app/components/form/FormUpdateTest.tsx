import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Combobox } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { getArticleById } from "@/app/redux/slices/articles/actions";
import { updateArticle } from "@/app/redux/slices/articles/actions";
import { usePlacementService } from "@/app/redux/slices/placements/usePlacementService";
import IPlacement from "@/app/interfaces/placement";
import IArticle from "@/app/interfaces/article";
import { useIndicationService } from "@/app/redux/slices/indications/useIndicationService";
import IIndication from "@/app/interfaces/indication";
import { usePackagingService } from "@/app/redux/slices/packaging/usePackagingService";
import IPackaging from "@/app/interfaces/packaging";
import { useMoleculeService } from "@/app/redux/slices/molecules/useMoleculeService";
import { useSupplierService } from "@/app/redux/slices/suppliers/useSuppliseService";
import IMolecule from "@/app/interfaces/molecule";
import { useCategoryService } from "@/app/redux/slices/category/useCategoryService";
import ISupplier from "@/app/interfaces/supplier";
import ICategory from "@/app/interfaces/category";
import { AppDispatch } from "@/app/redux/store/store";
import IUser from "@/app/interfaces/user";


interface IFormInputs {
    barcode: string | null ;
    location: string;
    indication: string;
    molecule: string;
    packaging: string;
    supplier: string;
    category: string;
    description: string;
    expirationDate: string;
    quantity: number;
    alert: number;
    currency: number;
    purchase_price: number;
    selling_price: number;
}

interface ArticleFormUpdateprops {
    content: any;
    setIsUpdateFormOpen: (value: boolean) => void; // Type for the function prop
}

export default function FormUpdateTest({content, setIsUpdateFormOpen}:ArticleFormUpdateprops) {

    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, control, setValue, watch } = useForm<IFormInputs>(
        {defaultValues: {
            barcode : null,
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
        }}
    );
    const { placements, placementStatus, placementError } = usePlacementService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { packagings, packagingStatus, packagingError } = usePackagingService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { suppliers, supplierStatus , supplierError } = useSupplierService();
    const { categories, categoryStatus , categoryError } = useCategoryService();

    const [displayedLocation, setDisplayedLocation] = useState("");
    const [displayedPackaging, setDisplayedPackaging] = useState("");
    const [displayedMolecule, setDisplayedMolecule] = useState("");
    const [displayedCategory, setDisplayedCategory] = useState("");
    const [displayedSupplier, setDisplayedSupplier] = useState("");
    const [displayedIndication, setDisplayedIndication] = useState("");
    const [filteredLocations, setFilteredLocations] = useState<IPlacement[]>([]);
    const [filteredIndications, setFilteredIndications] = useState<IIndication[]>([]);
    const [filteredPackagings, setFilteredPackagings] = useState<IPackaging[]>([]);
    const [filteredSuppliers, setfilteredSuppliers] = useState<ISupplier[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
    const [filteredMolecules, setfilteredMolecules] = useState<IMolecule[]>([]);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [isIndicationDropdownOpen, setIsIndicationDropdownOpen] = useState(false);
    const [isPackagingDropdownOpen, setIsPackagingDropdownOpen] = useState(false);
    const [isMoleculeDropdownOpen, setIsMoleculeDropdownOpen] = useState(false);
    const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [number, setNumber] = useState<number | ''>(''); // Utiliser une chaîne vide au départ
    const [result, setResult] = useState<number | ''>(''); // Même chose pour le résultat
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        
        const fetchArticle = async () => {
            try {
                setValue("barcode", content.barcode);
                setValue("location", content.placements[0].name);
                setValue("indication", content.indications[0].name);
                setValue("packaging", content.packaging.name);
                setValue("category", content.category.name);
                setValue("molecule", content.molecules[0].name);
                setValue("supplier", content.suppliers[0].name);
                setValue("description", content.description);
                setValue("expirationDate", content.expiration_date);
                setValue("alert", content.alert);
                setValue("quantity", content.quantity);
                setValue("currency", content.currency.id);
                setValue("purchase_price", Number(content.purchase_price));
                setValue("selling_price", Number(content.selling_price));
                setNumber(Number(content.purchase_price))
                setResult(Number(content.selling_price))
                

                const selectedLocation = placements.find((p) => p.id === content.placements[0].id);
                setDisplayedLocation(selectedLocation?.name ?? content.placements[0].name);

                const selectedIndication = indications.find((i) => i.id === content.indications[0].id);
                setDisplayedIndication(selectedIndication?.name ?? content.indications[0].name);

                const selectedMolecule = molecules.find((m) => m.id === content.molecules[0].id);                
                setDisplayedMolecule(selectedMolecule?.name ?? content.molecules[0].name);

                const selectedPackaging = packagings.find((p) => p.id === content.packaging_id);
                setDisplayedPackaging(selectedPackaging?.name ?? content.packaging.name);

                const selectedCategory = categories.find((c) => c.id === content.category_id);
                setDisplayedCategory(selectedCategory?.name ?? content.category.name);

                const selectedSupplier = suppliers.find((s) => s.id === content.suppliers[0].id);
                setDisplayedSupplier(selectedSupplier?.name ?? content.suppliers[0].name);

            } catch (error) {
                console.error(error);
                toast.error("Erreur lors du chargement de l'article.");
            }
        };

        fetchArticle();
    }, [content, placements, setValue]);

    useEffect(()=>{
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    },[])

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Si le champ est vide, réinitialiser le nombre et le résultat
        if (value === '') {
            setNumber('');
            setResult('');
            return;
        }
    
        // Convertir la valeur en nombre
        const parsedValue = parseFloat(value);
    
        // Mettre à jour l'état uniquement si la valeur est un nombre valide
        if (!isNaN(parsedValue)) {
            setNumber(parsedValue);
            setResult(parsedValue * 1.25); // Calculer le double
        }
        
    }

    const onSubmit = async (data: IFormInputs) => {

        const { barcode, location, description, indication, molecule, packaging, category, supplier,alert, expirationDate, quantity, purchase_price, selling_price , currency  } = data

        console.log("DATA ",data);
        console.log("DISPLAYED LOCATION ", displayedLocation);
        console.log("DISPLAYED INDICATION ", displayedIndication);

        // location condition
        if(!isNaN(Number(location))){
            // alert("Vous avez fait une sélection")
            // console.log("Vous avez fait une sélection");
        }
        else if(displayedLocation == content.placements[0].name){
            // alert("C'est nullable")
            // console.log("C'est nullable");
        }
        else if(displayedLocation !== content.placements[0].name){
            // alert("Tu as édité")
        }

        // indication condition
        if(!isNaN(Number(indication))){
            // alert("Vous avez fait une sélection")
            // console.log("Vous avez fait une sélection");
        }
        else if(displayedIndication == content.indications[0].name){
            // alert("C'est nullable")
            // console.log("C'est nullable");
        }
        else if(displayedIndication !== content.indications[0].name){
            // alert("Tu as édité")
        }

        // indication condition
        if(!isNaN(Number(molecule))){
            // alert("Vous avez fait une sélection")
            // console.log("Vous avez fait une sélection");
        }
        else if(displayedMolecule == content.molecules[0].name){
            // alert("C'est nullable")
            // console.log("C'est nullable");
        }
        else if(displayedMolecule !== content.molecules[0].name){
            // alert("Tu as édité")
        }

        // packaging condition
        if(!isNaN(Number(packaging))){
            // alert("Vous avez fait une sélection")
            // console.log("Vous avez fait une sélection");
        }
        else if(displayedPackaging == content.packaging.name){
            // alert("C'est nullable")
            // console.log("C'est nullable");
        }
        else if(displayedPackaging !== content.packaging.name){
            // alert("Tu as édité")
        }

        // category condition
        if(!isNaN(Number(category))){
            // alert("Vous avez fait une sélection")
            // console.log("Vous avez fait une sélection");
        }
        else if(displayedCategory == content.category.name){
            // alert("C'est nullable")
            // console.log("C'est nullable");
        }
        else if(displayedCategory !== content.category.name){
            // alert("Tu as édité")
        }

        // supplier condtion
        if(!isNaN(Number(supplier))){
            // alert("Vous avez fait une sélection")
            // console.log("Vous avez fait une sélection");
        }
        else if(displayedSupplier == content.suppliers[0].name){
            // alert("C'est nullable")
            // console.log("C'est nullable");
        }
        else if(displayedSupplier !== content.suppliers[0].name){
            // alert("Tu as édité")
        }


        const articleData:IArticle = {
            barcode: barcode === '' ? null : barcode, // Convert empty string to null
            placements : !isNaN(Number(location)) ? `${displayedLocation}§§${location}` : (displayedLocation !== content.placements[0].name) ? `${displayedLocation}§§${content.placements[0].id}` : "",
            description ,
            comment: content.comment ,
            is_active: content.is_active ,
            indications : !isNaN(Number(indication)) ? `${displayedIndication}§§${indication}` : (displayedIndication !== content.indications[0].name) ? `${displayedIndication}§§${content.indications[0].id}` : "",
            molecules : !isNaN(Number(molecule)) ? `${displayedMolecule}§§${molecule}` : (displayedMolecule !== content.molecules[0].name) ? `${displayedMolecule}§§${content.molecules[0].id}` : "",
            quantity : quantity ,
            expiration_date: expirationDate,
            category_id: !isNaN(Number(category)) ? `${displayedCategory}§§${category}` : (displayedCategory !== content.category.name) ? `${displayedCategory}§§${content.category_id}` : "",
            suppliers : !isNaN(Number(supplier)) ? `${displayedSupplier}§§${supplier}` : (displayedSupplier !== content.suppliers[0].name) ? `${displayedSupplier}§§${content.suppliers[0].id}` : "",
            packaging_id: !isNaN(Number(packaging)) ? `${displayedPackaging}§§${packaging}` : (displayedPackaging !== content.packaging.name) ? `${displayedPackaging}§§${content.packaging_id}` : "",
            purchase_price : Number(number),
            selling_price : Number(result),
            updated_by: user?.name,
            alert : Number(alert),
            currency_id: Number(currency) 
        }

        // console.log("ARTICLE ", articleData);

        const updateArticlePromise = dispatch(updateArticle({ id: content.id, data: articleData })).unwrap().then(() => ({
            status: "fulfilled",
            message: "Article mis à jour avec succès !",
        }))
        .catch((err) => {
            // Vérifier si err est un objet et récupérer le message
            const errorMessage = typeof err === "string" ? err : err?.message || "Erreur inconnue lors de la mise à jour.";

            return {
                status: "rejected",
                message: errorMessage,
            };
        })
        .then((result) => {

            if (result.status === "fulfilled") {
                // Afficher un toast de succès
                toast.custom((t: any) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                    } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
                    >
                        {/* Icône verte avec fond blanc */}
                        <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">
                            ✅
                        </span>

                        <div className="flex-1 text-center">
                            <p className="text-sm">{result.message}</p>
                        </div>
                    </div>
                ),{
                    duration: 2000,  // Délai de 3 secondes (3000ms)
                });

                // Temporiser la fermeture du formulaire après l'affichage du toast
                setTimeout(() => {
                    setIsUpdateFormOpen(false);
                }, 2500); // Attendre 2 secondes avant de fermer le formulaire

            } else {
                // Afficher un toast d'erreur
                toast.custom((t: any) => (
                    <div
                    className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                    } flex items-center w-full max-w-xs p-4 text-white bg-red-600 border border-red-900 rounded-lg shadow-lg`}
                    >
                        {/* Icône d'erreur avec fond blanc */}
                        <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">
                            ❌
                        </span>

                        <div className="flex-1 text-center">
                            <p className="text-sm">{result.message}</p>
                        </div>
                    </div>
                ));
            }

        });

    };

    const locationSelectHandler = (location:IPlacement) => {
        setDisplayedLocation(location.name)
        setIsLocationDropdownOpen(false)
    }

    const indicationSelectHandler = (indication:IIndication) => {
        setDisplayedIndication(indication.name)
        setIsIndicationDropdownOpen(false)
    }

    const moleculeSelectHandler = (molecule:IMolecule) => {
        setDisplayedMolecule(molecule.name)
        setIsMoleculeDropdownOpen(false)
    }

    const packagingSelectHandler = (packaging:IPackaging) => {
        setDisplayedPackaging(packaging.name)
        setIsPackagingDropdownOpen(false)
    }

    const categorySelectHandler = (category:ICategory) => {
        setDisplayedCategory(category.name)
        setIsCategoryDropdownOpen(false)
    }

    const supplierSelectHandler = (supplier:ISupplier) => {
        setDisplayedSupplier(supplier.name)
        setIsSupplierDropdownOpen(false)
    }

    // onMouseDown={() => setDisplayedSupplier(supplier.name)}


    return (
        <div>
            <Toaster />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12  gap-x-2 py-5 px-3 " >
                    <div className="col-span-6 bg-[#7288a5fd] border-2 border-white p-2  space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                        <div className="grid grid-cols-2 gap-5">
                            <div className=" flex items-center " >
                                <label className=" w-1/3 font-semibold text-sm text-white" htmlFor="">Code barre</label>
                                <Controller
                                    name="barcode"
                                    control={control}
                                    defaultValue={null} // Initialize as null
                                    render={({ field }) => (
                                        <input
                                        {...field}
                                        value={field.value ?? ''} // Convert null to empty string for input
                                        onChange={(e) => {
                                            // Convert empty string back to null
                                            field.onChange(e.target.value === '' ? null : e.target.value.toUpperCase())
                                        }}
                                        className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg border-2 border-black"
                                        type="text"
                                        />
                                    )}
                                    // rules={{
                                    //     required: 'Le code barre est requis',
                                    //     validate: (value) => value !== null || 'Le code barre ne peut pas être null'
                                    // }}
                                />
                            </div>
                            <div className=" flex items-center justify-end gap-2 " >
                                <label className=" font-semibold text-sm text-white" htmlFor="">Localisation</label>
                                <Combobox
                                    value={watch("location")}
                                    onChange={(selectedId) => {
                                        const selectedLocation = placements.find((p) => p.id === selectedId);
                                        setValue("location", selectedId ?? "");
                                        setDisplayedLocation(selectedLocation?.name ?? "");
                                    }}
                                >
                                    <div className="relative">
                                        <input
                                            className="w-full border p-2 rounded-md"
                                            placeholder="Saisir ou sélectionner..."
                                            value={displayedLocation}
                                            onChange={(e) => {
                                                setDisplayedLocation(e.target.value);
                                                setFilteredLocations(
                                                    placements.filter((p) =>
                                                        p.name.toLowerCase().includes(e.target.value.toLowerCase())
                                                    )
                                                );
                                                setIsLocationDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsLocationDropdownOpen(true)}
                                            onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                                        />

                                        {/* Modification ici : remplacement de top-full par bottom-full */}
                                        {isLocationDropdownOpen && filteredLocations.length > 0 && (
                                            <div className="absolute z-50 bg-white border bottom-full mb-1 w-full shadow-lg max-h-60 overflow-auto">
                                                {/* ▲ Changement de 'top-full mt-1' à 'bottom-full mb-1' ▲ */}
                                                {/* Cela force le menu à s'afficher vers le haut au lieu du bas */}
                                                
                                                {filteredLocations.map((location: IPlacement) => (
                                                    <Combobox.Option
                                                        key={location.id}
                                                        value={location.id}
                                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                                        onMouseDown={() => locationSelectHandler(location)}
                                                    >
                                                        {location.name}
                                                    </Combobox.Option>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                </Combobox>
                                
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            <div className=" flex items-center " >
                                <label className=" w-[14%] font-semibold text-sm text-white" htmlFor="">Description</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => <input className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg border-2 border-black" {...field} type="text" />}
                                    rules={{ required: 'La description est requise' }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            <div className=" flex items-center justify-between " >
                                <div>
                                    <label className=" font-semibold text-sm text-white" htmlFor="">Indication</label>
                                </div>
                                <div className="w-[88%]" >
                                    <Combobox
                                        value={watch("indication")}
                                        onChange={(selectedId) => {
                                            const selectedIndication = indications.find((i) => i.id === selectedId);
                                            setValue("indication", selectedId ?? "");
                                            setDisplayedIndication(selectedIndication?.name ?? "");
                                        }}
                                    >
                                        <div className="relative">
                                            <input
                                                className="w-full uppercase border p-2 rounded-md"
                                                placeholder="Saisir ou sélectionner..."
                                                value={displayedIndication}
                                                onChange={(e) => {
                                                    setDisplayedIndication(e.target.value);
                                                    setFilteredIndications(
                                                        indications.filter((i) =>
                                                            i.name.toLowerCase().includes(e.target.value.toLowerCase())
                                                        )
                                                    );
                                                    setIsIndicationDropdownOpen(true);
                                                }}
                                                onFocus={() => setIsIndicationDropdownOpen(true)}
                                                onBlur={() => setTimeout(() => setIsIndicationDropdownOpen(false), 200)}
                                            />

                                            {isIndicationDropdownOpen && filteredIndications.length > 0 && (
                                                <div className=" absolute z-50 bg-white border bottom-full mb-1 w-full shadow-lg max-h-60 overflow-auto">
                                                    {filteredIndications.map((indication) => (
                                                        <Combobox.Option
                                                            key={indication.id}
                                                            value={indication.id}
                                                            className="uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                            onMouseDown={() => indicationSelectHandler(indication)}
                                                        >
                                                            {indication.name}
                                                        </Combobox.Option>
                                                    ))}
                                                </div>
                                                
                                            )}
                                        </div>
                                    </Combobox>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            <div className="flex items-center justify-between " >
                                <div>
                                    <label className=" font-semibold text-sm text-white" htmlFor="">Molécule</label>
                                </div>
                                <div className=" w-[88%] " >
                                    <Combobox
                                        value={watch("molecule")}
                                        onChange={(selectedId) => {
                                            const selectedMolecule = molecules.find((m) => m.id === selectedId);
                                            setValue("molecule", selectedId ?? "");
                                            setDisplayedMolecule(selectedMolecule?.name ?? "");
                                        }}
                                    >
                                            <div className="relative">
                                                <input
                                                    className="w-full uppercase border p-2 rounded-md"
                                                    placeholder="Saisir ou sélectionner..."
                                                    value={displayedMolecule}
                                                    onChange={(e) => {
                                                        setDisplayedMolecule(e.target.value);
                                                        setfilteredMolecules(
                                                            molecules.filter((m) =>
                                                                m.name.toLowerCase().includes(e.target.value.toLowerCase())
                                                            )
                                                        );
                                                        setIsMoleculeDropdownOpen(true);
                                                    }}
                                                    onFocus={() => setIsMoleculeDropdownOpen(true)}
                                                    onBlur={() => setTimeout(() => setIsMoleculeDropdownOpen(false), 200)}
                                                />

                                                {isMoleculeDropdownOpen && filteredMolecules.length > 0 && (
                                                    <div className=" z-50 absolute bg-white border bottom-full mb-1 w-full shadow-lg max-h-60 overflow-auto">
                                                        {filteredMolecules.map((molecule:IMolecule) => (
                                                            <Combobox.Option
                                                                key={molecule.id}
                                                                value={molecule.id}
                                                                className="uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                onMouseDown={() => moleculeSelectHandler(molecule)}
                                                            >
                                                                {molecule.name}
                                                            </Combobox.Option>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                    </Combobox>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center " >
                                <label className=" w-[27%]  font-semibold text-sm text-white" htmlFor="">Emballage</label>
                                <div className=" w-[83%] " >
                                    <Combobox
                                        value={watch("packaging")}
                                        onChange={(selectedId) => {
                                            const selectedPackaging = packagings.find((p:IPackaging) => p.id === selectedId);
                                            setValue("packaging", selectedId ?? "");
                                            setDisplayedPackaging(selectedPackaging?.name ?? "");
                                        }}
                                    >
                                            <div className="relative">
                                                <input
                                                    className="w-full border p-2 rounded-md"
                                                    placeholder="Saisir ou sélectionner..."
                                                    value={displayedPackaging}
                                                    onChange={(e) => {
                                                        setDisplayedPackaging(e.target.value);
                                                        setFilteredPackagings(
                                                            packagings.filter((p) =>
                                                                p.name.toLowerCase().includes(e.target.value.toLowerCase())
                                                            )
                                                        );
                                                        setIsPackagingDropdownOpen(true);
                                                    }}
                                                    onFocus={() => setIsPackagingDropdownOpen(true)}
                                                    onBlur={() => setTimeout(() => setIsPackagingDropdownOpen(false), 200)}
                                                />

                                                {isPackagingDropdownOpen && filteredPackagings.length > 0 && (
                                                    <div className="absolute z-50 bg-white border bottom-full mb-1 w-full shadow-lg max-h-60 overflow-auto">
                                                        {filteredPackagings.map((packaging:IPackaging) => (
                                                            <Combobox.Option
                                                                key={packaging.id}
                                                                value={packaging.id}
                                                                className="uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                onMouseDown={() => packagingSelectHandler(packaging)}
                                                            >
                                                                {packaging.name}
                                                            </Combobox.Option>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                    </Combobox>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-2 " >
                                <label className=" font-semibold text-sm text-white" htmlFor="">Catégorie</label>
                                <Combobox
                                    value={watch("category")}
                                    onChange={(selectedId) => {
                                        const selectedCategory = categories.find((c) => c.id === selectedId);
                                        setValue("category", selectedId ?? "");
                                        setDisplayedCategory(selectedCategory?.name ?? "");
                                    }}
                                >
                                        <div className="relative">
                                            <input
                                                className="w-full uppercase border p-2 rounded-md"
                                                placeholder="Saisir ou sélectionner..."
                                                value={displayedCategory}
                                                onChange={(e) => {
                                                    setDisplayedCategory(e.target.value);
                                                    setFilteredCategories(
                                                        categories.filter((c) =>
                                                            c.name.toLowerCase().includes(e.target.value.toLowerCase())
                                                        )
                                                    );
                                                    setIsCategoryDropdownOpen(true);
                                                }}
                                                onFocus={() => setIsCategoryDropdownOpen(true)}
                                                onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
                                            />

                                            {isCategoryDropdownOpen && filteredCategories.length > 0 && (
                                                <div className="absolute z-50 bg-white border bottom-full mb-1 w-full shadow-lg max-h-60 overflow-auto">
                                                    {filteredCategories.map((category:ICategory) => (
                                                        <Combobox.Option
                                                            key={category.id}
                                                            value={category.id}
                                                            className="uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                            onMouseDown={() => categorySelectHandler(category)}
                                                        >
                                                            {category.name}
                                                        </Combobox.Option>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                </Combobox>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 bg-[#7288a5] border-2 border-white p-2 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="flex justify-between " >
                                <div className="w-[60%] " >
                                    <label className=" font-semibold text-sm text-white " htmlFor="">Fournisseur</label>
                                    <div className=" w-full" >
                                        <Combobox
                                            value={watch("supplier")}
                                            onChange={(selectedId) => {
                                                const selectedSupplier = suppliers.find((s) => s.id === selectedId);
                                                setValue("supplier", selectedId ?? "");
                                                setDisplayedSupplier(selectedSupplier?.name ?? "");
                                            }}
                                        >
                                                <div className="relative">
                                                    <input
                                                        className="w-full border p-2 rounded-md"
                                                        placeholder="Saisir ou sélectionner..."
                                                        value={displayedSupplier}
                                                        onChange={(e) => {
                                                            setDisplayedSupplier(e.target.value);
                                                            setfilteredSuppliers(
                                                                suppliers.filter((s) =>
                                                                    s.name.toLowerCase().includes(e.target.value.toLowerCase())
                                                                )
                                                            );
                                                            setIsSupplierDropdownOpen(true);
                                                        }}
                                                        onFocus={() => setIsSupplierDropdownOpen(true)}
                                                        onBlur={() => setTimeout(() => setIsSupplierDropdownOpen(false), 200)}
                                                    />

                                                    {isSupplierDropdownOpen && filteredSuppliers.length > 0 && (
                                                        <div className="absolute z-50 bg-white border bottom-full mb-1 w-full shadow-lg max-h-60 overflow-auto">
                                                            {filteredSuppliers.map((supplier:ISupplier) => (
                                                                <Combobox.Option
                                                                    key={supplier.id}
                                                                    value={supplier.id}
                                                                    className="cursor-pointer uppercase p-2 hover:bg-gray-100"
                                                                    onMouseDown={() => supplierSelectHandler(supplier)}
                                                                >
                                                                    {supplier.name}
                                                                </Combobox.Option>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                        </Combobox>
                                    </div>
                                </div>
                                <div className="" >
                                <label className=" font-semibold text-sm text-white" htmlFor="">Péremption</label>
                                    <Controller
                                        name="expirationDate"
                                        control={control}
                                        render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 pr-4 uppercase rounded-lg border-2 border-black" {...field} type="date" />}
                                        rules={{ required: 'La date est requise' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-2 ">
                            <div className="" >
                                <label className=" font-semibold text-sm text-white" htmlFor="">Alerte</label>
                                <Controller
                                    name="alert"
                                    control={control}
                                    render={({ field }) => <input  className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg pr-4 " {...field} type="number" />}
                                    rules={{ required: 'L alerte est requise' }}
                                />
                            </div>
                            <div className="" >
                                <label className=" font-semibold text-sm text-white" htmlFor="">Qté</label>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field }) => <input  className="w-full text-[14px] bg-blue-500 h-10 pl-4 uppercase rounded-lg pr-4 " {...field} type="number" readOnly />}
                                    rules={{ required: 'La quantité est requise' }}
                                />
                            </div>
                            <div className="col-span-2" >
                                <label className=" font-semibold text-sm text-white" htmlFor="">Devise</label>
                                <div className="flex justify-between  items-center pb-3 border-2 border-white " >
                                    <Controller
                                        name="currency"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <div className=" w-1/3 flex justify-between items-center">
                                                    <input
                                                        type="radio"
                                                        id="USD"
                                                        value={2}
                                                        {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                    />
                                                    <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">USD</label>
                                                </div>
                                                <div className=" w-1/3 flex justify-between items-center">
                                                    <input
                                                        type="radio"
                                                        id="CDF"
                                                        value={1}
                                                        {...register('currency', { required: 'Vous devez choisir une devise' })}
                                                    />
                                                    <label className=' text-[12px]  text-sm font-semibold ' htmlFor="">CDF</label>
                                                </div>
                                            </>
                                        )}
                                        rules={{ required: 'La monnaie est requise' }}
                                    />
                                </div>
                            </div>
                            <div className=" col-span-3 flex " >
                                <div>
                                    <label className=" font-semibold text-sm text-white" htmlFor="">P.A</label>
                                    <Controller
                                        name="purchase_price"
                                        control={control}
                                        render={({ field }) => <input  className="w-full text-[14px] text-center bg-[#F2F7FC] h-10 pl-[8px] uppercase rounded-lg pr-4 border-2 border-black" {...field} type="number" onChange={handleNumberChange} value={number} />}
                                        rules={{ required: 'Le prix dachat est requis' }}
                                    />
                                </div>
                                <div>
                                    <label className=" font-semibold text-sm text-white" htmlFor="">P.V</label>
                                    <Controller
                                        name="selling_price"
                                        control={control}
                                        render={({ field }) => <input  className="w-full text-[14px] text-center bg-[#F2F7FC] h-10 pl-[8px] uppercase rounded-lg pr-4 border-2 border-black" {...field} type="number" value={result} readOnly />}
                                        rules={{ required: 'Le prix de vente est requis' }}
                                    />
                                </div>
                            </div>
                            <div className="" >
                                <label className=" font-semibold text-sm text-white" htmlFor="">TAUX MB</label>
                                <input className="w-full bg-blue-500 text-[14px] h-10 pl-4 uppercase rounded-lg pr-4 " value={1.25} type="number" name="" id="" readOnly/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 pt-8 ">
                            <div className="" >
                                <button type="submit" className=" w-full text-center p-2 bg-[#4594ff] text-white transition duration-300 hover:bg-[#3386e0]  rounded-lg  text-[14px]  " >Modifier</button>
                            </div>
                            <div className=" " >
                                <button className=" w-full  border-[1px] hover:bg-[#FE6212] hover:text-white border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg " onClick={()=> setIsUpdateFormOpen(false)}>Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>  
            </form>
        </div>

    );

}
