import IArticle from "@/app/interfaces/article";
import ICategory from "@/app/interfaces/category";
import IIndication from "@/app/interfaces/indication";
import IMolecule from "@/app/interfaces/molecule";
import IPackaging from "@/app/interfaces/packaging";
import IPlacement from "@/app/interfaces/placement";
import ISupplier from "@/app/interfaces/supplier";
import { createArticle } from "@/app/redux/slices/articles/actions";
import { useArticleService } from "@/app/redux/slices/articles/useArticleService";
import { useCategoryService } from "@/app/redux/slices/category/useCategoryService";
import { useIndicationService } from "@/app/redux/slices/indications/useIndicationService";
import { useMoleculeService } from "@/app/redux/slices/molecules/useMoleculeService";
import { usePackagingService } from "@/app/redux/slices/packaging/usePackagingService";
import { usePlacementService } from "@/app/redux/slices/placements/usePlacementService";
import { useSupplierService } from "@/app/redux/slices/suppliers/useSuppliseService";
import { AppDispatch } from "@/app/redux/store/store";
import { Combobox } from "@headlessui/react";
import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'
import IUser from "@/app/interfaces/user";


interface IFormInputs {
    barcode: string;
    location: string;
    description: string;
    indication: string;
    molecule: string;
    packaging: string;
    category: string ;
    supplier: string;
    expirationDate: string;
    alert: number | null ;
    currency: number;
    quantity: number | null ;
    purchase_price: number;
    selling_price: number;
}



