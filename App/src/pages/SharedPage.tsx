import { useLocation } from "react-router-dom";
import Card from "../components/CardUi/Card";
import { useEffect, useState } from "react";

const SharedPage = () => {
  const location = useLocation();
  const [sharedData, setSharedData] = useState<any[]>([]);

  useEffect(() => {
    // Try to get data from location state
    if (location.state?.shared) {
      setSharedData(location.state.shared);
    } else {
      // If no state, get from URL query params
      const queryParams = new URLSearchParams(location.search);
      const dataParam = queryParams.get("data");
      if (dataParam) {
        try {
          const decodedData = JSON.parse(decodeURIComponent(dataParam));
          setSharedData(decodedData);
        } catch (e) {
          console.error("Failed to parse shared data", e);
        }
      }
    }
  }, [location]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8">
      <div className="text-3xl lg:text-4xl font-bold text-blue-900 mb-8">
        Shared Content from Second Brain
      </div>

      {sharedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sharedData.map((item: any, idx: number) => (
            <div
              key={idx}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Card
                icon={item.contentType}
                tag={item.tag}
                title={item.title}
                link={item.link}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl font-semibold text-gray-500 mt-10">
          No shared content found.
        </div>
      )}
    </div>
  );
};

export default SharedPage;
