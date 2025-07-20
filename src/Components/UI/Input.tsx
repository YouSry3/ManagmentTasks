// Components/UI/Input.tsx
import { forwardRef, type InputHTMLAttributes, type Ref,  } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(({ ...rest }, ref:Ref<HTMLInputElement>) => {
  return (
    <input
      {...rest}
      ref={ref}
      className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
    />
  );
});

export default Input;
