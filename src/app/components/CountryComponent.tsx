import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid, geoBounds } from "d3-geo";

interface CountryOutlineProps {
  country: string;
  color: string;
}

const CountryOutline: React.FC<CountryOutlineProps> = ({ country, color }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [scale, setScale] = useState(100);

  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    )
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);

        const selectedCountry = data.features.find(
          (feature: any) =>
            feature.properties.ADMIN.toLowerCase() === country.toLowerCase()
        );

        if (selectedCountry) {
          const centroid = geoCentroid(selectedCountry);
          setCenter(centroid as [number, number]);

          const bounds = geoBounds(selectedCountry);
          const width = bounds[1][0] - bounds[0][0];
          const height = bounds[1][1] - bounds[0][1];

          // Cálculo da área do país
          const area = width * height;

          // Aumentando a escala para todos os países
          const baseScaleFactor = 100; // Escala base
          const areaFactor = Math.sqrt(area); // Ajusta a escala com base na área

          // Definindo uma escala mínima e máxima
          const minScale = 50; // Escala mínima
          let maxScale = 600; // Escala máxima

          if (
            country == "canada" ||
            country == "argentina" ||
            country == "chile"
          ) {
            maxScale = 200;
          }

          const dynamicScale = Math.min(
            Math.max(baseScaleFactor * areaFactor, minScale),
            maxScale
          );

          setScale(dynamicScale);
        }
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, [country, containerSize]);

  if (!geoData) return <div>Loading map...</div>;

  return (
    <div
      style={{
        width: containerSize.width,
        height: containerSize.height,
        overflow: "visible",
        position: "relative",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: scale, // Escala ajustada
          center: center, // Centro baseado no centróide
        }}
        width={containerSize.width}
        height={containerSize.height}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoName = geo.properties.ADMIN?.toLowerCase();
              const countryName = country.toLowerCase();

              return geoName === countryName ? (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: color, stroke: "#000" },
                    hover: { fill: color },
                    pressed: { fill: color },
                  }}
                />
              ) : null;
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default CountryOutline;
