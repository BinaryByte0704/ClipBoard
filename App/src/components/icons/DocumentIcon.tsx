import { IconProps } from "./types";

const DocumentIcon = ({ className }: IconProps) => {
  return (
    <div className="w-6 h-6 text-blue-600 hover:text-indigo-500 transition-colors duration-300">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z" />
      </svg>
    </div>
  );
};

export default DocumentIcon;
