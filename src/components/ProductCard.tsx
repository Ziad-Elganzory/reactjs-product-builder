import type { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import Button from "./ui/Button";
import Image from "./ui/Image";
interface IProps{
    product: IProduct;
}
const ProductCard = ({product}:IProps) => {
    const {title,category,description,imageURL,price} = product;
    return (
        <div className="border rounded-md p-2 flex flex-col">
            <Image
                imageURL={imageURL}
                alt={"Product Image"}
                className="rounded-md mb-2"
            />
            <h3>{title}</h3>
            <p>{textSlicer(description)}</p>
            <div className="flex items-center my-4 space-x-2">
                <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
            </div>
            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image
                    imageURL={category.imageURL}
                    alt={"Product Image"}
                    className={"w-10 h-10 rounded-full object-center"}
                />
            </div>
            <div className="flex items-center justify-between space-x-2 my-5 text-white">
                <Button className={"bg-indigo-700"} onClick={() => alert("Added to cart")}>
                    Edit
                </Button>
                <Button className={"bg-red-700"}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProductCard