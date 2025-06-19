import type { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Button from "./ui/Button";
import Image from "./ui/Image";
interface IProps{
    product: IProduct;
}
const ProductCard = ({product}:IProps) => {
    const {title,category,description,imageURL,price,colors} = product;
    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
            <Image
                imageURL={imageURL}
                alt={"Product Image"}
                className="rounded-md h-52 w-full lg:object-cover"
            />
            <h3 className="text-lg font-semibold">{textSlicer(title,25)}</h3>
            <p className="text-xs text-gray-500 break-words">{textSlicer(description)}</p>
            <div className="flex items-center flex-wrap space-x-1 my-2">
                {colors.map((color) => <CircleColor key={color} color={color}/>)}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-lg text-indigo-600 font-semibold">${price}</span>
                <Image
                    imageURL={category.imageURL}
                    alt={category.name}
                    className={"w-10 h-10 rounded-full object-bottoms"}
                />
            </div>
            <div className="flex items-center justify-between space-x-2 mt-2">
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