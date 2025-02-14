import IArticle from "@/app/interfaces/article";
import ICategory from "@/app/interfaces/category";
import IIndication from "@/app/interfaces/indication";
import IMolecule from "@/app/interfaces/molecule";
import IPackaging from "@/app/interfaces/packaging";
import IPlacement from "@/app/interfaces/placement";
import { useArticleService } from "@/app/redux/slices/articles/useArticleService";
import { useCategoryService } from "@/app/redux/slices/category/useCategoryService";
import { useIndicationService } from "@/app/redux/slices/indications/useIndicationService";
import { useMoleculeService } from "@/app/redux/slices/molecules/useMoleculeService";
import { usePackagingService } from "@/app/redux/slices/packaging/usePackagingService";
import { usePlacementService } from "@/app/redux/slices/placements/usePlacementService";
import { Combobox } from "@headlessui/react";
import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";

// type Article = {
//     id: number;
//     name: string;
//     barcode: string;
//     location: string;
// };


interface IFormInputs {
    barcode: string;
    location: string;
    description: string;
    indication: string;
    molecule: string;
    packaging: string;
    category: string;
    supplier: string;
    expirationDate: string;
    alert: number;
    currency: number;
    quantity: number;
    purchase_price: number;
    selling_price: number;
}


// Liste simulée d'articles (remplace ceci par une API)
// const articlesFromDB: Article[] = [
//   { id: 1, name: "Ordinateur" },
//   { id: 2, name: "Clavier" },
//   { id: 3, name: "Souris" },
//   { id: 4, name: "Écran" },
// ];

type FormData = {
  article: string;
};


