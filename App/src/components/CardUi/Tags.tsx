interface TagsProps {
  tagTypes:
    | "Productivity"
    | "Tech & Tools"
    | "Mindset"
    | "Learning & Skills"
    | "Workflows"
    | "Inspiration";
}

const tagGradients: Record<string, string> = {
  Productivity: "bg-gradient-to-r from-blue-400 to-indigo-500 text-white",
  "Tech & Tools": "bg-gradient-to-r from-green-400 to-teal-500 text-white",
  Mindset: "bg-gradient-to-r from-purple-400 to-pink-500 text-white",
  "Learning & Skills":
    "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
  Workflows: "bg-gradient-to-r from-red-400 to-pink-500 text-white",
  Inspiration: "bg-gradient-to-r from-indigo-400 to-purple-500 text-white",
};

const Tags = ({ tagTypes }: TagsProps) => {
  return (
    <div
      className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transform transition-all duration-300 hover:scale-105 ${tagGradients[tagTypes]}`}
    >
      #{tagTypes}
    </div>
  );
};

export default Tags;
