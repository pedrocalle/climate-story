"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const [isActive, setIsActive] = useState(false);
  const [bottom, setBottom] = useState("5%");

  const router = useRouter();
  function handleNavigation() {
    router.push("/dashboard");
  }

  function handleClick() {
    if (isActive) {
      setIsActive(false);
      setBottom("5%");
    } else {
      setIsActive(true);
      setBottom("50%");
    }
  }

  return (
    <>
      <div
        style={{ bottom: bottom }}
        className="transition-all absolute right-1/2 translate-x-1/2 translate-y-1/2 pb-10 px-8 rounded-xl w-80 bg-translucent backdrop-blur-xl border-solid border-white border"
      >
        <div onClick={handleClick}>
          <div className="flex justify-end mb-8 mt-2 -mr-5">
            {isActive ? (
              <X
                size={18}
                className="text-white transition"
                onClick={handleClick}
              />
            ) : (
              <X size={18} className="text-white transition opacity-0" />
            )}
          </div>
          <h5 className="text-white text-center mb-6">Get Started</h5>
        </div>
        {!isActive ? (
          <></>
        ) : (
          <div>
            <form>
              <label className="mb-1 text-white label" htmlFor="">
                Email:
              </label>
              <input type="email" className="text-black px-2 mb-2" />
              <div className="flex">
                <label
                  htmlFor="checkbox"
                  className="font-extralight leading-4 text-white text-base"
                >
                  I would like to receive emails about climate emergencies.
                </label>
              </div>
              <div
                className="flex justify-center mt-6"
                onClick={handleNavigation}
              >
                <button className="uppercase button transition mx-auto text-white bg-gradient py-2 px-10 text-center rounded-md hover:drop-shadow-glow">
                  Sign me up
                </button>
              </div>
              <div className="mt-2">
                <p>
                  Or just go to dashboard:{" "}
                  <a
                    className="text-blue-500 cursor-pointer underline"
                    onClick={handleNavigation}
                  >
                    Dashboard
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
