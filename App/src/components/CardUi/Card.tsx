import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tags from "./Tags";
import DocumentIcon from "../icons/DocumentIcon";
import NotionIcon from "../icons/NotionIcon";
import TwitterIcon from "../icons/TwitterIcon";
import { format } from "date-fns";
import DeleteIcon from "../icons/DeleteIcon";

interface CardProps {
  icon: "Youtube" | "Twitter" | "Notion";
  tag:
    | "Productivity"
    | "Tech & Tools"
    | "Mindset"
    | "Learning & Skills"
    | "Workflows"
    | "Inspiration";
  title: string;
  link: string;
  reload?: () => void;
}

const Card = ({ icon, tag, title, link, reload }: CardProps) => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const date = format(new Date(), "dd MMM yyyy");

  // Extract YouTube video ID
  const getYoutubeId = (url: string): string | null => {
    const vMatch = url.split("v=");
    if (vMatch.length > 1) return vMatch[1].split("&")[0];
    const shortMatch = url.split("youtu.be/");
    if (shortMatch.length > 1) return shortMatch[1].split("?")[0];
    return null;
  };

  // Generate thumbnail for YouTube
  useEffect(() => {
    const videoId = getYoutubeId(link);
    if (videoId)
      setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    else setThumbnail(null);
  }, [link]);

  async function deleteHandle() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/v1/delete/${title}`, {
        method: "DELETE",
        headers: { token },
        credentials: "include",
      });

      if (res.ok) {
        alert("Item deleted successfully");
        reload && reload();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  let contentPreview = (
    <p className="text-gray-400 text-center mt-6">No content available</p>
  );

  if (icon === "Youtube") {
    contentPreview = thumbnail ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-lg w-full h-40 object-cover transform transition-transform hover:scale-105"
        />
      </a>
    ) : (
      contentPreview
    );
  } else if (icon === "Twitter") {
    contentPreview = (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center mt-6"
      >
        <TwitterIcon className="w-20 h-20" />
      </a>
    );
  } else if (icon === "Notion") {
    contentPreview = (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center mt-6"
      >
        <NotionIcon className="w-20 h-20" />
      </a>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <DocumentIcon className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-semibold truncate">{title}</h2>
        </div>
        <div
          onClick={deleteHandle}
          className="cursor-pointer hover:text-red-500 transition"
        >
          <DeleteIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Content Preview */}
      <div className="p-4">{contentPreview}</div>

      {/* Tag */}
      <div className="px-4 pb-2">
        <Tags tagTypes={tag} />
      </div>

      {/* Footer */}
      <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-100">
        Created on: <span className="font-medium">{date}</span>
      </div>
    </div>
  );
};

export default Card;
