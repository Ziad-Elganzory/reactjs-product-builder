import Button from "./ui/Button";
import Image from "./ui/Image";
interface IProps{

}
const ProductCard = ({}:IProps) => {
  return (
    <div className="border rounded-md p-2 flex flex-col">
        <Image
            imageURL={"https://picsum.photos/id/237/200/300"}
            alt={"Product Image"}
            className="rounded-md mb-2"
        />
        <h3>2022 Genesis GV70: Nomine</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam voluptates omnis consequuntur reiciendis perferendis mollitia. Magnam id culpa ipsum ex dicta illum, nostrum quia harum repellat, placeat velit, iusto natus.</p>
        <div className="flex items-center my-4 space-x-2">
            <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
            <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
            <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
        </div>
        <div className="flex items-center justify-between">
            <span>$500,000</span>
            <Image
                imageURL={"https://picsum.photos/id/237/200/300"}
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
            <Button className={"bg-slate-700"}>
                Loading
            </Button> 
            <Button className={"bg-green-700"}>
                Success
            </Button>
            <Button className={"bg-gray-300"}>
                Cancel
            </Button>   
        </div>
    </div>
  )
}

export default ProductCard