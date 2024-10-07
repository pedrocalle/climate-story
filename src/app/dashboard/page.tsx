"use client";
import { useEffect } from "react";
import DashboardGlobeComponent from "../components/DashboardGlobeComponent";

export default function Dashboard() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  return (
    <div className="overflow-y-hidden">
      <h1 className="text-white text-center mt-16 -mb-10">
        Pick a Country. We'll show you the data.
      </h1>
      <div className="flex justify-center -mt-16">
        <DashboardGlobeComponent />
      </div>
    </div>
  );
}