export default function FormTest() {

    const { register, handleSubmit, control, reset, setValue, watch } = useForm<IFormInputs>(
        {defaultValues: {
            barcode : "",
            location : "l",
            description : "",
            indication : "i",
            molecule : "m",
            packaging : "p",
            category : "c",
            supplier : "s",
            expirationDate : "",
            alert : null,
            currency : 1,
            quantity : null,
            purchase_price : 0,
            selling_price : 0,
        }}
    );
    const [ query, setQuery] = useState<string>("");
    const [ locationQuery, setLocationQuery] = useState<string>("NOT SET");
    const [ descriptionQuery, setDescriptionQuery] = useState<string>("");
    const [ indicationQuery, setIndicationQuery] = useState<string>("NOT SET");
    const [ moleculeQuery, setMoleculeQuery] = useState<string>("NOT SET");
    const [ packagingQuery, setPackagingQuery] = useState<string>("NOT SET");
    const [ categoryQuery, setCategoryQuery] = useState<string>("NOT SET");
    const [ supplierQuery, setSupplierQuery] = useState<string>("NOT SET");
    const [ filteredArticles, setFilteredArticles] = useState<IFormInputs[]>([]);

    const { articles, articleStatus, error } = useArticleService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { packagings, packagingStatus, packagingError } = usePackagingService();
    const { categories, categoryStatus, categoryError } = useCategoryService();
    const { suppliers , supplierStatus, supplierError } = useSupplierService();

    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [isDescriptionDropdownOpen, setIsDescriptionDropdownOpen] = useState(false);
    const [isIndicationDropdownOpen, setIsIndicationDropdownOpen] = useState(false);
    const [isMoleculeDropdownOpen, setIsMoleculeDropdownOpen] = useState(false);
    const [isPackagingDropdownOpen, setIsPackagingDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);

    const { placements, placementStatus, placementError } = usePlacementService();
    const [ filteredLocations, setFilteredLocations] = useState<IPlacement[]>([]);
    const [ filteredDescriptions, setFilteredDescriptions] = useState<IArticle[]>([]);
    const [ filteredIndications, setFilteredIndications] = useState<IIndication[]>([]);
    const [ filteredMolecules, setFilteredMolecules] = useState<IMolecule[]>([]);
    const [ filteredPackagings, setFilteredPackagings] = useState<IPackaging[]>([]);
    const [ filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
    const [ filteredSuppliers, setFilteredSuppliers] = useState<ISupplier[]>([]);

    const [ displayedLocation, setDisplayedLocation ] = useState("");
    const [ displayedIndication, setDisplayedIndication ] = useState("");
    const [ displayedMolecule, setDisplayedMolecule ] = useState("");
    const [ displayedPackaging, setDisplayedPackaging ] = useState("");
    const [ displayedCategory, setDisplayedCategory ] = useState("");
    const [ displayedSupply, setDisplayedSupply ] = useState("");
    const [ user, setUser ] = useState<IUser | null>(null);


    const [number, setNumber] = useState<number | ''>(''); // Utiliser une chaîne vide au départ
    const [result, setResult] = useState<number | ''>(''); // Même chose pour le résultat   
    
    const selectedLocation = watch("location");
    const selectedDescription = watch("description");
    const dispatch = useDispatch<AppDispatch>();

  
    useEffect(() => {

      if (locationQuery) {
        const filtered = placements.filter((placement:IPlacement) =>
            placement.name.toLowerCase().includes(locationQuery.toLowerCase())
        );
        setFilteredLocations(filtered);
      } else {
        setFilteredLocations(placements);
      }

      if (descriptionQuery) {
        const filtered = articles.filter((article:IArticle) =>
            article.description.toLowerCase().includes(descriptionQuery.toLowerCase())
        );
        setFilteredDescriptions(filtered);
      } else {
        setFilteredDescriptions(articles);
      }

      if (indicationQuery) {
        const filtered = indications.filter((indication:IIndication) =>
            indication.name.toLowerCase().includes(indicationQuery.toLowerCase())
        );
        setFilteredIndications(filtered);
      } else {
        setFilteredIndications(indications);
      }

      if (moleculeQuery) {
        const filtered = molecules.filter((molecule:IMolecule) =>
            molecule.name.toLowerCase().includes(moleculeQuery.toLowerCase())
        );
        setFilteredMolecules(filtered);
      } else {
        setFilteredMolecules(molecules);
      }

      if (packagingQuery) {
        const filtered = packagings.filter((packaging:IPackaging) =>
            packaging.name.toLowerCase().includes(packagingQuery.toLowerCase())
        );
        setFilteredPackagings(filtered);
      } else {
        setFilteredPackagings(packagings);
      }

      if (categoryQuery) {
        const filtered = categories.filter((category:ICategory) =>
            category.name.toLowerCase().includes(categoryQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories(categories);
      }

      if (supplierQuery) {
        const filtered = suppliers.filter((supplier:ISupplier) =>
            supplier.name.toLowerCase().includes(supplierQuery.toLowerCase())
        );
        setFilteredSuppliers(filtered);
      } else {
        setFilteredSuppliers(suppliers);
      }

    }, [locationQuery, descriptionQuery, indicationQuery, moleculeQuery, packagingQuery, categoryQuery, supplierQuery ]);
  

    useEffect(()=>{
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    },[])

    const onSubmit = (data:IFormInputs) => {
        // console.log("ARTICLE ", data);

        const { barcode, location, description, indication, molecule, packaging, category, supplier,alert, expirationDate, quantity, purchase_price, selling_price , currency  } = data

        
        const articleData:IArticle = {

            barcode: barcode,
            placements : !isNaN(Number(location)) ? [Number(location)] : locationQuery ,
            description,
            indications : !isNaN(Number(indication)) ? [Number(indication)] : indicationQuery,
            molecules : !isNaN(Number(molecule)) ? [Number(molecule)] : moleculeQuery,
            quantity : quantity !== null  ? quantity : 0 ,
            expiration_date: expirationDate,
            category_id: !isNaN(Number(category)) ? Number(category) : categoryQuery,
            suppliers : !isNaN(Number(supplier)) ? [Number(supplier)] : supplierQuery,
            packaging_id: !isNaN(Number(packaging)) ? Number(packaging) : packagingQuery,
            purchase_price : Number(number),
            selling_price : Number(result),
            alert : Number(alert),
            currency_id: Number(currency) ,
            created_by: user?.name,
            comment : "Pas encore disponible",
            is_active : true,

        }

        console.log("ARTICLE DATA ", articleData);

        const promise = dispatch(createArticle(articleData))
        .unwrap()
        .then(() => ({
          status: "fulfilled",
          message: "Article créé avec succès !",
        }))
        .catch((err) => {
          // Vérifier si err est un objet et récupérer le message
          const errorMessage =
            typeof err === "string" ? err : err?.message || "Erreur inconnue";
      
          return {
            status: "rejected",
            message: errorMessage,
          };
        })
        .then((result) => {
            
            // Affichage du toast
            if (result.status === "fulfilled") {
                // toast.success("Article crée avec succès");
                toast.custom((t: any) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
                    >
                      {/* Icône verte avec fond rouge inversé */}
                      <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">
                        ✅
                      </span>
                      
                      <div className="flex-1 text-center">
                        <p className="text-sm">Article crée avec succès</p>
                      </div>
                    </div>
                ));

          } else {
            // toast.error(result.message);
            console.log(result.message);
            
            toast.custom((t:any) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } flex items-center w-full max-w-xs p-4 text-white bg-red-600 border border-red-900 rounded-lg shadow-lg`}
                >
                  <span className="mr-2 bg-white rounded-full text-[10px] p-[2px] ">❌</span>
                  <div className="flex-1 text-center">
                    {/* <p className="font-bold">Erreur</p> */}
                    <p className="text-sm">{result.message}</p>
                  </div>
                </div>
            ));
          }
        });
        

    }

    const managePlacementFocusHandler = (placements:IPlacement[]) => {
        setFilteredLocations(placements)
        setIsLocationDropdownOpen(true)
    }

    const manageDescriptionFocusHandler = (articles:IArticle[]) => {
        setFilteredDescriptions(articles)
        setIsDescriptionDropdownOpen(true)
    }

    const manageIndicationFocusHandler = (indications:IIndication[]) => {
        setFilteredIndications(indications)
        setIsIndicationDropdownOpen(true)
    }

    const manageMoleculeFocusHandler = (molecules:IMolecule[]) => {
        setFilteredMolecules(molecules)
        setIsMoleculeDropdownOpen(true)
    }

    const managePackagingFocusHandler = (packagings:IPackaging[]) => {
        setFilteredPackagings(packagings)
        setIsPackagingDropdownOpen(true)
    }

    const manageCategoryFocusHandler = (categories:ICategory[]) => {
        setFilteredCategories(categories)
        setIsCategoryDropdownOpen(true)
    }


    const manageSupplierFocusHandler = (suppliers:ISupplier[]) => {
        setFilteredSuppliers(suppliers)
        setIsSupplierDropdownOpen(true)
    }

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;

        if (value === '') {
            setNumber('');
            setResult('');
            setValue("purchase_price", 0);
            setValue("selling_price", 0);
            return;
        }
    
        const parsedValue = parseFloat(value);
        
        if (!isNaN(parsedValue)) {
            setNumber(parsedValue);
            const calculatedSellingPrice = parsedValue * 1.25;
            setResult(calculatedSellingPrice);
            setValue("purchase_price", parsedValue);
            setValue("selling_price", calculatedSellingPrice);
        }
        
    }

  
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
        <Toaster />
        <div className="grid grid-cols-12  gap-x-5 p-5 " >
            <div className="col-span-6 bg-[#7288a5fd] border-2 border-white p-2  space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                <div className="grid grid-cols-2 gap-5">
                    <div className=" flex items-center " >
                        <label className=" w-1/3 font-semibold text-sm text-white" htmlFor="">Code barre</label>
                        <Controller
                            name="barcode"
                            control={control}
                            // defaultValue=""
                            render={({ field }) => <input {...field} className="w-full text-[14px] bg-[#F2F7FC] h-10 pl-4 uppercase rounded-lg border-2 border-black" type="text" />}
                            rules={{ required: 'Le code barre est requis' }}
                        />
                    </div>
                    <div className=" flex items-center justify-end gap-2 " >
                        <label className=" font-semibold text-sm text-white" htmlFor="">Localisation</label>
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <Combobox 
                                    value={field.value ?? ""} 
                                    onChange={(selectedId) => {
                                      const selectedLocation = placements.find((placement) => placement.id === selectedId);
                                      setValue("location", selectedId ?? "");  // Stocke l'ID
                                      setDisplayedLocation(selectedLocation?.name ?? "");  // Affiche le Nom
                                    }}
                                >
                                <div className="relative">
                                    <input
                                        {...field}
                                        className="w-full uppercase border rounded-md p-2"
                                        placeholder="Saisir une location..."
                                        value={displayedLocation}
                                        // value={displayedLocation} // On affiche le nom
                                        onChange={(e) => {
                                            setLocationQuery(e.target.value);
                                            // setValue("location", e.target.value);
                                            setDisplayedLocation(e.target.value); // Permet la saisie manuelle
                                        }}
                                        onFocus={() => managePlacementFocusHandler(placements)}
                                        onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                    />
                                    {
                                        isLocationDropdownOpen &&(
                                            filteredLocations.length > 0 && (
                                                <div className=" uppercase absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {
                                                        filteredLocations
                                                        .filter((location: IPlacement) => location.name !== "NOT SET") // Filter out "NOT SET"
                                                        .map((location: IPlacement) => (
                                                            <Combobox.Option
                                                                key={location.id}
                                                                value={location.id}
                                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                                onMouseDown={() => setIsLocationDropdownOpen(false)}
                                                            >
                                                                {location.name}
                                                            </Combobox.Option>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                </Combobox>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 ">
                    <div className=" flex items-center " >
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Description</label>
                        <div className=" w-[88%] " >
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("description", value ?? "")}>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                className=" w-full border rounded-md p-2 uppercase"
                                                placeholder="Saisir un article ..."
                                                onChange={(e) => {
                                                    setDescriptionQuery(e.target.value);
                                                    setValue("description", e.target.value);
                                                }}
                                                onFocus={() => manageDescriptionFocusHandler(articles)}
                                                onBlur={() => setTimeout(() => setIsDescriptionDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                            />
                                            {
                                                isDescriptionDropdownOpen && (
                                                    filteredDescriptions.length > 0 && (
                                                        <div className=" uppercase absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                            {filteredDescriptions.map((description) => (
                                                            <Combobox.Option
                                                                key={description.id}
                                                                value={description.description}
                                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                                onMouseDown={() => setIsDescriptionDropdownOpen(false)}
                                                            >
                                                                {description.description}
                                                            </Combobox.Option>
                                                            ))}
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 ">
                    <div className=" flex items-center " >
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Indication</label>
                        <div className=" w-[88%] " >
                            <Controller
                                name="indication"
                                control={control}
                                render={({ field }) => (
                                    <Combobox 
                                        value={field.value ?? ""} 
                                        // onChange={(value) => setValue("indication", value ?? "")}
                                        onChange={(selectedId) => {
                                            const selectedIndication = indications.find((indication) => indication.id === selectedId);
                                            setValue("indication", selectedId ?? "");  // Stocke l'ID
                                            setDisplayedIndication(selectedIndication?.name ?? "");  // Affiche le Nom
                                        }}
                                    >
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" uppercase w-full border rounded-md p-2"
                                            placeholder="Saisir ou séléctionner une indication ..."
                                            value={displayedIndication} // On affiche le nom
                                            onChange={(e) => {
                                                setIndicationQuery(e.target.value);
                                                // setValue("indication", e.target.value);
                                                setDisplayedIndication(e.target.value); // Permet la saisie manuelle
                                            }}

                                            onFocus={() => manageIndicationFocusHandler(indications)}
                                            onBlur={() => setTimeout(() => setIsIndicationDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                        />
                                        {filteredIndications.length > 0 && (
                                            isIndicationDropdownOpen && (
                                                <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {
                                                        filteredIndications
                                                        .filter((indication) => indication.name !== "NOT SET") // Filter out "NOT SET"
                                                        .map((indication) => (
                                                            <Combobox.Option
                                                                key={indication.id}
                                                                value={indication.id}
                                                                className=" uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                onMouseDown={() => setIsIndicationDropdownOpen(false)}
                                                            >
                                                                {indication.name}
                                                            </Combobox.Option>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        )}
                                    </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 ">
                    <div className=" flex items-center " >
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Molécule</label>
                        <div className=" w-[88%] " >
                            <Controller
                                name="molecule"
                                control={control}
                                render={({ field }) => (
                                    <Combobox 
                                        value={field.value ?? ""} 
                                        // onChange={(value) => setValue("molecule", value ?? "")}
                                        onChange={(selectedId) => {
                                            const selectedMolecule = molecules.find((molecule) => molecule.id === selectedId);
                                            setValue("molecule", selectedId ?? "");  // Stocke l'ID
                                            setDisplayedMolecule(selectedMolecule?.name ?? "");  // Affiche le Nom
                                        }}
                                    >
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" uppercase w-full border rounded-md p-2"
                                            placeholder="Saisir un article ..."
                                            onChange={(e) => {
                                                setMoleculeQuery(e.target.value);
                                                setValue("molecule", e.target.value);
                                                setDisplayedMolecule(e.target.value); // Permet la saisie manuelle
                                            }}
                                            value={displayedMolecule} // On affiche le nom
                                            onFocus={() => manageMoleculeFocusHandler(molecules)}
                                            onBlur={() => setTimeout(() => setIsMoleculeDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                        />
                                        {
                                            isMoleculeDropdownOpen && (
                                                filteredMolecules.length > 0 && (
                                                    <div className="absolute uppercase z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                        {
                                                            filteredMolecules
                                                            .filter((molecule) => molecule.name !== "NOT SET") // Filter out "NOT SET"
                                                            .map((molecule) => (
                                                                <Combobox.Option
                                                                    key={molecule.id}
                                                                    value={molecule.id}
                                                                    className=" uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                    onMouseDown={() => setIsMoleculeDropdownOpen(false)}
                                                                >
                                                                    {molecule.name}
                                                                </Combobox.Option>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 ">
                    <div className=" flex items-center " >
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Emballage</label>
                        <div className=" w-[36%] " >
                            <Controller
                                name="packaging"
                                control={control}
                                render={({ field }) => (
                                    <Combobox 
                                        value={field.value ?? ""} 
                                        // onChange={(value) => setValue("packaging", value ?? "")}
                                        onChange={(selectedId) => {
                                            const selectedPackaging = packagings.find((packaging:IPackaging) => packaging.id === selectedId);
                                            setValue("packaging", selectedId ?? "");  // Stocke l'ID
                                            setDisplayedPackaging(selectedPackaging?.name ?? "");  // Affiche le Nom
                                        }}
                                    >
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un emballage ..."
                                            onChange={(e) => {
                                                setPackagingQuery(e.target.value);
                                                setValue("packaging", e.target.value);
                                                setDisplayedPackaging(e.target.value); // Permet la saisie manuelle
                                            }}
                                            value={displayedPackaging} // On affiche le nom
                                            onFocus={() => managePackagingFocusHandler(packagings)}
                                            onBlur={() => setTimeout(() => setIsPackagingDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                        />
                                        {
                                            isPackagingDropdownOpen && (
                                                filteredPackagings.length > 0 && (
                                                    <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                        {
                                                            filteredPackagings
                                                            .filter((packaging: IPackaging) => packaging.name !== "NOT SET") // Filter out "NOT SET"
                                                            .map((packaging: IPackaging) => (
                                                                <Combobox.Option
                                                                    key={packaging.id}
                                                                    value={packaging.id}
                                                                    className=" uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                    onMouseDown={() => setIsPackagingDropdownOpen(false)}
                                                                >
                                                                    {packaging.name}
                                                                </Combobox.Option>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                        <label className=" w-[12%] font-semibold text-sm text-white ml-9 " htmlFor="">Catégorie</label>
                        <div className=" w-[36%] " >
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Combobox 
                                        value={field.value ?? ""} 
                                        // onChange={(value) => setValue("category", value ?? "")}
                                        onChange={(selectedId) => {
                                            const selectedCategory = categories.find((category) => category.id === selectedId);
                                            setValue("category", selectedId ?? "");  // Stocke l'ID
                                            setDisplayedCategory(selectedCategory?.name ?? "");  // Affiche le Nom
                                        }}
                                    >
                                        <div className="relative">
                                            <input
                                                {...field}
                                                className=" w-full border rounded-md p-2"
                                                placeholder="Saisir une categorie ..."
                                                onChange={(e) => {
                                                    setCategoryQuery(e.target.value);
                                                    setValue("category", e.target.value);
                                                    setDisplayedCategory(e.target.value); // Permet la saisie manuelle
                                                }}
                                                value={displayedCategory} // On affiche le nom
                                                onFocus={() => manageCategoryFocusHandler(categories)}
                                                onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                            />
                                            {filteredCategories.length > 0 && (
                                            <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                {
                                                    isCategoryDropdownOpen && (
                                                        filteredCategories.filter((category: ICategory) => category.name !== "NOT SET") // Filter out "NOT SET"
                                                        .map((category: ICategory) => (
                                                            <Combobox.Option
                                                                key={category.id}
                                                                value={category.id}
                                                                className=" uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                onMouseDown={() => setIsCategoryDropdownOpen(false)}
                                                            >
                                                                {category.name}
                                                            </Combobox.Option>
                                                        ))
                                                    )
                                                }
                                            </div>
                                            )}
                                        </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-6 bg-[#7288a5d0] border-2 border-white p-2   space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                <div className="grid grid-cols-1 gap-5">
                    <div className=" flex items-center gap-2 " >
                        <label className=" w-[12%] font-semibold text-sm  text-white " htmlFor="">Fournisseur</label>
                        <div className="w-[88%]" >
                            <Controller
                                name="supplier"
                                control={control}
                                render={({ field }) => (
                                    <Combobox 
                                        value={field.value ?? ""} 
                                        // onChange={(value) => setValue("supplier", value ?? "")}
                                        onChange={(selectedId) => {
                                            const selectedSupplier = suppliers.find((supplier) => supplier.id === selectedId);
                                            setValue("supplier", selectedId ?? "");  // Stocke l'ID
                                            setDisplayedSupply(selectedSupplier?.name ?? "");  // Affiche le Nom
                                        }}
                                    >
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un emballage ..."
                                            onChange={(e) => {
                                                setSupplierQuery(e.target.value);
                                                setValue("supplier", e.target.value);
                                                setDisplayedSupply(e.target.value); // Permet la saisie manuelle
                                            }}
                                            value={displayedSupply} // On affiche le nom
                                            onFocus={() => manageSupplierFocusHandler(suppliers)}
                                            onBlur={() => setTimeout(() => setIsSupplierDropdownOpen(false), 200)} // Ferme après 200ms pour éviter la fermeture avant le clic
                                        />
                                        {
                                            isSupplierDropdownOpen && (
                                                filteredSuppliers.length > 0 && (
                                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                            {
                                                                filteredSuppliers
                                                                .filter((supplier: ISupplier) => supplier.name !== "NOT SET") // Filter out "NOT SET"
                                                                .map((supplier: ISupplier) => (
                                                                    <Combobox.Option
                                                                        key={supplier.id}
                                                                        value={supplier.id}
                                                                        className=" uppercase cursor-pointer p-2 hover:bg-gray-100"
                                                                        onMouseDown={() => setIsSupplierDropdownOpen(false)}
                                                                    >
                                                                        {supplier.name}
                                                                    </Combobox.Option>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                            )
                                        }
                                    </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className=" flex items-center " >
                        <label className=" w-[38%] font-semibold text-sm text-white" htmlFor="">Alerte</label>
                        <Controller
                            name="alert"
                            control={control}
                            render={({ field }) => <input {...field} value={field.value ?? ""}  className="w-full font-bold text-[14px] h-10 pl-4 uppercase rounded-lg pr-4 border-[1px] border-black" type="number" />}
                            rules={{ required: 'L alerte est requise' }}
                        />
                    </div>
                    <div className="flex items-center gap-2 " >
                        <label className=" font-semibold text-sm text-white" htmlFor="">Péremption</label>
                        <Controller
                            name="expirationDate"
                            control={control}
                            render={({ field }) => <input  className="w-full text-[14px] h-10 pl-4 pr-4 uppercase rounded-lg font-bold border-[1px] border-black" {...field} type="date" />}
                            rules={{ required: 'La date est requise' }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-5">
                    <div className=" flex justify-between pb-3 border-2 border-white px-4 items-center  " >
                        <Controller
                        name="currency"
                        control={control}
                        render={({ field }) => (
                            <>
                                <div className="w-1/3 flex justify-between items-center">
                                    <input
                                    type="radio"
                                    id="USD"
                                    value={2}
                                    checked={field.value === 2} // Check if the value matches 1
                                    onChange={(e) => field.onChange(Number(e.target.value))} // Update the value
                                    />
                                    <label className="text-[12px] text-sm font-semibold text-white" htmlFor="USD">
                                    USD
                                    </label>
                                </div>

                                <div className="w-1/3 flex justify-between items-center">
                                    <input
                                    type="radio"
                                    id="CDF"
                                    value={1}
                                    checked={field.value === 1} // Check if the value matches 2
                                    onChange={(e) => field.onChange(Number(e.target.value))} // Update the value
                                    />
                                    <label className="text-[12px] text-sm font-semibold text-white" htmlFor="CDF">
                                    CDF
                                    </label>
                                </div>
                            </>
                        )}
                        rules={{ required: 'La monnaie est requise' }} // Validation rule
                        />
                    </div>
                    <div className=" gap-2 " >
                        <label className=" font-semibold text-sm text-white" htmlFor="">Quantité</label>
                        <Controller
                            name="quantity"
                            control={control}
                            render={({ field }) => <input {...field} value={field.value ?? ""}  className="w-full text-[14px] h-10 pl-4 uppercase rounded-lg pr-4 font-bold border-[1px] border-black"  type="number" />}
                            rules={{ required: 'La quantité est requise' }}
                        />
                    </div>
                    <div className=" gap-2" >
                        <label className=" font-semibold text-sm text-white" htmlFor="">P.A</label>
                        <Controller
                            name="purchase_price"
                            control={control}
                            render={({ field }) => <input  className="w-full font-bold text-[14px] h-10 pl-4 uppercase rounded-lg pr-4 border-[1px] border-black" {...field} type="number" onChange={handleNumberChange} value={number}  />}
                            rules={{ required: 'Le prix dachat est requis' }}
                        />

                        
                    </div>
                    <div className=" gap-2" >
                        <label className=" font-semibold text-sm text-white" htmlFor="">P.V</label>
                        <Controller
                            name="selling_price"
                            control={control}
                            render={({ field }) => <input  className="w-full font-bold text-[14px] h-10 pl-4 uppercase rounded-lg pr-4 border-[1px] border-black" {...field} type="number" value={result} readOnly />}
                            rules={{ required: 'Le prix de vente est requis' }}
                        />
                    </div>
                    <div className=" gap-2" >
                        <label className="font-semibold text-sm  text-white" htmlFor="">TAUX MB</label>
                        <input className=" w-full font-bold text-[14px] border-2 border-black bg-blue-600 border-none h-10 pl-4 uppercase rounded-lg pr-4" value={1.25} type="number" name="" id="" readOnly/>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-5 pt-8 ">
                    <div className=" " >
                        <button className="  w-full  border-[1px] hover:bg-[#FE6212] hover: border-[#FE6212] text-center  text-[14px] p-2 transition duration-300 text-[#FE6212] rounded-lg hover:text-white " >Annuler</button>
                    </div>
                    <div className="" >
                        <button type="submit" className=" text-white w-full text-center p-2 bg-[#28A745]  transition duration-300 hover:bg-[#1E7E34]  rounded-lg  text-[14px]  " >Enregistrer</button>
                    </div>
                </div>
            </div>
            

            
        </div>  

        </form>
    );
}



// import { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { Combobox } from "@headlessui/react";
// import toast, { Toaster } from "react-hot-toast";
// import { getArticleById } from "@/app/redux/slices/articles/actions";
// import { updateArticle } from "@/app/redux/slices/articles/actions";
// import { usePlacementService } from "@/app/redux/slices/placements/usePlacementService";
// import IPlacement from "@/app/interfaces/placement";
// import IArticle from "@/app/interfaces/article";

// interface IFormInputs {
//     barcode: string;
//     location: string;
//     description: string;
//     expirationDate: string;
//     quantity: number;
//     purchase_price: number;
//     selling_price: number;
// }

// export default function UpdateArticleForm({ articleId }: { articleId: string }) {

//     const dispatch = useDispatch();
//     const router = useRouter();
//     const { register, handleSubmit, control, setValue, watch } = useForm<IFormInputs>();
//     const { placements } = usePlacementService();

//     const [displayedLocation, setDisplayedLocation] = useState("");
//     const [filteredLocations, setFilteredLocations] = useState<IPlacement[]>([]);
//     const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

//     useEffect(() => {
//         // Charger l'article à modifier
//         const fetchArticle = async () => {
//             try {
//                 const article = await getArticleById(articleId);
//                 setValue("barcode", article.barcode);
//                 setValue("location", article.location);
//                 setValue("description", article.description);
//                 setValue("expirationDate", article.expirationDate);
//                 setValue("quantity", article.quantity);
//                 setValue("purchase_price", article.purchase_price);
//                 setValue("selling_price", article.selling_price);

//                 const selectedLocation = placements.find((p) => p.id === article.location);
//                 setDisplayedLocation(selectedLocation?.name ?? article.location);
//             } catch (error) {
//                 console.error(error);
//                 toast.error("Erreur lors du chargement de l'article.");
//             }
//         };

//         fetchArticle();
//     }, [articleId, placements, setValue]);

//     const onSubmit = async (data: IFormInputs) => {
//         try {
//             const updatedData = {
//                 ...data,
//                 location: displayedLocation // Envoi de la valeur mise à jour
//             };
//             await dispatch(updateArticle(updatedData)).unwrap();
//             toast.success("Article mis à jour avec succès !");
//             router.push("/articles"); // Redirection après la mise à jour
//         } catch (error) {
//             console.error(error);
//             toast.error("Erreur lors de la mise à jour.");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-gray-100">
//             <Toaster />
//             <div className="grid grid-cols-2 gap-5">
//                 <div>
//                     <label className="block">Code barre</label>
//                     <input
//                         {...register("barcode")}
//                         className="w-full border p-2 rounded-md"
//                         type="text"
//                         placeholder="Code barre"
//                     />
//                 </div>

//                 {/* Localisation avec modification possible */}
//                 <div>
//                     <label className="block">Localisation</label>
//                     <Combobox
//                         value={watch("location")}
//                         onChange={(selectedId) => {
//                             const selectedLocation = placements.find((p) => p.id === selectedId);
//                             setValue("location", selectedId ?? "");
//                             setDisplayedLocation(selectedLocation?.name ?? "");
//                         }}
//                     >
//                         <div className="relative">
//                             <input
//                                 className="w-full border p-2 rounded-md"
//                                 placeholder="Saisir ou sélectionner..."
//                                 value={displayedLocation}
//                                 onChange={(e) => {
//                                     setDisplayedLocation(e.target.value);
//                                     setFilteredLocations(
//                                         placements.filter((p) =>
//                                             p.name.toLowerCase().includes(e.target.value.toLowerCase())
//                                         )
//                                     );
//                                     setIsLocationDropdownOpen(true);
//                                 }}
//                                 onFocus={() => setIsLocationDropdownOpen(true)}
//                                 onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
//                             />

//                             {isLocationDropdownOpen && filteredLocations.length > 0 && (
//                                 <div className="absolute bg-white border mt-1 w-full shadow-lg max-h-60 overflow-auto">
//                                     {filteredLocations.map((location) => (
//                                         <Combobox.Option
//                                             key={location.id}
//                                             value={location.id}
//                                             className="cursor-pointer p-2 hover:bg-gray-100"
//                                             onMouseDown={() => setDisplayedLocation(location.name)}
//                                         >
//                                             {location.name}
//                                         </Combobox.Option>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </Combobox>
//                 </div>

//                 <div>
//                     <label className="block">Description</label>
//                     <input
//                         {...register("description")}
//                         className="w-full border p-2 rounded-md"
//                         type="text"
//                         placeholder="Description"
//                     />
//                 </div>

//                 <div>
//                     <label className="block">Date d'expiration</label>
//                     <input
//                         {...register("expirationDate")}
//                         className="w-full border p-2 rounded-md"
//                         type="date"
//                     />
//                 </div>

//                 <div>
//                     <label className="block">Quantité</label>
//                     <input
//                         {...register("quantity")}
//                         className="w-full border p-2 rounded-md"
//                         type="number"
//                         placeholder="Quantité"
//                     />
//                 </div>

//                 <div>
//                     <label className="block">Prix d'achat</label>
//                     <input
//                         {...register("purchase_price")}
//                         className="w-full border p-2 rounded-md"
//                         type="number"
//                         placeholder="Prix d'achat"
//                     />
//                 </div>

//                 <div>
//                     <label className="block">Prix de vente</label>
//                     <input
//                         {...register("selling_price")}
//                         className="w-full border p-2 rounded-md"
//                         type="number"
//                         placeholder="Prix de vente"
//                     />
//                 </div>
//             </div>

//             <div className="mt-5 flex justify-end gap-3">
//                 <button type="button" className="px-4 py-2 border rounded-md text-gray-700">
//                     Annuler
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
//                     Enregistrer
//                 </button>
//             </div>
//         </form>
//     );
// }
