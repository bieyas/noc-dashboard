// src/pages/MapPage.jsx
import { useEffect, useState } from "react";
import NetworkMap from "../components/NetworkMap";

export default function MapPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div
      className={`${
        isMobile ? "fixed inset-0 z-30 bg-black" : "space-y-0"
      }`}
    >
      {!isMobile && (
        <h1 className="text-xl font-semibold mb-4">Peta Jaringan</h1>
      )}
      <div
        className={`${
          isMobile ? "h-full w-full" : "h-[600px] w-full"
        }`}
      >
        <NetworkMap fullScreen={isMobile} />
      </div>
    </div>
  );
}
