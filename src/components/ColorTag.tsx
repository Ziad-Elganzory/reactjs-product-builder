import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color: string;
}
const ColorTag = ({color, ...rest}:IProps) => {
  return <span className="block p-1 mr-1 mb-1 text-xs rounded-md cursor-pointer text-white" style={{backgroundColor: color}} {...rest}>{color} <span className="font-bold">x</span></span>
}

export default ColorTag