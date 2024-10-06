"use client";
import React, { useEffect, useState } from "react";
import { RegisterForm } from "./components/RegisterForm";
import GlobeComponent from "./components/GlobeComponent";

// Importação dinâmica do componente com SSR desativado
const Home: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-screen h-screen">
      <h1 className="text-white text-center text-8xl mt-24">CLIMATE STORY</h1>
      <div className="flex justify-center items-center -mt-44">
        <GlobeComponent />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Home;
