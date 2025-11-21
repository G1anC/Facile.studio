'use client'

import data from "./projects.json"
import gsap from "gsap"
import React, { useRef } from "react"
import Footer from "../components/footer";
import ContactModal from "@/app/components/contactModal";
import Header from "@/app/components/header";

export default function Portfolio() {
    const [open, setOpen] = React.useState(false);

    const bandsRightRef = useRef<(HTMLDivElement | null)[]>([]);
    const bandsLeftRef  = useRef<(HTMLDivElement | null)[]>([]);
    const backgroundRef = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div className="bg-[#CAE6D8] sm:p-4 p-2 w-screen h-screen tracking-tight text-[#1E1E1E] flex flex-col gap-3">
            <Header setOpen={setOpen} />
            <div className="w-full overflow-hidden h-full relative rounded-[32px]">
                {data.map((item, id) => (
                    <img
                        ref={el => backgroundRef.current[id] = el}
                        key={id}
                        alt="background"
                        src={`/Backgrounds/${item.name}.png`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 opacity-0 -translate-y-1/2 w-full h-auto min-h-full object-cover"
                    />
                ))}
                <img
                    alt="background"
                    src="/Backgrounds/blurBackground.png"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 z-0 -translate-y-1/2 w-full h-auto min-h-full object-cover"
                />
                <img
                    alt="WORKS"
                    src="/icons/Works.svg"
                    className="absolute lg:-bottom-10 bottom-0 w-full -left-1 scale-102 z-20"
                />

                <div className="my-auto top-1/3 -translate-y-1/2 flex flex-col relative w-full md:px-32 px-8 text-[#CAE6D8] gap-32 z-50">
                    <div className="flex justify-between font-extrabold">
                        NAME
                        <div className="flex items-between justify-between md:w-[200px] xl:w-[600px] w-auto">
                            <div className={"md:inline hidden"}>TYPE</div>
                            <div>TIME (WEEKS)</div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full flex-shrink-0">
                        {data.map((item, id) => {
                            return (
                                <a
                                    href={item.link}
                                    key={id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-between items-center flex-shrink-0
                                    cursor-pointer
                                    hover:font-extrabold hover:uppercase duration-100 transition-all py-4"
                                    onMouseEnter={() => {
                                        gsap.to([bandsRightRef.current[id], bandsLeftRef.current[id]], {
                                            opacity: 1,
                                            duration: 0.2,
                                            ease: "power2.inOut",
                                        });
                                        gsap.to(backgroundRef.current[id], {
                                            zIndex:1,
                                            opacity: 1,
                                            duration:0.3,
                                            ease: "power3.out",
                                            onComplete: () => {
                                                gsap.set(backgroundRef.current[id], {
                                                    zIndex: 1,
                                                })
                                            }
                                        })
                                    }}
                                    onMouseLeave={() => {
                                        gsap.to([bandsRightRef.current[id], bandsLeftRef.current[id]], {
                                            opacity: 0,
                                            duration: 0.3,
                                            ease: "power2.inOut",
                                        });
                                        gsap.to(backgroundRef.current[id], {
                                            opacity: 0,
                                            duration:0.3,
                                            ease: "power3.out",
                                            onComplete: () => {
                                                gsap.set(backgroundRef.current[id], {
                                                    zIndex: 0,
                                                })
                                            }
                                        })

                                    }}
                                >
                                    <div className="flex-shrink-0">{item.name}</div>

                                    <div ref={el => bandsRightRef.current[id] = el} className="w-full h-4 px-16 opacity-0">
                                        <div className="bg-[#CAE6D8] h-4 rounded-full w-full"></div>
                                    </div>

                                    <div className="flex items-between flex-shrink-0 justify-between md:w-[300px] xl:w-[600px] w-auto">
                                        <div className="flex-shrink-0 md:inline hidden">{item.description}</div>

                                        <div ref={el => bandsLeftRef.current[id] = el} className="w-full h-4 px-16 opacity-0">
                                            <div className="bg-[#CAE6D8] h-4 rounded-full w-full"></div>
                                        </div>

                                        <div className="flex-shrink-0">{item.weeks}</div>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>



            <Footer setOpen={setOpen}/>
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    )
}
