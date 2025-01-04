
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
import ArticleActivationForm from "@/app/components/form/ArticleActivationForm";



interface DataTableStateProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  needFilter: boolean;
  title: string;
  paginate: boolean;
}

export function DataTableState<TData, TValue>({
  columns,
  data,
  needFilter,
  title,
  paginate,
}: DataTableStateProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [openPersonalForm, setOpenPersonalForm] = React.useState(false);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [selected, setSelected] = React.useState('plusRecent');
  const [redirection, setRedirection] = React.useState(false);
  const [ activationFormOpen, setActivationFormOpen ] = React.useState(false);
  const [article, setArticle] = React.useState<IArticle[]>([]);

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

  const getArticleInfo = (articleInfo:any) => {
    setActivationFormOpen(true)
    setArticle(articleInfo)
  }



  const numberOfPage = table.getPageCount().toLocaleString();
  const numberOfPageTable = Array.from({ length: Number(numberOfPage) }, (_, index) => index + 1);
  

  return (
    <>
      {
        activationFormOpen &&  <ArticleActivationForm content={article} setActivationFormOpen={setActivationFormOpen}  />
      }
      <div className="bg-transparent   rounded-2xl">
        <div className="flex items-center justify-between " >
            <div>
                <h1 className="" >{title}</h1>
            </div>
        </div>

        <div className="rounded-md ">
            <Table>
              
                <TableHeader>

                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow  key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => {
                        return (
                            
                            <TableHead className={` ${index == 0 ? 'rounded-tl-lg rounded-bl-lg' : ''  } ${index == (headerGroup.headers.length-1) ? 'rounded-tr-lg rounded-br-lg' : ''  }   px-10  bg-[#F2F7FC]  font-light text-[12px] text-black`} key={header.id}>
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
                                    className=" hover:cursor-pointer text-xs  text-black "
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    // onClick={() => redirectionPage(row.original)}
                                    onClick={() => getArticleInfo(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="px-10"  key={cell.id}>
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

        {
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
                  <span className="flex items-center gap-1 text-[0.7em]">
                    | "rere" :
                    <input
                      type="number"
                      min="1"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                      }}
                      className="border px-2 py-1 rounded-[15px] w-16"
                    />
                  </span>
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                      table.setPageSize(Number(e.target.value))
                    }}
                  >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                      <option className="text-[0.7em]" key={pageSize} value={pageSize}>
                        {pageSize} {"ere"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-[0.5em]">
                  <button
                    className=" flex items-center cursor-pointer justify-center border border-[#B5B5B5] rounded w-[100px] p-1 "
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <Icon icon="material-symbols-light:keyboard-arrow-left" width="16" height="16"  style={{color: '#666666'}} />
                    <span className="text-[12px] text-[#585757] " >Précedent</span>
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
                    className="flex items-center cursor-pointer justify-center border border-[#B5B5B5] rounded w-[100px] p-1 "
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="text-[12px] text-[#585757] " >Suivant</span>
                    <Icon icon="material-symbols-light:keyboard-arrow-right" width="16" height="16"  style={{color: '#666666'}} />
                  </button>

                </div>

              </div>
            </div>
          )
        }

      </div>
    </>
    
  );
}