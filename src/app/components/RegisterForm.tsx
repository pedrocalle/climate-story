import { CircleX, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function RegisterForm() {
    const [isActive, setIsActive] = useState(false);
    const bottomPosition = isActive ? "10%" : "-55%";

    const router = useRouter()
    function handleNavigation() {
        router.push("/dashboard")
    }

    function handleClick() {
        if (isActive) {
            setIsActive(false)
        } else {
            setIsActive(true)
        }

    }

    return (
        <>
            <div className="transition-all absolute right-1/2 translate-x-1/2 pb-10 px-8 rounded-xl w-80 bg-translucent backdrop-blur-xl border-solid border-white border" style={
                { bottom: bottomPosition }
            }>
                <div onClick={handleClick}>
                    <div className="flex justify-end mb-8 mt-2 -mr-5">
                        {isActive ? <X size={18} className="text-white transition" onClick={handleClick} /> : <X size={18} className="text-white transition opacity-0" />}
                    </div>
                    <h5 className="text-white text-center mb-6">Get Started</h5>
                </div>
                <div>
                    <form>
                        <label className="mb-1 text-white label" htmlFor="">Name:</label>
                        <input className="mb-2" type="text" id="name" />
                        <label className="mb-1 text-white label" htmlFor="">Email:</label>
                        <input className="mb-2" type="text" id="email" />
                        <label className="mb-1 text-white label" htmlFor="">Country:</label>
                        <input className="mb-2" type="text" id="country" />
                        <label className="mb-1 text-white label" htmlFor="">Password:</label>
                        <input className="mb-2" type="password" id="password" />
                        <label className="mb-1 text-white label" htmlFor="">Confirm Password:</label>
                        <input className="mb-5" type="password" id="confirm-password" />
                        <div className="flex">
                            <input type="checkbox" id="checkbox" className="w-4 h-4 mr-2 mt-1" />
                            <label htmlFor="checkbox" className="font-extralight leading-1 text-white">I would like to receive emails about climate emergencies.</label>
                        </div>
                        <div className="flex justify-center mt-6" onClick={handleNavigation}>
                            <button className="uppercase button transition mx-auto text-white bg-gradient py-2 px-10 text-center rounded-md hover:drop-shadow-glow">
                                Sign me up
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}