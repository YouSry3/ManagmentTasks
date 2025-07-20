
interface ICustomText {
  text: string;
  className?: string;
  maxLength?: number;
}

const CustomText = ({
  text,
  className,
  maxLength = 30,
}:ICustomText) => {
  const shouldTruncate = text.length > maxLength;
  const displayedText = shouldTruncate
    ? text.slice(0, maxLength).trim() + '...'
    : text;

  return (
    <p className={className}>{displayedText}</p>
  );
};

export default CustomText;
