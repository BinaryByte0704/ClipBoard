import { IconProps } from "./types";

const YoutubeIcon = ({ className }: IconProps) => {
  return (
    <div className="w-6 h-6 text-red-500 hover:text-red-600 transition-colors duration-300">
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19.6 3.2a2.4 2.4 0 0 1 1.7 1.7c.3 1.2.3 3.8.3 3.8s0 2.6-.3 3.8a2.4 2.4 0 0 1-1.7 1.7c-1.5.3-7.6.3-7.6.3s-6.1 0-7.6-.3a2.4 2.4 0 0 1-1.7-1.7C2 10.4 2 7.8 2 7.8s0-2.6.3-3.8a2.4 2.4 0 0 1 1.7-1.7C5.5 2 12 2 12 2s6.1 0 7.6.3zM10 14l6-3-6-3v6z" />
      </svg>
    </div>
  );
};

export default YoutubeIcon;
