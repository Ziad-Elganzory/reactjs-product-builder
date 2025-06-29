import type { IProduct } from "../interfaces";
import { priceNumberFormatter, textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Button from "./ui/Button";
import Image from "./ui/Image";
interface IProps{
    product: IProduct;
    setProductToEdit: (product: IProduct) => void;
    OpenEditModal: (value: boolean) => void;
    idx: number;
    setProductToEditIdx: (value: number) => void;
}
const ProductCard = ({product, setProductToEdit,OpenEditModal,idx,setProductToEditIdx}:IProps) => {
    const {title,category,description,imageURL,price,colors} = product;

    const onEdit = () => {
        setProductToEdit(product);
        OpenEditModal(true);
        setProductToEditIdx(idx);
    }

    const onDelete = () => {
        console.log(`Deleting product: ${title}`);
    }
    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
            <Image
                imageURL={imageURL}
                alt={"Product Image"}
                className="rounded-md h-52 w-full lg:object-cover hover:scale-105 transition-transform duration-200 object-center"
            />
            <h3 className="text-lg font-semibold">{textSlicer(title,25)}</h3>
            <p className="text-xs text-gray-500 break-words">{textSlicer(description)}</p>
            <div className="flex items-center flex-wrap space-x-1 my-2">
                {colors.map((color) => <CircleColor key={color} color={color}/>)}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-lg text-indigo-600 font-semibold">${priceNumberFormatter(price)}</span>
                <div className="flex items-center space-x-2">
                    <p>{category.name}</p>
                    <Image
                        imageURL={category.imageURL}
                        alt={category.name}
                        className={"w-10 h-10 rounded-full object-bottoms"}
                    />
                </div>

            </div>
            <div className="flex items-center justify-between space-x-2 mt-2">
                <Button className={"bg-indigo-700 hover:bg-indigo-800 transition-colors duration-200"} onClick={onEdit}>
                    Edit
                </Button>
                <Button className={"bg-red-700 hover:bg-red-800 transition-colors duration-200"} onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProductCard