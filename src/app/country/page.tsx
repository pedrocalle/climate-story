"use client";

import { useEffect, useState } from "react";
import CountryComponent from "../components/CountryComponent";
import { useSearchParams } from "next/navigation";
import { Circles } from "react-loader-spinner";
import api from "../api/api";
import { getColor } from "../../utils/colorGenerator";

interface IResponse {
  year: number;
  min: number;
  max: number;
  mean: number;
  totalSum: number;
}

export default function Country() {
  const [year, setYear] = useState<number>(2022);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IResponse[]>();
  const [color, setColor] = useState("#FFF");
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Verifica se os parâmetros de pesquisa são válidos
  if (!name || !lat || !lng) {
    return <div>Invalid parameters</div>;
  }

  const minValue = data?.reduce((acc: number | null, stat: any) => {
    return acc === null ? stat.totalSum : Math.min(acc, stat.totalSum);
  }, null);

  const maxValue = data?.reduce((acc: number | null, stat: any) => {
    return acc === null ? stat.totalSum : Math.max(acc, stat.totalSum);
  }, null);

  useEffect(() => {
    document.body.style.overflow = "auto";
    async function fetchApi() {
      try {
        const response = await api.get("/api/FecthData/get-statistics", {
          params: {
            latitude: 13, // Use as coordenadas obtidas dos parâmetros
            longitude: -21, // Use as coordenadas obtidas dos parâmetros
          },
        });
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Mover para aqui para garantir que o loading seja atualizado corretamente
      }
    }
    fetchApi();
  }, []);

  useEffect(() => {
    // Atualiza a cor quando o ano ou os valores mínimo e máximo mudam
    const selectedStat = data?.find((stat) => stat.year === year);
    if (selectedStat) {
      setColor(getColor(selectedStat.totalSum, minValue, maxValue));
    }
  }, [year, minValue, maxValue]); // Executa sempre que year, minValue ou maxValue mudam

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div>
            <div className="flex justify-center">
              <Circles color="#fff" height={80} width={80} />
            </div>
            <p className="font-inter text-xl text-center text-white mt-7">
              Loading you data, It may take a while...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <CountryComponent country={name.toLowerCase()} color={color} />
            <div className="flex items-center">
              <div>
                <h3 className="text-white">{name}</h3>
                <h1>
                  {Math.round(
                    data?.find((stat) => stat.year === year)?.totalSum || 0
                  )}
                </h1>
                <p className="font-inter text-2xl text-white w-80 mb-7">
                  grams of CO2 per square meter were emitted by fossil fuels in{" "}
                  {year}.
                </p>
                <a href="#info">
                  <p className="font-inter text-2xl text-white w-80 underline">
                    What does it mean?
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-32">
            <div>
              <div className="mb-4">
                <div className="h-4 w-range rounded-xl bg-range-gradient mb-4" />
                <div className="w-range flex justify-between">
                  <h6 className="text-white">Good</h6>
                  <h6 className="text-white">Worrying</h6>
                  <h6 className="text-white">Terrible</h6>
                </div>
              </div>
              <div>
                <input
                  className="w-range"
                  type="range"
                  onChange={(e: any) => setYear(Number(e.target.value))}
                  min={2000}
                  max={2022}
                  defaultValue={2022}
                />
                <h1 className="text-white mb-7 text-center">{year}</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-32">
            <div className="text-center mx-auto mt-0">
              <h3 className="text-white mb-10">Air Quality is no joke.</h3>
              <p className="text-white text-xl w-range">
                Air quality is closely linked to the carbon gases emitted from
                burning fossil fuels, which are a major contributor to climate
                change. When fuels like coal, oil, and natural gas are burned,
                they release large amounts of carbon dioxide (CO2) and other
                greenhouse gases into the atmosphere. These gases trap heat,
                causing global temperatures to rise and leading to severe
                environmental and health impacts. We used data from the U.S.
                Greenhouse Gas Center to highlight the significant role of these
                emissions in degrading air quality and accelerating climate
                change.
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-32">
            <div className="text-center mx-auto mt-0">
              <h3 className="text-white mb-10">How can I help, then?</h3>
              <p className="text-white text-xl w-range">
                Climate change is a global concearn and there is much to be done
                to mitigate this ever-increasing issue. But it is still possible
                to act in a small scale to help out your neighbourhood! In this
                section, we listed for you the top non-lucrative organizations
                focused on helping out.{" "}
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-32">
            <div className="text-center mx-auto mt-0">
              <h1 className="text-white mb-10">I want to help out!</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
