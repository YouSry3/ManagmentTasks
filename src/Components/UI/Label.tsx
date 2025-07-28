// Components/UI/Label.tsx
interface ILabelProps {
  children?: React.ReactNode;
}

const Label = ({ children }: ILabelProps) => {
  return (
    <label  className="text-sm font-medium text-gray-700 mb-1">
      {children}
    </label>
  );
};

export default Label;
