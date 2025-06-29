import { Fragment, useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import ColorTag from "./components/ColorTag";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import type { ProductNameTypes } from "./types";

const App = () => {

  const defaultProduct = {
    id: '',
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    },
  }

  const [products,setProducts] = useState<IProduct[]>(productList)

  const [product,setProduct] = useState<IProduct>(defaultProduct)

  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);

  const [productsToEditIdx, setProductsToEditIdx] = useState<number>(0);
  
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: ""
  });

  const [tempColors, setTempColor] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [isEditOpenModal, setIsEditOpenModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  
  const closeModal = ()=> setIsOpen(false);
  
  const openModal = () => setIsOpen(true);

  const closeEditModal = ()=> setIsEditOpenModal(false);
  
  const openEditModal = () => setIsEditOpenModal(true);

  const colorClickHandler = (color: string) => {
    if(tempColors.includes(color)) {
      setTempColor((prev) => prev.filter(colorItem => colorItem !== color));
      return;
    }
    if(productToEdit.colors.includes(color)) {
      setTempColor((prev) => prev.filter(colorItem => colorItem !== color));
      return;
    }
    setTempColor((prev) => [...prev, color])
  }

  const onChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    });
  }

  const onChangeEditHandler = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    });
  }

  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  }

    const onEditCancel = () => {
    setProductToEdit(defaultProduct);
    closeEditModal();
  }

  const submitHandler = (event : FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    const {title, description, imageURL, price} = product;
    
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
        
    const hasErrors = Object.values(errors).some(value => value === "") &&  Object.values(errors).every(value => value === "");
    
    if(!hasErrors){
      setErrors(errors);
      return;
    }

    setProducts(prev => [{
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory
      },
      ...prev
    ])

    setProduct(defaultProduct);
    setTempColor([]);

    closeModal();
  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {title, description, imageURL, price} = productToEdit;
    
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
        
    const hasErrors = Object.values(errors).some(value => value === "") &&  Object.values(errors).every(value => value === "");
    
    if(!hasErrors){
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productsToEditIdx] = {...productToEdit, colors :tempColors.concat(productToEdit.colors)};
    setProducts(updatedProducts);

    setProductToEdit(defaultProduct);
    setTempColor([]);

    closeEditModal();

  }

  const renderProductList = products.map((product,idx) =>(
     <ProductCard 
      key={product.id}
      product={product} 
      setProductToEdit={setProductToEdit} 
      OpenEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductsToEditIdx}
      />
  ));
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col space-y-2" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
      <ErrorMessage msg={errors[input.name]}/>
    </div>
  ));

  const renderEditFormInput = (id: string, label: string, name: ProductNameTypes)=> {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler}/>
        <ErrorMessage msg={errors[name]}/>
      </div>
    )   
  };

  const renderColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => colorClickHandler(color)}/> );

  const renderSelectedColors = tempColors.map( color => <ColorTag color={color} key={color} onClick={() => colorClickHandler(color)}/> )
  const renderEditColors =tempColors.concat(productToEdit.colors).map( color => <ColorTag color={color} key={color} onClick={() => colorClickHandler(color)}/> )


  return (
    <main className="container">
      <div className="flex items-center justify-between mx-8  mt-5">
        <h1 className="text-3xl font-extrabold text-gray-800">Product List</h1>
        <Button className={"bg-indigo-700 hover:bg-indigo-800 px-10"} width="w-fit" onClick={openModal}>
          Build a Product
        </Button>
      </div>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      {/* // Modal for adding new product */}
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Add New Product"}> 
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory}/>
          <div className="flex items-center flex-wrap space-x-1 my-2">{renderSelectedColors}</div>
          <div className="flex items-center flex-wrap space-x-1 my-2">{renderColors}</div>
          <div className="flex items-center justify-between space-x-2">
            <Button className={"bg-indigo-700 hover:bg-indigo-800"} type="submit">
                Submit
            </Button>
            <Button className={"bg-gray-400 hover:bg-gray-500"} onClick={onCancel} type="reset">
                Cancel
            </Button>        
          </div>
        </form>
      </Modal>

      {/* // Modal for editing product */}
      <Modal isOpen={isEditOpenModal} closeModal={closeEditModal} title={"Edit Product"}>
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditFormInput('title', 'Product Title', 'title')}
          {renderEditFormInput('description', 'Product Description', 'description')}
          {renderEditFormInput('imageURL', 'Product Image URL', 'imageURL')}
          {renderEditFormInput('price', 'Product Price', 'price')}

          <Select selected={productToEdit.category} setSelected={(value)=> setProductToEdit({...productToEdit, category: value})}/>
          <div className="flex items-center flex-wrap space-x-1 my-2">{renderEditColors}</div>
          <div className="flex items-center flex-wrap space-x-1 my-2">{renderColors}</div> 
          <div className="flex items-center justify-between space-x-2">
            <Button className={"bg-indigo-700 hover:bg-indigo-800"} type="submit">
                Submit
            </Button>
            <Button className={"bg-gray-400 hover:bg-gray-500"} onClick={onEditCancel} type="reset">
                Cancel
            </Button>        
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App