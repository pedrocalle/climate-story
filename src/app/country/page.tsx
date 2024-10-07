"use client";

import { useEffect, useState } from "react";
import CountryComponent from "../components/CountryComponent";
import { useSearchParams } from "next/navigation";
import { Circles } from "react-loader-spinner";
import api from "../api/api";
import { getColor } from "../../utils/colorGenerator";
import SuspenseBoundary from "../components/SuspenseBoundaryComponent";

interface IResponse {
  year: number;
  min: number;
  max: number;
  mean: number;
  totalSum: number;
}

function CountryContent() {
  const [year, setYear] = useState<number>(2022);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IResponse[]>();
  const [color, setColor] = useState("#FFF");
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const backupData = [
    {
      year: 2022,
      min: 0.8368188142776489,
      max: 141.2749481201172,
      mean: 9.606651599053293,
      totalSum: 68991.83056640625,
    },
    {
      year: 2021,
      min: 0.8411012887954712,
      max: 125.82670593261719,
      mean: 8.665145537583157,
      totalSum: 62560.66748046875,
    },
    {
      year: 2020,
      min: 0.7228115797042847,
      max: 119.5638198852539,
      mean: 9.016570852138102,
      totalSum: 59140.69140625,
    },
    {
      year: 2019,
      min: 0.9144980311393738,
      max: 114.1305160522461,
      mean: 8.70184522261843,
      totalSum: 62542.09130859375,
    },
    {
      year: 2018,
      min: 0.9306457042694092,
      max: 115.3043212890625,
      mean: 8.798332389444113,
      totalSum: 63234.55859375,
    },
    {
      year: 2017,
      min: 0.9030182957649231,
      max: 113.02253723144531,
      mean: 8.61487409286201,
      totalSum: 61917.2275390625,
    },
    {
      year: 2016,
      min: 0.9142192602157593,
      max: 116.6636734008789,
      mean: 8.878909965511411,
      totalSum: 63801.4521484375,
    },
    {
      year: 2015,
      min: 0.931946337223053,
      max: 115.95260620117188,
      mean: 8.842191922012717,
      totalSum: 63551.68115234375,
    },
    {
      year: 2014,
      min: 0.9507896900177002,
      max: 117.15657806396484,
      mean: 8.941042598802596,
      totalSum: 64262.89306640625,
    },
    {
      year: 2013,
      min: 0.9413241744041443,
      max: 120.29887390136719,
      mean: 9.150012325961143,
      totalSum: 65765.46923828125,
    },
    {
      year: 2012,
      min: 0.9199464321136475,
      max: 120.96372985839844,
      mean: 9.180185635574162,
      totalSum: 65969.69970703125,
    },
    {
      year: 2011,
      min: 0.9464284777641296,
      max: 116.19154357910156,
      mean: 8.87004824820906,
      totalSum: 63752.93408203125,
    },
    {
      year: 2010,
      min: 0.9727728366851807,
      max: 110.54508209228516,
      mean: 8.501492474693805,
      totalSum: 61103.796875,
    },
    {
      year: 2009,
      min: 2.0943806171417236,
      max: 146.5986785888672,
      mean: 16.495001549832523,
      totalSum: 63283.66796875,
    },
    {
      year: 2008,
      min: 2.2499544620513916,
      max: 153.0673828125,
      mean: 17.29514786042273,
      totalSum: 65424.24951171875,
    },
    {
      year: 2007,
      min: 2.2386438846588135,
      max: 151.75784301757812,
      mean: 17.17478136718273,
      totalSum: 66226.87841796875,
    },
    {
      year: 2006,
      min: 2.2253189086914062,
      max: 153.0105438232422,
      mean: 17.210547315888107,
      totalSum: 66583.8916015625,
    },
    {
      year: 2005,
      min: 2.3121421337127686,
      max: 151.29922485351562,
      mean: 17.262289593927562,
      totalSum: 65732.498046875,
    },
    {
      year: 2004,
      min: 2.434741497039795,
      max: 108.6069107055664,
      mean: 12.56594489980489,
      totalSum: 70220.65673828125,
    },
    {
      year: 2003,
      min: 3.4753589630126953,
      max: 116.0573959350586,
      mean: 13.308032259810716,
      totalSum: 67867.05029296875,
    },
    {
      year: 2002,
      min: 3.39900803565979,
      max: 107.82408142089844,
      mean: 12.67038618773222,
      totalSum: 64240.60986328125,
    },
    {
      year: 2001,
      min: 3.356626033782959,
      max: 90.83014678955078,
      mean: 12.075237974058837,
      totalSum: 56983.59912109375,
    },
    {
      year: 2000,
      min: 3.493612289428711,
      max: 86.52825164794922,
      mean: 11.562100651673973,
      totalSum: 55084.13720703125,
    },
  ];

  // Verifica se os parâmetros de pesquisa são válidos
  if (!name || !lat || !lng) {
    return <div>Invalid parameters</div>;
  }

  const minValue = backupData?.reduce((acc: number | null, stat: any) => {
    return acc === null ? stat.totalSum : Math.min(acc, stat.totalSum);
  }, null);

  const maxValue = backupData?.reduce((acc: number | null, stat: any) => {
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
    setLoading(false);
    // fetchApi();
  }, []);

  useEffect(() => {
    // Atualiza a cor quando o ano ou os valores mínimo e máximo mudam
    const selectedStat = backupData?.find((stat) => stat.year === year);
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
                    backupData?.find((stat) => stat.year === year)?.totalSum ||
                      0
                  )}
                </h1>
                <p className="font-inter text-2xl text-white w-80 mb-7">
                  grams of CO2 per square meter were emitted by fossil fuels in{" "}
                  {year}.
                </p>
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

export default function CountryPage() {
  return (
    <SuspenseBoundary>
      <CountryContent />
    </SuspenseBoundary>
  );
}
