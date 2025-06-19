interface IProps {
    msg: string;
}
const ErrorMessage = ({msg}:IProps) => {
  return msg ? <span className="block text-red-500 text-sm font-semibold">{msg}</span> : null;
}

export default ErrorMessage