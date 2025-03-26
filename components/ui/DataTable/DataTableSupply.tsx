
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState
} from "@tanstack/react-table";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserPlus,
  ListFilterIcon,
  List,
  Grid3X3,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from '@iconify/react';
import IArticle from "@/app/interfaces/article";
import FormArticleUpdate from "@/app/components/form/FormArticleUpdate";
import FormArticleAppro from "@/app/components/form/FormArticleAppro";
import { useMovementService } from "@/app/redux/slices/movements/useMovementService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store/store";
import { fetchMovements } from "@/app/redux/slices/movements/actions";
import StockRegulForm from "@/app/components/form/StockRegulForm";
import SaleRegulForm from "@/app/components/form/SaleRegulForm";
import { fetchInvoices } from "@/app/redux/slices/invoices/actions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Invoice from "@/app/components/invoice/Invoice";



interface DataTableSupplyProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  needFilter: boolean;
  title: string;
  paginate: boolean;
}

interface IInvoice {
  invoice : number
}

export function DataTableSupply<TData, TValue>({
  columns,
  data,
  needFilter,
  title,
  paginate,
}: DataTableSupplyProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // const [openApproFormOpen, setIsApproFormOpen] = React.useState(false);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [selected, setSelected] = React.useState('plusRecent');
  const [redirection, setRedirection] = React.useState(false);
  const [isStockRegulFormOpen, setisStockRegulFormOpen ] = React.useState(false);
  const [isSaleRegulFormOpen, setIsSaleRegulFormOpen ] = React.useState(false);
  const [article, setArticle] = React.useState<IArticle[]>([]);
  const [date, setDate] = React.useState<string>('');
  const [date1, setDate1] = React.useState<string>('');

  const today = new Date();
  const formattedDate:string = today.toISOString().split('T')[0];

  const [startDate, setStartDate ] = React.useState(formattedDate);
  const [endDate, setEndDate ] = React.useState(formattedDate);

  const { control, reset, register, handleSubmit, formState: { errors }, setValue } = useForm<IInvoice>({
      defaultValues: {
          invoice : 1,
      }

  });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

// Définir la date d'aujourd'hui au chargement du composant

    // Définir la date d'aujourd'hui au chargement du composant
    React.useEffect(() => {
      setStartDate(getTodayDate());
      setEndDate(getTodayDate());
    }, []);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<IInvoice> = (data) => {

    const { invoice } = data

      if(startDate && endDate){

        if(title=="Movements"){
          dispatch(fetchMovements({ typeId: "1", firstrange: startDate, secondrange: endDate }))
        }
        else if(title=="Invoice"){
          dispatch(fetchInvoices({ paymentModeId: "1", invoice : String(invoice), firstrange: startDate, secondrange: endDate }))
        }
          
      }
  }

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination,
    // manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter, 
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    },
  });

  // React.useEffect(() => {
  //   setSorting([{ id: 'date', desc: true }]);
  // }, []);


  const redirectionPage = (row:any) => {
    setRedirection(true);
    console.log(row);
    
  }

  const getArticleInfo = (articleInfo:any, title:string) => {
    if(title == "Invoice"){
      setIsSaleRegulFormOpen(true)
      setArticle(articleInfo)
    }
    else if(title == "Movements"){
      setisStockRegulFormOpen(true)
      setArticle(articleInfo)
    }

    console.log(articleInfo);
    console.log(title);

  }


  const numberOfPage = table.getPageCount().toLocaleString();
  const numberOfPageTable = Array.from({ length: Number(numberOfPage) }, (_, index) => index + 1);
  

  return (
    <>

        {/* { 
          isStockRegulFormOpen &&  <StockRegulForm content={article} setisStockRegulFormOpen={setisStockRegulFormOpen}  />
        }

        {
          isSaleRegulFormOpen && <SaleRegulForm content={article} setIsSaleRegulFormOpen={setIsSaleRegulFormOpen}  />
        }
     */}
      <div className="  rounded-2xl ">
        
        <div className="flex items-center justify-between " >
        {
            title == "Movements" ? (
              <div className="flex gap-5 " >
                <div className="flex gap-4 items-center  " >
                  <h1 className=" font-semibold text-sm italic text-white " >Du</h1>
                  <input onChange={(e) => setStartDate(e.target.value) } value={startDate}  className="uppercase italic font-semibold border-[1px] py-[5px] px-2 rounded-2xl border-black " type="date" name="" id="" />
                </div>
                <div className="flex gap-4 items-center">
                  <h1 className=" font-semibold text-sm italic text-white ">Au</h1>
                  <input onChange={(e) => setEndDate(e.target.value) } value={endDate} className="uppercase italic font-semibold  border-[1px] py-[5px] px-2 rounded-2xl border-black" type="date" name="" id="" />
                </div>
                <button onClick={handleSubmit(onSubmit)}  className=" px-4 text-sm rounded-lg text-white bg-slate-400 " >Filtrer</button>
              </div>
            )
            :
            (
              title == "Invoice" && (
                <div className="flex gap-5 " >
                  <div className="flex gap-4 items-center  " >
                    <h1 className=" font-semibold text-sm italic text-white " >Du</h1>
                    <input onChange={(e) => setStartDate(e.target.value) } value={startDate}  className="uppercase italic font-semibold border-[1px] py-[5px] px-2 rounded-2xl border-black " type="date" name="" id="" />
                  </div>
                  <div className="flex gap-4 items-center">
                    <h1 className=" font-semibold text-sm italic text-white ">Au</h1>
                    <input onChange={(e) => setEndDate(e.target.value) } value={endDate} className="uppercase italic font-semibold  border-[1px] py-[5px] px-2 rounded-2xl border-black" type="date" name="" id="" />
                  </div>
                  <div className=" w-full flex " >
                    <form onSubmit={handleSubmit(onSubmit)} >
                      <Controller
                      name="invoice"
                      control={control}
                      render={({ field }) => (
                          <div className=" flex items-center " >

                              <div className=" flex items-center ml-2 gap-2 " >
                                  <input
                                      type="radio"
                                      id="INVOICE"
                                      value={1}
                                      checked={field.value === 1} // Check if the value matches 2
                                      onChange={(e) => field.onChange(Number(e.target.value))} // Update the value
                                  />
                                  <h6 className=" font-bold " >FACTURE</h6>
                              </div>

                              <div className=" flex items-center  ml-10 gap-2 " >
                                  <input
                                      type="radio"
                                      id="PRO"
                                      value={2}
                                      checked={field.value === 2} // Check if the value matches 1
                                      onChange={(e) => field.onChange(Number(e.target.value))} // Update the value 
                                  />
                                  <h6 className=" font-bold " >PRO FORMA</h6>
                              </div>

                          </div>
                      )}
                      rules={{ required: 'La monnaie est requise' }} // Validation rule
                      />
                    </form>
                  </div>
                  <button onClick={handleSubmit(onSubmit)} className=" px-4 text-sm rounded-lg text-white bg-slate-400 " >Filtrer</button>
                </div>
              )
            )
          }

          <div className="flex justify-end  ">
            {
              title == "Invoice" ? (
                <div className=" flex gap-2 " >

                  <input className=' w-[200px] px-6 py-2 my-3 border-[1px] border-black text-black text-[14px] uppercase ' placeholder='Description' type="text" value={(table.getColumn("articles.description")?.getFilterValue() as string) ?? "" } onChange={(event) => table.getColumn("articles.description")?.setFilterValue(event.target.value)}/>

                  <input className=' w-[200px] px-6 py-2 my-3 border-[1px] border-black text-black text-[14px] uppercase ' placeholder='Facture' type="text" value={(table.getColumn("invoices.invoice_number")?.getFilterValue() as string) ?? "" } onChange={(event) => table.getColumn("invoices.invoice_number")?.setFilterValue(event.target.value)}/>

                  <input className=' w-[200px] px-6 py-2 my-3 border-[1px] border-black text-black text-[14px] uppercase ' placeholder='Utilisateur' type="text" value={(table.getColumn("invoices.created_by")?.getFilterValue() as string) ?? "" } onChange={(event) => table.getColumn("invoices.created_by")?.setFilterValue(event.target.value)}/>

                </div>
              )
              :
              (
                title == "Movements" ? (
                  // <input className=' w-[700px] px-6 py-2 my-3 border-[1px] border-black text-black rounded-3xl text-[14px] uppercase ' placeholder='Rechercher le produit pharmaceutique par sa description' type="text" value={(table.getColumn("article.description")?.getFilterValue() as string) ?? "" } onChange={(event) => table.getColumn("article.description")?.setFilterValue(event.target.value)} />
                  <input
                    className="w-[500px] px-6 py-2 my-3 border-[1px] border-black text-black rounded-3xl text-[14px] uppercase"
                    placeholder="Rechercher le produit pharmaceutique par sa description"
                    type="text"
                    value={globalFilter} // Utilisez la valeur du filtre global
                    onChange={(e) => setGlobalFilter(e.target.value)} // Mettez à jour le filtre global
                  />
                )
                :
                (
                  <input className=' w-[700px] px-6 py-2 my-3 border-[1px] border-black text-black rounded-3xl text-[14px] uppercase ' placeholder='Rechercher le produit pharmaceutique par sa description' type="text" value={(table.getColumn("article.description")?.getFilterValue() as string) ?? "" } onChange={(event) => table.getColumn("article.description")?.setFilterValue(event.target.value)} />

                )
              )
            }

          </div>

        </div>

        <div className="rounded-md ">
            <Table>
              
                <TableHeader>

                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow  key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => {
                        return (
                            
                            <TableHead className={` ${index == 0 ? '' : ''  } ${index == (headerGroup.headers.length-1) ? '' : ''  } font-extrabold  px-10  bg-[#F2F7FC]   text-[12px] text-black`} key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            
                        );
                        })}
                    </TableRow>
                    ))}

                </TableHeader>

                <TableBody>
                    {
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className=" hover:cursor-pointer text-xs font-extrabold uppercase   border-b-[1px] border-black text-black bg-white "
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    // onClick={() => redirectionPage(row.original)}
                                    onClick={() => getArticleInfo(row.original, title)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="px-10 border-r-[1px] border-black "  key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>No results.</TableCell>
                        </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div> 

        {/* {
          paginate && (
            <div>
              <div className="flex items-center justify-between  py-8">
                <div className="flex items-center gap-[0.5em]">
                  <span className="flex items-center gap-1 text-[0.7em]">
                    <div>Page </div>
                    <strong>
                      {table.getState().pagination.pageIndex + 1} sur{' '}
                      {table.getPageCount().toLocaleString()}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-[0.5em]">
                  <button
                    className=" flex items-center cursor-pointer justify-center border border-[#B5B5B5] rounded p-1 "
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <Icon icon="material-symbols-light:keyboard-arrow-left" width="16" height="16"  style={{color: '#666666'}} />
                  </button>

                  {
                    numberOfPageTable?.map((page:any, index:number) => (
                      <button key={index} className={`${table.getState().pagination.pageIndex == index ? "bg-primary text-primary-foreground text-[12px] px-[10px] py-1 rounded-sm" : "bg-primary-foreground text-secondary-foreground text-[12px]  px-[8px] py-[3px] rounded-sm border border-secondary-foreground "} rounded-sm w-[2em] h-[2em] flex items-center justify-center font-bold text-[0.9em]`}
                        onClick={()=> table.setPageIndex(index)}
                      >
                        {`${page}`}
                      </button>
                    ))
                  }

                  <button
                    className="flex items-center cursor-pointer justify-center border border-[#B5B5B5] rounded p-1 "
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <Icon icon="material-symbols-light:keyboard-arrow-right" width="16" height="16"  style={{color: '#666666'}} />
                  </button>

                </div>

              </div>
            </div>
          )
        } */}

      </div>

    </>
    
  );
}