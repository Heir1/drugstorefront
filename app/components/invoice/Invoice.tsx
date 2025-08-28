import React from "react";

interface Product {
  barcode: string;
  description: string;
  quantity: number | null ;
  selling_price: number;
  prix_total: number;
}

interface ProFormaProps {
    client: string;
    products: Product[];
    invoicenumber: string;
    isInvoice: boolean;
    rate: number;
}




const Invoice: React.FC<ProFormaProps> = ({ products, client, invoicenumber,  isInvoice, rate}) => {

    // Calcul du total général
    const grandTotal = products.reduce((total, product) => total + product.prix_total, 0);

    // const rate = rates[0]?.value

  // Fonction pour imprimer la pro forma
  const printProForma = () => {
    window.print();
  };

  return (
    <div className=" w-full flex justify-center " >
        <div className="pro-forma print-container text-[8px] font-bold  ">
            <div>
                <div className=" border-b-2 border-black pb-1 mb-1 " >
                    <h1 className=" text-center ">ARSUE PHARMA</h1>
                    <h1 className=" text-center ">AV/ DE LA FOIRE N°1. Q/SALONGO, C/LEMBA</h1>
                    <h1 className=" text-center ">RCCM 17-A-00178/ IDN : 01-93-N17135U/ IMPORT: A1703348J</h1>
                    <h1 className=" text-center ">+243 997 845 319</h1>
                </div>
                <div className=" border-b-2 border-black mb-1 " >
                    <h2 className="title">
                        {
                            isInvoice ? `FACTURE : ${invoicenumber}` : 'Pro Forma'
                        } 
                    </h2>
                    <h2 className="title">CLIENT : {client} </h2>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr className=" border-b-2 border-black " >
                            <th className="text-center" >QTE</th>
                            <th className="text-center">DESIGNATION</th>
                            <th className="text-center">PU</th>
                            <th className="text-center">PT</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr className=" border-b-2 border-black " key={product.barcode}>
                            <td className="text-center" >{product.quantity}</td>
                            <td className="text-center" >{product.description}</td>
                            <td className="text-center" >{product.selling_price.toLocaleString()}</td>
                            <td className="text-center" >{product.prix_total.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="border-b-2 border-black" >
                        <tr>
                            <td colSpan={3} className="total-label">Total pro forma (CDF)</td>
                            <td className="total-amount">{grandTotal.toFixed(2)} FC</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="total-label">Total pro forma (USD)</td>
                            <td className="total-amount">{(Number(grandTotal)/rate).toFixed(2)} USD</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className=" mt-8" >
                <div className=" flex justify-center border-b-2 border-black " >
                    <h1 className=" text-center ">VENTE CASH</h1>
                </div>
                <div className=" flex justify-center " >
                    <h1 className=" text-center ">Merci pour la visite et à la prochaine </h1>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Invoice;

