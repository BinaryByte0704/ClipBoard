import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUi from "../components/ButtonUi/Button";
import SideNavbar from "../components/SideNavbarUi/SideNavbar";
import Modal from "../components/ModalUi/Modal";
import Card from "../components/CardUi/Card";
import ShareIcon from "../components/icons/ShareIcon";
import PlusIcon from "../components/icons/PlusIcon";

const HomePage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data1, setData] = useState<any[]>([]);
  const [ytData, setYTData] = useState<any[]>([]);
  const [notionData, setNitionData] = useState<any[]>([]);
  const [, setShareData] = useState<any[]>([]);
  const [dataShow, setDataShow] = useState("All");

  useEffect(() => {
    fetchData();
  }, [reloadData]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch("http://localhost:5000/api/v1/content", {
        method: "GET",
        headers: { token },
        credentials: "include",
      });

      const jsonData = await res.json();
      setData(jsonData.data);
    } catch (err) {
      console.log("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  const share = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch("http://localhost:5000/api/v1/content", {
        method: "GET",
        headers: { "Content-Type": "application/json", token },
        credentials: "include",
      });
      const jsonData = await res.json();
      setShareData(jsonData.data);

      if (res.ok) {
        const encodedData = encodeURIComponent(JSON.stringify(jsonData.data));
        const shareLink = `${window.location.origin}/share/${userId}?data=${encodedData}`;

        navigator.clipboard.writeText(shareLink);
        alert("Shareable link copied!");
      } else {
        alert("Something went wrong while sharing.");
      }
    } catch (err) {
      console.log("Error while sharing data", err);
    }
  };

  // Determine which data to show
  const getDisplayedData = () => {
    switch (dataShow) {
      case "All":
        return data1;
      case "Youtube":
        return ytData;
      case "Notion":
        return notionData;
      default:
        return data1;
    }
  };

  const displayedData = getDisplayedData();

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Sidebar */}
      <SideNavbar
        data1={data1}
        setData={setData}
        setYTData={setYTData}
        setNitionData={setNitionData}
        setDataShow={setDataShow}
      />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
            {dataShow} Notes
          </h1>

          <div className="flex gap-3">
            <ButtonUi
              variant="secondary"
              size="lg"
              text="Share Brain"
              startIcon={<ShareIcon />}
              onClick={share}
            />
            <ButtonUi
              variant="primary"
              size="lg"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => setModal(true)}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="text-2xl font-semibold col-span-full text-center mt-20">
              Loading...
            </div>
          ) : displayedData.length > 0 ? (
            displayedData.map((item: any, idx: number) => (
              <Card
                key={idx}
                icon={item.contentType}
                tag={item.tag}
                title={item.title}
                link={item.link}
                reload={() => setReloadData(!reloadData)}
              />
            ))
          ) : (
            <div className="text-2xl font-semibold col-span-full text-center mt-20">
              No content available
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {modal && (
        <Modal
          onClick={() => setModal(false)}
          setModal={setModal}
          setReloadData={() => setReloadData(!reloadData)}
        />
      )}
    </div>
  );
};

export default HomePage;