export default function FormTest() {

    const { register, handleSubmit, control, setValue, watch } = useForm<IFormInputs>();
    const [ query, setQuery] = useState<string>("");
    const [ locationQuery, setLocationQuery] = useState<string>("");
    const [ descriptionQuery, setDescriptionQuery] = useState<string>("");
    const [ indicationQuery, setIndicationQuery] = useState<string>("");
    const [ moleculeQuery, setMoleculeQuery] = useState<string>("");
    const [ packagingQuery, setPackagingQuery] = useState<string>("");
    const [ categoryQuery, setCategoryQuery] = useState<string>("");
    const [ filteredArticles, setFilteredArticles] = useState<IFormInputs[]>([]);
    const { articles, articleStatus, error } = useArticleService();
    const { indications, indicationStatus, indicationError } = useIndicationService();
    const { molecules, moleculeStatus, moleculeError } = useMoleculeService();
    const { packagings, packagingStatus, packagingError } = usePackagingService();
    const { categories, categoryStatus, categoryError } = useCategoryService()

    const { placements, placementStatus, placementError } = usePlacementService();
    const [ filteredLocations, setFilteredLocations] = useState<IPlacement[]>([]);
    const [ filteredDescriptions, setFilteredDescriptions] = useState<IArticle[]>([]);
    const [ filteredIndications, setFilteredIndications] = useState<IIndication[]>([]);
    const [ filteredMolecules, setFilteredMolecules] = useState<IMolecule[]>([]);
    const [ filteredPackagings, setFilteredPackagings] = useState<IPackaging[]>([]);
    const [ filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);    
    
    const selectedLocation = watch("location");
    const selectedDescription = watch("description");

  
    useEffect(() => {

      if (locationQuery) {
        const filtered = placements.filter((placement:IPlacement) =>
            placement.name.toLowerCase().includes(locationQuery.toLowerCase())
        );
        setFilteredLocations(filtered);
      } else {
        setFilteredLocations([]);
      }

      if (descriptionQuery) {
        const filtered = articles.filter((article:IArticle) =>
            article.description.toLowerCase().includes(descriptionQuery.toLowerCase())
        );
        setFilteredDescriptions(filtered);
      } else {
        setFilteredDescriptions([]);
      }

      if (indicationQuery) {
        const filtered = indications.filter((indication:IIndication) =>
            indication.name.toLowerCase().includes(indicationQuery.toLowerCase())
        );
        setFilteredIndications(filtered);
      } else {
        setFilteredIndications([]);
      }

      if (moleculeQuery) {
        const filtered = molecules.filter((molecule:IMolecule) =>
            molecule.name.toLowerCase().includes(moleculeQuery.toLowerCase())
        );
        setFilteredMolecules(filtered);
      } else {
        setFilteredMolecules([]);
      }

      if (packagingQuery) {
        const filtered = packagings.filter((packaging:IPackaging) =>
            packaging.name.toLowerCase().includes(packagingQuery.toLowerCase())
        );
        setFilteredPackagings(filtered);
      } else {
        setFilteredPackagings([]);
      }

      if (categoryQuery) {
        const filtered = categories.filter((category:ICategory) =>
            category.name.toLowerCase().includes(categoryQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories([]);
      }

    }, [locationQuery, descriptionQuery, indicationQuery, moleculeQuery, packagingQuery, categoryQuery]);
  
    // const onSubmit = (data: FormData) => {
    //   console.log("Article validé:", data.article);
    //   // Envoyer les données au backend
    // };

    const onSubmit = () => {

    }

  
    return (

    <form onSubmit={handleSubmit(onSubmit)} >

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
                                <Combobox value={field.value ?? ""} onChange={(value) => setValue("location", value ?? "")}>
                                <div className="relative">
                                    <input
                                    {...field}
                                    className="w-full border rounded-md p-2"
                                    placeholder="Saisir une location..."
                                    onChange={(e) => {
                                        setLocationQuery(e.target.value);
                                        setValue("location", e.target.value);
                                    }}
                                    />
                                    {filteredLocations.length > 0 && (
                                    <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                        {filteredLocations.map((location) => (
                                        <Combobox.Option
                                            key={location.id}
                                            value={location.name}
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {location.name}
                                        </Combobox.Option>
                                        ))}
                                    </div>
                                    )}
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
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un article ..."
                                            onChange={(e) => {
                                                setDescriptionQuery(e.target.value);
                                                setValue("description", e.target.value);
                                            }}
                                        />
                                        {filteredDescriptions.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredDescriptions.map((description) => (
                                            <Combobox.Option
                                                key={description.id}
                                                value={description.description}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {description.description}
                                            </Combobox.Option>
                                            ))}
                                        </div>
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
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Indication</label>
                        <div className=" w-[88%] " >
                            <Controller
                                name="indication"
                                control={control}
                                render={({ field }) => (
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("indication", value ?? "")}>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un article ..."
                                            onChange={(e) => {
                                                setIndicationQuery(e.target.value);
                                                setValue("indication", e.target.value);
                                            }}
                                        />
                                        {filteredIndications.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredIndications.map((indication) => (
                                            <Combobox.Option
                                                key={indication.id}
                                                value={indication.name}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {indication.name}
                                            </Combobox.Option>
                                            ))}
                                        </div>
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
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("molecule", value ?? "")}>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un article ..."
                                            onChange={(e) => {
                                                setMoleculeQuery(e.target.value);
                                                setValue("molecule", e.target.value);
                                            }}
                                        />
                                        {filteredMolecules.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredMolecules.map((molecule) => (
                                            <Combobox.Option
                                                key={molecule.id}
                                                value={molecule.name}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {molecule.name}
                                            </Combobox.Option>
                                            ))}
                                        </div>
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
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Emballage</label>
                        <div className=" w-[36%] " >
                            <Controller
                                name="packaging"
                                control={control}
                                render={({ field }) => (
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("packaging", value ?? "")}>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un emballage ..."
                                            onChange={(e) => {
                                                setPackagingQuery(e.target.value);
                                                setValue("packaging", e.target.value);
                                            }}
                                        />
                                        {filteredPackagings.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredPackagings.map((packaging:IPackaging) => (
                                            <Combobox.Option
                                                key={packaging.id}
                                                value={packaging.name}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {packaging.name}
                                            </Combobox.Option>
                                            ))}
                                        </div>
                                        )}
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
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("category", value ?? "")}>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir une categorie ..."
                                            onChange={(e) => {
                                                setCategoryQuery(e.target.value);
                                                setValue("category", e.target.value);
                                            }}
                                        />
                                        {filteredCategories.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredCategories.map((category:ICategory) => (
                                            <Combobox.Option
                                                key={category.id}
                                                value={category.name}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {category.name}
                                            </Combobox.Option>
                                            ))}
                                        </div>
                                        )}
                                    </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 gap-5">
                    <div className="flex items-center justify-between " >
                        <label className=" font-semibold text-sm text-white" htmlFor="">Molécule</label>
                        <Controller
                            name="molecule"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={moleculeFormated}
                                    placeholder="Sélectionnez un molécule"
                                    isClearable
                                    className="border-2 border-black w-[87.5%]"
                                />
                            )}
                            rules={{ required: 'Le molécule est requis' }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center " >
                        <label className=" w-1/3  font-semibold text-sm text-white" htmlFor="">Emballage</label>
                        <Controller
                            name="packaging"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={packagingsFormated}
                                    placeholder="Sélectionnez l'emballage "
                                    isClearable
                                    className="border-2 border-black w-full "
                                />
                            )}
                            rules={{ required: 'L emballage est requis' }}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-2 " >
                        <label className=" font-semibold text-sm text-white" htmlFor="">Catégorie</label>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={categoriesFormated}
                                    placeholder="Sélectionnez une categorie"
                                    isClearable
                                    className="border-2 border-black"
                                />
                            )}
                            rules={{ required: 'La catégorie est requise' }}
                        />
                    </div>
                </div> */}
            </div>
            <div className="col-span-6 bg-[#7288a5] border-2 border-white p-2 space-y-4 shadow-[0px_4px_8px_0px_#00000026] ">
                <div className="grid grid-cols-1 gap-5 ">
                    <div className=" flex items-center " >
                        <label className=" w-[12%] font-semibold text-sm text-white" htmlFor="">Fournisseur</label>
                        <div className=" w-[36%] " >
                            <Controller
                                name="packaging"
                                control={control}
                                render={({ field }) => (
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("packaging", value ?? "")}>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir un emballage ..."
                                            onChange={(e) => {
                                                setPackagingQuery(e.target.value);
                                                setValue("packaging", e.target.value);
                                            }}
                                        />
                                        {filteredPackagings.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredPackagings.map((packaging:IPackaging) => (
                                            <Combobox.Option
                                                key={packaging.id}
                                                value={packaging.name}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {packaging.name}
                                            </Combobox.Option>
                                            ))}
                                        </div>
                                        )}
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
                                    <Combobox value={field.value ?? ""} onChange={(value) => setValue("category", value ?? "")}>
                                    <div className="relative">
                                        <input
                                            {...field}
                                            className=" w-full border rounded-md p-2"
                                            placeholder="Saisir une categorie ..."
                                            onChange={(e) => {
                                                setCategoryQuery(e.target.value);
                                                setValue("category", e.target.value);
                                            }}
                                        />
                                        {filteredCategories.length > 0 && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredCategories.map((category:ICategory) => (
                                            <Combobox.Option
                                                key={category.id}
                                                value={category.name}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {category.name}
                                            </Combobox.Option>
                                            ))}
                                        </div>
                                        )}
                                    </div>
                                    </Combobox>
                                )}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-8 gap-2 ">
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
                </div> */}

            </div>
        </div>  

        <label className="block mb-2">Nom de l'article</label>
  
        {/* <Controller
          name="article"
          control={control}
          render={({ field }) => (
            <Combobox value={field.value ?? ""} onChange={(value) => setValue("article", value ?? "")}>
              <div className="relative">
                <input
                  {...field}
                  className="w-full border rounded-md p-2"
                  placeholder="Saisir un article..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setValue("article", e.target.value);
                  }}
                />
                {filteredArticles.length > 0 && (
                  <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredArticles.map((article) => (
                      <Combobox.Option
                        key={article.id}
                        value={article.name}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {article.name}
                      </Combobox.Option>
                    ))}
                  </div>
                )}
              </div>
            </Combobox>
          )}
        /> */}
  
        {/* Message si l'article n'existe pas */}
        {filteredArticles.length === 0 && query && (
          <p className="text-sm text-green-600 mt-1">Cet article n'existe pas encore et peut être créé.</p>
        )}





        {/* Empêcher la soumission si l'article existe déjà */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md disabled:bg-gray-400"
        //   disabled={filteredArticles.some((article) => article.name.toLowerCase() === selectedArticle?.toLowerCase())}
        >
          Valider
        </button>

      </form>
    );
}
