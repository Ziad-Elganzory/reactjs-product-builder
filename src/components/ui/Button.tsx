import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    width?: 'w-full' | 'w-fit';
  }
const Button = ({children,className, width='w-full', ...rest}:IProps) => {
  return (
    <button className={`${className} p-2 rounded-md ${width} text-white`} {...rest}>
      {children}
    </button>
  )
}

export default Button