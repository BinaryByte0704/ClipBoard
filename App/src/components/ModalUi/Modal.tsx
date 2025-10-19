import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClick: () => void;
  setModal: (value: boolean) => void;
  setReloadData: () => void;
}

const Modal = ({ onClick, setModal, setReloadData }: ModalProps) => {
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [tag, setTag] = useState("Productivity");
  const [category, setCategory] = useState("Youtube");

  const mapTags = [
    "Productivity",
    "Tech & Tools",
    "Mindset",
    "Learning & Skills",
    "Workflows",
    "Inspiration",
  ] as const;

  const submitData = async () => {
    if (!titleRef.current?.value.trim() || !linkRef.current?.value.trim()) {
      alert("Fill all the input fields");
      return;
    }

    const data = {
      link: linkRef.current.value,
      contentType: category,
      title: titleRef.current.value,
      tag,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      await fetch("http://localhost:5000/api/v1/addcontent", {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        credentials: "include",
        body: JSON.stringify(data),
      });

      setReloadData();
      alert("Content added successfully!");
      setModal(false);
    } catch (err) {
      console.log("Error while sending data");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Overlay */}
      <div
        ref={modalRef}
        onClick={onClick}
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-[30vw] max-w-md bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-4 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
          <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
            Add Content
          </h2>
          <button
            onClick={onClick}
            className="text-xl font-bold hover:text-red-500 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Inputs */}
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          maxLength={30}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-400 transition-all hover:scale-105"
        />
        <input
          ref={linkRef}
          type="text"
          placeholder="Link"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-400 transition-all hover:scale-105"
        />

        {/* Tag Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Choose Tag:</h3>
          <div className="flex flex-wrap gap-2">
            {mapTags.map((t) => (
              <TagButton
                key={t}
                tag={t}
                isSelected={tag === t}
                onClick={() => setTag(t)}
              />
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Choose Category:</h3>
          <div className="flex gap-2">
            {["Youtube", "Twitter", "Notion"].map((c) => (
              <CategoryButton
                key={c}
                category={c}
                isSelected={category === c}
                onClick={() => setCategory(c)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={submitData}
          className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-transform transform hover:scale-105"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// Gradient Tag Button
interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}
const TagButton = ({ tag, isSelected, onClick }: TagButtonProps) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm font-medium transition-all transform ${
      isSelected
        ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white scale-105"
        : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white"
    }`}
  >
    {tag}
  </button>
);

// Category Button
interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}
const CategoryButton = ({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white font-semibold transition-transform transform ${
      isSelected
        ? "bg-gradient-to-r from-green-400 to-teal-500 scale-105"
        : "bg-gray-300 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-500"
    }`}
  >
    {category}
  </button>
);

export default Modal;
