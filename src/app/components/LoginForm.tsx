import { X } from "lucide-react";



export function LoginForm() {
    return (
        <>
            <div className="transition-all absolute right-1/2 translate-x-1/2 pb-10 px-8 rounded-xl w-80 bg-translucent backdrop-blur-xl border-solid border-white border">
                <div>
                    <h5 className="text-white text-center mb-6">Login</h5>
                </div>
                <div>
                    <form>
                        <label className="mb-1 text-white label" htmlFor="">Email:</label>
                        <input className="mb-2" type="text" id="email" />
                        <label className="mb-1 text-white label" htmlFor="">Password:</label>
                        <input className="mb-2" type="password" id="password" />
                        <div className="flex">
                            <input type="checkbox" id="checkbox" className="w-4 h-4 mr-2 mt-1" />
                            <label htmlFor="checkbox" className="font-extralight leading-1 text-white">I would like to receive emails about climate emergencies.</label>
                        </div>
                        <div className="flex justify-center mt-6">
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