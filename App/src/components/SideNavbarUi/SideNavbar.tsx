import AppLogo from "../icons/AppLogo";
import NavFields from "./NavFields";
import YoutubeIcon from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import All from "../icons/All";

interface SideNavbarProps {
  data1: any[];
  setData: any;
  setYTData: any;
  setNitionData: any;
  setDataShow: any;
}

const SideNavbar = ({
  data1,
  setYTData,
  setNitionData,
  setDataShow,
}: SideNavbarProps) => {
  const filterYoutube = () => {
    setYTData(data1.filter((d) => d.contentType === "Youtube"));
    setDataShow("Youtube");
  };

  const filterNotion = () => {
    setNitionData(
      data1.filter(
        (d) => d.contentType === "Notion" || d.contentType === "Twitter"
      )
    );
    setDataShow("Notion");
  };

  const showAll = () => setDataShow("All");

  return (
    <div className="w-[18vw] min-w-[200px] h-screen bg-white shadow-lg border-r-2 flex flex-col">
      <div className="flex items-center gap-2 p-4 font-bold text-2xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-white rounded-tr-xl rounded-br-xl">
        <AppLogo /> Second Brain
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div onClick={showAll}>
          <NavFields text="All" startIcon={<All />} />
        </div>
        <div onClick={filterYoutube}>
          <NavFields text="Youtube" startIcon={<YoutubeIcon />} />
        </div>
        <div onClick={filterNotion}>
          <NavFields text="Documents" startIcon={<DocumentIcon />} />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
