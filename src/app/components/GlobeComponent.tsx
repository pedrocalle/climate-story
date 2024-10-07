import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Importação dinâmica para evitar o erro do "window is not defined"
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const GlobeComponent: React.FC = () => {
  const globeEl = useRef<any>();

  useEffect(() => {
    if (globeEl.current) {
      const rotateGlobe = () => {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 1;
      };
      rotateGlobe();
    }
  }, []);

  return (
    <div style={{ height: "800px", width: "800px" }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)" // Fundo transparente
        height={800}
        width={800}
      />
    </div>
  );
};

export default GlobeComponent;
