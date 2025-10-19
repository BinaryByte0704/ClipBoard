import { IconProps } from "./types";

const AppLogo = ({ className }: IconProps) => {
  return (
    <div className="w-8 h-8 text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
};

export default AppLogo;
