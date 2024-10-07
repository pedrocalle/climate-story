"use client";
import React, { useEffect, useState } from "react";
import { RegisterForm } from "./components/RegisterForm";
import GlobeComponent from "./components/GlobeComponent";
import logo from "../../public/assets/logo_compair-07.webp";
import Image from "next/image";

const Home: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-screen h-screen">
      <Image
        src={logo}
        alt="COMPair"
        width={783}
        height={117}
        className="absolute right-1/2 translate-x-1/2 -top-1/10"
      />
      <div className="flex justify-center items-center mt-12">
        <GlobeComponent />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Home;
