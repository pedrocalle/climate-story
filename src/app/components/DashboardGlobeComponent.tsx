import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DashboardGlobe = dynamic(() => import('react-globe.gl'), { ssr: false });

const DashboardGlobeComponent: React.FC = () => {
    const globeEl = useRef<any>();
    const [countries, setCountries] = useState({ features: [] })

    useEffect(() => {
        fetch('/data/ne_110m_admin_0_countries.geojson').then(res => {
            return res.json()
        })
            .then(setCountries);
        if (globeEl.current) {
            const rotateGlobe = () => {
                globeEl.current.controls().autoRotate = true;
                globeEl.current.controls().autoRotateSpeed = 1;
            };
            rotateGlobe();
        }
    }, []);

    return (
        <div style={{ height: '900px', width: '900px' }}>
            <DashboardGlobe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                height={900}
                width={900}

            />
        </div>
    );
};

export default DashboardGlobeComponent;