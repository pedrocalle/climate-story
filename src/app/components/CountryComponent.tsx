import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface CountryOutlineProps {
    country: string;
    scale: number; // Tamanho do país
    center: [number, number]; // Coordenadas de centralização (longitude, latitude)
}

const CountryOutline: React.FC<CountryOutlineProps> = ({ country, scale, center }) => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        // URL de um GeoJSON de fronteiras de países
        fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
            .then(response => response.json())
            .then(data => setGeoData(data))
            .catch(error => console.error("Error loading GeoJSON:", error));
    }, []);

    if (!geoData) return <div>Loading map...</div>;

    const fixedWidth = 500;  // Largura fixa
    const fixedHeight = 500; // Altura fixa

    return (
        <div style={{ width: fixedWidth, height: fixedHeight }}>
            <ComposableMap
                projectionConfig={{
                    scale: scale, // Controle do tamanho do país
                    center: center, // Centraliza no país
                }}
                width={fixedWidth} // Largura fixa do mapa
                height={fixedHeight} // Altura fixa do mapa
                viewBox={`0 0 ${fixedWidth} ${fixedHeight}`} // Define a área visível do SVG
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
                                        default: { fill: "#FFF6C7" },
                                        hover: { fill: "#FFF6C7" },
                                        pressed: { fill: "#FFF6C7" },
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
