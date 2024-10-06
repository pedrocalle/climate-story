"use client"

import { useState } from "react"
import CountryComponent from "../components/CountryComponent"

export default function Country() {
    const [year, setYear] = useState<number>(2023);
    return (
        <>
            <div className="flex justify-center">
                <CountryComponent country="brazil" scale={500} center={[-55.491477, -14.235004]} />
                <div className="flex items-center">
                    <div>
                        <h1 className="text-white mb-7">XXXX</h1>
                        <p className="font-inter text-2xl text-white w-80">grams of CO2/m^2 were emitted in this year.</p>
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
                        <input className="w-range" type="range" onChange={(e: any) => setYear(e.target.value)} min={2000} max={2023} defaultValue={2023} />
                        <h1 className="text-white mb-7 text-center">{year}</h1>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-32">
                <div className="text-center mx-auto mt-0">
                    <h3 className="text-white mb-10">Air Quality is no joke.</h3>
                    <p className="text-white text-xl w-range">
                        Air quality is closely linked to the carbon gases emitted from burning fossil fuels, which are a major contributor to climate change. When fuels like coal, oil, and natural gas are burned, they release large amounts of carbon dioxide (CO2) and other greenhouse gases into the atmosphere. These gases trap heat, causing global temperatures to rise and leading to severe environmental and health impacts. We used data from the U.S. Greenhouse Gas Center to highlight the significant role of these emissions in degrading air quality and accelerating climate change.
                    </p>
                </div>
            </div>

            <div className="flex justify-center mb-32">
                <div className="text-center mx-auto mt-0">
                    <h3 className="text-white mb-10">How can I help, then?</h3>
                    <p className="text-white text-xl w-range">
                        Climate change is a global concearn and there is much to be done to mitigate this ever-increasing issue. But it is still possible to act in a small scale to help out your neighbourhood! In this section, we listed for you the top non-lucrative organizations focused on helping out.                    </p>
                </div>
            </div>

            <div className="flex justify-center mb-32">
                <div className="text-center mx-auto mt-0">
                    <h1 className="text-white mb-10">I want to help out!</h1>
                </div>
            </div>
        </>
    )
}
