"use client"
import DashboardGlobeComponent from "../components/DashboardGlobeComponent";

export default function Dashboard() {
    return (
        <div className="h-screen w-screen">
            <h1 className="text-white text-center mt-16 -mb-10">Pick a Country. We'll show you the data.</h1>
            <div className="flex justify-center -mt-10">
                <DashboardGlobeComponent />
            </div>
        </div>
    )
}