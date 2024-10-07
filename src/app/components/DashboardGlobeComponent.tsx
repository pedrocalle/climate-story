"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DashboardGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

const DashboardGlobeComponent: React.FC = () => {
  const router = useRouter();
  const globeEl = useRef<any>();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState<any>(null);

  useEffect(() => {
    fetch("/data.geojson")
      .then((res) => res.json())
      .then(setCountries);

    if (globeEl.current) {
      const rotateGlobe = () => {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 1;
      };
      rotateGlobe();
    }
  }, []);

  // Helper function to create polygon label
  const getPolygonLabel = (d: any) => `
    <b>${d.properties.ADMIN} (${d.properties.ISO_A2}):</b> <br />
    GDP: <i>${d.properties.GDP_MD_EST || "N/A"}</i> M$<br/>
    Population: <i>${d.properties.POP_EST || "N/A"}</i>
  `;

  // Handle the click event on a country
  const handlePolygonClick = (d: any) => {
    const countryName = d.properties.ADMIN;
    const lat = d.properties.LAT || d.geometry.coordinates[0][1];
    const lng = d.properties.LONG || d.geometry.coordinates[0][0];

    // Redirect to the new page with the country data in the query params
    router.push(`/country?name=${countryName}&lat=${lat}&lng=${lng}`);
  };

  return (
    <div
      style={{
        height: "900px",
        width: "900px",
        cursor: hoverD ? "pointer" : "default", // Change cursor dynamically
      }}
    >
      <DashboardGlobe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countries.features.filter(
          (d: any) => d.properties.ISO_A2 !== "AQ" // Filter Antarctica
        )}
        lineHoverPrecision={0}
        polygonSideColor={() => "rgba(0, 100, 0, 0.15)"} // Default side color
        polygonStrokeColor={() => "#000000"} // Red stroke color for all polygons
        polygonCapColor={(d: any) =>
          d === hoverD ? "rgba(255, 165, 0, 0.8)" : "rgba(0, 100, 0, 0.5)"
        } // Highlight hovered polygon with orange
        polygonAltitude={0.01}
        onPolygonHover={(d: any) => setHoverD(d)} // Set hovered polygon
        onPolygonClick={handlePolygonClick}
        height={900}
        width={900}
      />
      {hoverD && (
        <div
          className="tooltip"
          style={{ position: "absolute", top: 10, left: 10 }}
        >
          <b>{hoverD.properties.ADMIN}:</b> {hoverD.properties.POP_EST} people
        </div>
      )}
    </div>
  );
};

export default DashboardGlobeComponent;
