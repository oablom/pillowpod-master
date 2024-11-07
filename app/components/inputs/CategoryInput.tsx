"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col rounded-xl border-2 p-4 gap-3 hover:border-black dark:hover:bg-white dark:hover:text-black transition cursor-pointer  ${
        selected
          ? "border-black dark:border-white  dark:bg-white dark:text-black"
          : "border-neutral-200"
      }`}
    >
      <Icon size={26} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
