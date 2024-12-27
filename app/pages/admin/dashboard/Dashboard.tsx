"use client"
import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react'; // Import Iconify's Icon component
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { ArticleColumns } from '@/components/ui/DataTable/articles/ArticleColumns';
import { IArticle } from '@/app/interfaces/article';


export default function Dashboard() {

  const articles : IArticle[] = [
    {
      id: "article-001",
      currency: {
        currency_Id: "USD",
        name: "Dollar",
        value: 1,
        symbol: "$",
      },
      supplier: {
        supplier_id: "supplier-001",
        name: "Supplier A",
      },
      packaging: {
        packaging_id: "packaging-001",
        name: "Box",
      },
      category: {
        category_id: "category-001",
        name: "Electronics",
      },
      molecule: {
        molecule_id: "molecule-001",
        name: "Molecule A",
      },
      Indication: {
        Indication_id: "indication-001",
        name: "Pain Relief",
      },
      placement: {
        placement_id: "placement-001",
        name: "Shelf A",
      },
      barcode: "123456789012",
      description: "A high-quality product for pain relief.",
      alert: 10,
      expiration_date: "2025-12-31",
      quantity: "150",
      purchase_price: 20.0,
      selling_price: 35.0,
      is_active: true,
      is_active_comment: "Available for sale.",
      row_id: "row-001",
      created_at: "2024-01-01T00:00:00Z",
      updateded_at: "2024-01-01T00:00:00Z",
      created: "2024-01-01T00:00:00Z",
      updatededBy: "admin",
    },
    {
      id: "article-002",
      currency: {
        currency_Id: "EUR",
        name: "Euro",
        value: 0.85,
        symbol: "€",
      },
      supplier: {
        supplier_id: "supplier-002",
        name: "Supplier B",
      },
      packaging: {
        packaging_id: "packaging-002",
        name: "Bottle",
      },
      category: {
        category_id: "category-002",
        name: "Pharmaceuticals",
      },
      molecule: {
        molecule_id: "molecule-002",
        name: "Molecule B",
      },
      Indication: {
        Indication_id: "indication-002",
        name: "Cough Relief",
      },
      placement: {
        placement_id: "placement-002",
        name: "Shelf B",
      },
      barcode: "987654321098",
      description: "A soothing medicine for cough relief.",
      alert: 5,
      expiration_date: "2024-11-30",
      quantity: "80",
      purchase_price: 15.0,
      selling_price: 25.0,
      is_active: false,
      is_active_comment: "Out of stock.",
      row_id: "row-002",
      created_at: "2024-01-10T00:00:00Z",
      updateded_at: "2024-01-10T00:00:00Z",
      created: "2024-01-10T00:00:00Z",
      updatededBy: "admin",
    },
    {
      id: "article-003",
      currency: {
        currency_Id: "GBP",
        name: "Pound",
        value: 0.75,
        symbol: "£",
      },
      supplier: {
        supplier_id: "supplier-003",
        name: "Supplier C",
      },
      packaging: {
        packaging_id: "packaging-003",
        name: "Packet",
      },
      category: {
        category_id: "category-003",
        name: "Food & Beverages",
      },
      molecule: {
        molecule_id: "molecule-003",
        name: "Molecule C",
      },
      Indication: {
        Indication_id: "indication-003",
        name: "Energy Boost",
      },
      placement: {
        placement_id: "placement-003",
        name: "Aisle C",
      },
      barcode: "555555555555",
      description: "Energy drink for a quick boost of energy.",
      alert: 3,
      expiration_date: "2026-03-15",
      quantity: "200",
      purchase_price: 30.0,
      selling_price: 45.0,
      is_active: true,
      is_active_comment: "Available for sale.",
      row_id: "row-003",
      created_at: "2024-02-01T00:00:00Z",
      updateded_at: "2024-02-01T00:00:00Z",
      created: "2024-02-01T00:00:00Z",
      updatededBy: "admin",
    },
    {
      id: "article-003",
      currency: {
        currency_Id: "GBP",
        name: "Pound",
        value: 0.75,
        symbol: "£",
      },
      supplier: {
        supplier_id: "supplier-003",
        name: "Supplier C",
      },
      packaging: {
        packaging_id: "packaging-003",
        name: "Packet",
      },
      category: {
        category_id: "category-003",
        name: "Food & Beverages",
      },
      molecule: {
        molecule_id: "molecule-003",
        name: "Molecule C",
      },
      Indication: {
        Indication_id: "indication-003",
        name: "Energy Boost",
      },
      placement: {
        placement_id: "placement-003",
        name: "Aisle C",
      },
      barcode: "555555555555",
      description: "Energy drink for a quick boost of energy.",
      alert: 3,
      expiration_date: "2026-03-15",
      quantity: "200",
      purchase_price: 30.0,
      selling_price: 45.0,
      is_active: true,
      is_active_comment: "Available for sale.",
      row_id: "row-003",
      created_at: "2024-02-01T00:00:00Z",
      updateded_at: "2024-02-01T00:00:00Z",
      created: "2024-02-01T00:00:00Z",
      updatededBy: "admin",
    },
    {
      id: "article-003",
      currency: {
        currency_Id: "GBP",
        name: "Pound",
        value: 0.75,
        symbol: "£",
      },
      supplier: {
        supplier_id: "supplier-003",
        name: "Supplier C",
      },
      packaging: {
        packaging_id: "packaging-003",
        name: "Packet",
      },
      category: {
        category_id: "category-003",
        name: "Food & Beverages",
      },
      molecule: {
        molecule_id: "molecule-003",
        name: "Molecule C",
      },
      Indication: {
        Indication_id: "indication-003",
        name: "Energy Boost",
      },
      placement: {
        placement_id: "placement-003",
        name: "Aisle C",
      },
      barcode: "555555555555",
      description: "Energy drink for a quick boost of energy.",
      alert: 3,
      expiration_date: "2026-03-15",
      quantity: "200",
      purchase_price: 30.0,
      selling_price: 45.0,
      is_active: true,
      is_active_comment: "Available for sale.",
      row_id: "row-003",
      created_at: "2024-02-01T00:00:00Z",
      updateded_at: "2024-02-01T00:00:00Z",
      created: "2024-02-01T00:00:00Z",
      updatededBy: "admin",
    },
  ];
  
  
  return (
    <div className=' mb-40 ' >

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='fixed-top' >
        <Container fluid>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">

                <NavDropdown 
                  title={
                    <div className='flex items-center ' >
                      <Icon icon="mdi:file" width="12" height="12" className="mr-2" /> {/* Icon before text */}
                      <span className='text-[14px] font-bold ' >Fichier</span>  
                    </div>
                  } 
                  id="collapsible-nav-dropdown" className="mx-2" >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown 
                  title={
                    <div className='flex items-center ' >
                      <Icon icon="fontisto:database" width="12" height="12" className="mr-2" />
                      <span className='text-[14px] font-bold ' >Données</span> 
                    </div>
                  } 
                  id="collapsible-nav-dropdown" className="mx-2" >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown 
                  title={
                    <div className='flex items-center ' >
                      <Icon icon="solar:settings-linear" width="18" height="18" className="mr-2" />
                      <span className='text-[14px] font-bold ' >Paramètres</span>  
                    </div>
                  } 
                  id="collapsible-nav-dropdown" 
                  className="mx-2" 
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <div className='flex items-center ' >
                      <Icon icon="ic:sharp-inventory-2" width="15" height="15" className="mr-2" />
                      <span className='text-[14px] font-bold ' >Rapports</span> 
                    </div>
                  }  
                  id="collapsible-nav-dropdown" 
                  className="mx-2"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown 
                  title={
                    <div className='flex items-center ' >
                      <Icon icon="ic:round-help" width="15" height="15" className="mr-2" />

                      <span className='text-[14px] font-bold ' >Aide</span>
                    </div>
                  } 
                  id="collapsible-nav-dropdown" 
                  className="mx-2"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>

      <Tabs
        defaultActiveKey="nouveau"
        id="pharmacy-tabs"
        className="mb-3"
        style={{
          marginTop: '50px',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          fontSize: '14px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tab
          eventKey="nouveau"
          title="Nouveau"
          style={{
            fontSize: '14px',
            borderRadius: '8px 8px 0 0', // Rounded top corners
            
          }}
        >

          <div className=" px-10 space-y-4 ">

            <form>
              <div className="grid grid-cols-12 gap-4 ">
                <div className="col-span-7  py-4 pr-4 rounded-lg  " style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                  <div className="grid grid-cols-12 gap-y-6 ">
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Code barre</label>
                    </div>
                    <div className="col-span-4">
                      <input className='border-0 w-full rounded-lg  py-1 px-3 ' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Localisation</label>
                    </div>
                    <div className="col-span-4">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Description</label>
                    </div>
                    <div className="col-span-10">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center mx-4'>
                      <label className='text-white' htmlFor="">Indication</label>
                    </div>
                    <div className="col-span-10">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Molecule</label>
                    </div>
                    <div className="col-span-10">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Nacl</option>
                        <option value="">H2o</option>
                        <option value="">N</option>
                      </select>
                    </div>
                    <div className='col-span-2 flex items-center mx-4'>
                      <label className='text-white' htmlFor="">Emballage</label>
                    </div>
                    <div className="col-span-10">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Carton</option>
                        <option value="">Sachet</option>
                        <option value="">Flacon</option>
                      </select>
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Categorie</label>
                    </div>
                    <div className="col-span-10">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Paracetamol</option>
                        <option value="">Paracetamol</option>
                        <option value="">Paracetamol</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 py-4 pl-8 " style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                  <div className="grid grid-cols-12 gap-y-6 ">
                    <div className='col-span-2 flex items-center'>
                      <label className='text-white' htmlFor="">Fournisseur</label>
                    </div>
                    <div></div>
                    <div className="col-span-8">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Nacl</option>
                        <option value="">H2o</option>
                        <option value="">N</option>
                      </select>
                    </div>
                    <div className='col-span-3 flex items-center'>
                      <label className='text-white' htmlFor="">Alerte</label>
                    </div>
                    <div className="col-span-2">
                      <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                    </div>
                    <div className='col-span-3 flex items-center justify-end mx-6 '>
                      <label className='text-white' htmlFor="">Peremption</label>
                    </div>
                    <div className="col-span-3">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="date" />
                    </div>
                    <div></div>


                    <div className="col-span-12 space-y-9 ">

                      <div className='grid grid-cols-12'>

                        <div className="col-span-3  flex items-end ">
                          <div className='grid grid-cols-12 '>

                            <div className="flex gap-2 ">
                              <label className='text-white text-[12px]' htmlFor="">USD</label>
                              <input className='form-check-input' type="radio" />
                            </div>

                            <div className="col-start-6 flex gap-2">
                              <label className='text-white text-[12px]' htmlFor="">CDF</label>
                              <input className='form-check-input' type="radio" />
                            </div>

                          </div>
                        </div>

                        <div className='col-span-8 flex justify-between space-x-4' >
                          <div className="">
                            <div className="form-group space-y-2">
                              <label className='text-white text-[12px]' htmlFor="">QTE</label>
                              <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                            </div>
                          </div>
                          <div className="">
                            <div className="form-group space-y-2">
                              <label className='text-white text-[12px]' htmlFor="">P.A</label>
                              <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                            </div>
                          </div>
                          <div className="">
                            <div className="form-group space-y-2">
                              <label className='text-white text-[12px]' htmlFor="">P.V</label>
                              <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                            </div>
                          </div>
                        </div>

                        <div className='col-span-2 flex items-center mt-4 '>
                          <label className='text-white' htmlFor="">TAUX MB</label>
                        </div>
                        <div></div>

                        <div className="col-span-8 mt-4 bg-white flex justify-center items-center rounded-lg">
                            <span className='text-black text-lg font-semibold italic' >1.25</span> 
                        </div>

                      </div>


                      <div className='grid grid-cols-12 gap-4 '>
                        <div className='col-span-5' >
                          <button className='text-white btn btn-success w-full' >Enregistrer</button>
                        </div>
                        <div className='col-span-5'>
                          <button className='text-white btn btn-warning w-full' >Annuler</button>
                        </div>
                      </div>

                    </div>



                  </div>
                </div>

              </div>
            </form>

            <div className=' text-white ' >
              <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
            </div>

          </div>

        </Tab>

        <Tab
          eventKey="mettreajour"
          title="Mettre à jour"
          style={{
            fontSize: '14px',
            borderRadius: '8px 8px 0 0', // Rounded top corners
            
          }}
        >

          <div className=" px-10 space-y-4">

            <form>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7  py-4 pr-4 rounded-lg" style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                  <div className="grid grid-cols-12 gap-y-6 ">
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Code barre</label>
                    </div>
                    <div className="col-span-4">
                      <input className='border-0 w-full rounded-lg  py-1 px-3 ' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Localisation</label>
                    </div>
                    <div className="col-span-4">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Description</label>
                    </div>
                    <div className="col-span-10">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center mx-4'>
                      <label className='text-white' htmlFor="">Indication</label>
                    </div>
                    <div className="col-span-10">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="text" />
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Molecule</label>
                    </div>
                    <div className="col-span-10">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Nacl</option>
                        <option value="">H2o</option>
                        <option value="">N</option>
                      </select>
                    </div>
                    <div className='col-span-2 flex items-center mx-4'>
                      <label className='text-white' htmlFor="">Emballage</label>
                    </div>
                    <div className="col-span-10">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Carton</option>
                        <option value="">Sachet</option>
                        <option value="">Flacon</option>
                      </select>
                    </div>
                    <div className='col-span-2 flex items-center  mx-4'>
                      <label className='text-white' htmlFor="">Categorie</label>
                    </div>
                    <div className="col-span-10">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Paracetamol</option>
                        <option value="">Paracetamol</option>
                        <option value="">Paracetamol</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 py-4 pl-8 " style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                  <div className="grid grid-cols-12 gap-y-6 ">
                    <div className='col-span-2 flex items-center'>
                      <label className='text-white' htmlFor="">Fournisseur</label>
                    </div>
                    <div></div>
                    <div className="col-span-8">
                      <select className='w-full py-1 px-3 rounded-lg' name="" id="">
                        <option value="">Nacl</option>
                        <option value="">H2o</option>
                        <option value="">N</option>
                      </select>
                    </div>
                    <div className='col-span-3 flex items-center'>
                      <label className='text-white' htmlFor="">Alerte</label>
                    </div>
                    <div className="col-span-2">
                      <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                    </div>
                    <div className='col-span-3 flex items-center justify-end mx-6 '>
                      <label className='text-white' htmlFor="">Peremption</label>
                    </div>
                    <div className="col-span-3">
                      <input className='border-0 w-full rounded-lg py-1 px-3' type="date" />
                    </div>
                    <div></div>


                    <div className="col-span-12 space-y-9 ">

                      <div className='grid grid-cols-12'>

                        <div className="col-span-3  flex items-end ">
                          <div className='grid grid-cols-12 '>

                            <div className="flex gap-2 ">
                              <label className='text-white text-[12px]' htmlFor="">USD</label>
                              <input className='form-check-input' type="radio" />
                            </div>

                            <div className="col-start-6 flex gap-2">
                              <label className='text-white text-[12px]' htmlFor="">CDF</label>
                              <input className='form-check-input' type="radio" />
                            </div>

                          </div>
                        </div>

                        <div className='col-span-8 flex justify-between space-x-4' >
                          <div className="">
                            <div className="form-group space-y-2">
                              <label className='text-white text-[12px]' htmlFor="">QTE</label>
                              <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                            </div>
                          </div>
                          <div className="">
                            <div className="form-group space-y-2">
                              <label className='text-white text-[12px]' htmlFor="">P.A</label>
                              <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                            </div>
                          </div>
                          <div className="">
                            <div className="form-group space-y-2">
                              <label className='text-white text-[12px]' htmlFor="">P.V</label>
                              <input className='border-0 w-full rounded-lg  py-1 px-3' type="number" />
                            </div>
                          </div>
                        </div>

                        <div className='col-span-2 flex items-center mt-4 '>
                          <label className='text-white' htmlFor="">TAUX MB</label>
                        </div>
                        <div></div>

                        <div className="col-span-8 mt-4 bg-white flex justify-center items-center rounded-lg">
                            <span className='text-black text-lg font-semibold italic' >1.25</span> 
                        </div>

                      </div>


                      <div className='grid grid-cols-12 gap-4 '>
                        <div className='col-span-5' >
                          <button className='text-white btn btn-success w-full' >Modifier</button>
                        </div>
                        <div className='col-span-5'>
                          <button className='text-white btn btn-warning w-full' >Annuler</button>
                        </div>
                      </div>

                    </div>



                  </div>
                </div>

              </div>
            </form>

            <div className=' text-white ' >
              <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
            </div>

          </div>

        </Tab>
        <Tab
          eventKey="etatproduits"
          title="État produits"
          style={{
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px 8px 0 0', // Rounded top corners
            padding: '10px 0',
          }}
        >
          <div className="p-4 text-lg h-screen">
            <DataTable columns={ArticleColumns} data={articles} needFilter={false} paginate={true} title=""/>
          </div>
        </Tab>
        <Tab
          eventKey="importexport"
          title="Import/Export"
          style={{
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px 8px 0 0', // Rounded top corners
            padding: '10px 0',
          }}
        >
          <div className="p-4 text-lg h-screen mx-10 rounded-2xl ">
            
          </div>
        </Tab>
        <Tab
          eventKey="rapports"
          title="Rapports"
          style={{
            color: 'white',
            fontWeight: 'bold',
            borderBottom: '2px solid #F57C00', // Darker orange bottom border
            borderRadius: '8px 8px 0 0', // Rounded top corners
            padding: '10px 0',
          }}
        >
          <div className="p-4 text-lg h-screen">
            Manage your prescriptions and refills.
          </div>
        </Tab>

      </Tabs>

    </div>
  )
}
