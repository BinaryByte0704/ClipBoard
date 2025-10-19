import { IconProps } from "./types";

const PlusIcon = ({ className }: IconProps) => {
  return (
    <div className="w-6 h-6 text-green-500 hover:text-green-600 hover:scale-110 transition-transform duration-300 cursor-pointer">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
};

export default PlusIcon;
