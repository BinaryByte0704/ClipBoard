import { IconProps } from "./types";

const NotionIcon = ({ className }: IconProps) => {
  return (
    <div className="w-6 h-6 text-gray-800 hover:text-black transition-colors duration-300">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4 4v10l7-5-7-5z" />
      </svg>
    </div>
  );
};

export default NotionIcon;
