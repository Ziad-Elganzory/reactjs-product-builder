import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data"
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import ColorTag from "./components/ColorTag";
import { v4 as uuid } from "uuid";


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
  
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: ""
  });

  const [tempColors, setTempColor] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  
  const closeModal = ()=> setIsOpen(false);
  
  const openModal = () => setIsOpen(true);

  const colorClickHandler = (color: string) => {
    if(tempColors.includes(color)) {
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

  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  }

  const submitHandler = (event : FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    const {title, description, imageURL, price} = product;
    
    const errors = productValidation({
      title,
      description,
      imageURL,
      price
    });
        
    const hasErrors = Object.values(errors).some(value => value === "") &&  Object.values(errors).every(value => value === "");
    
    if(!hasErrors){
      setErrors(errors);
      return;
    }

    setProducts(prev => [{
        ...product,
        id: uuid(),
        colors: tempColors
      },
      ...prev
    ])

    setProduct(defaultProduct);
    setTempColor([]);

    closeModal();
  }

  const renderProductList = products.map(product => <ProductCard key={product.id} product={product} />);
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col space-y-2" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
      <ErrorMessage msg={errors[input.name]}/>
    </div>
  ));
  const renderColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => colorClickHandler(color)}/> );

  const renderSelectedColors = tempColors.map( color => <ColorTag color={color} key={color} onClick={() => colorClickHandler(color)}/> )


  return (
    <main className="container">
      <Button className={"bg-indigo-700 hover:bg-indigo-800"} onClick={openModal}>
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Add New Product"}> 
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
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
    </main>
  )
}

export default App