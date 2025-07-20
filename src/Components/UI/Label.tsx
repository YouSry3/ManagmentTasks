// Components/UI/Label.tsx
interface ILabelProps {
  htmlFor?: string;
  children?: React.ReactNode;
}

const Label = ({ children, htmlFor }: ILabelProps) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
    </label>
  );
};

export default Label;
