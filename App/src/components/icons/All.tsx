import { IconProps } from "./types";

const All = ({ className }: IconProps) => {
  return (
    <div className="w-6 h-6 text-purple-500 hover:text-purple-600 transition-colors duration-300">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      </svg>
    </div>
  );
};

export default All;
