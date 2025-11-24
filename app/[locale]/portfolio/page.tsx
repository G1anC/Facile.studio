'use client'

import data from "./projects.json"
import gsap from "gsap"
import React, { useRef } from "react"
import Footer from "@/app/components/footer";
import ContactModal from "@/app/components/contactModal";
import Header from "@/app/components/header";
import {RideauxIn} from "@/app/components/rideaux";
import { useTranslations } from 'next-intl';

export default function Portfolio() {
    const t = useTranslations('portfolio');
    const [open, setOpen] = React.useState(false);

    const bandsRightRef = useRef<(HTMLDivElement | null)[]>([]);
    const bandsLeftRef  = useRef<(HTMLDivElement | null)[]>([]);
    const backgroundRef = useRef<(HTMLDivElement | null)[]>([]);

    React.useEffect(() => {
        RideauxIn(0);
    }, [])

    return (
        <div className="relative bg-[#CAE6D8] p-4 w-screen h-screen tracking-tight text-[#1E1E1E] text-lg flex flex-col gap-3">
            <div className={"rideaux absolute rounded-b-[64px] top-0 left-0 w-screen h-screen z-99 bg-[#CAE6D8]"} />
            <Header setOpen={setOpen} />
            <div className="w-full overflow-hidden h-full relative rounded-[32px]">
                {data.map((item, id) => (
                    <div
                        style={{
                            backgroundImage: `url(/Backgrounds/${item.name}.png)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                        }}
                        ref={el => {
                            backgroundRef.current[id] = el;
                        }}
                        key={id}
                        className="absolute top-0 left-0 opacity-0 w-full h-full object-cover"
                    />
                ))}
                <div
                    style={{
                        backgroundImage: 'url("/Backgrounds/blurBackground.png")',
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 z-0 -translate-y-1/2 w-full h-auto min-h-full object-cover"
                />
                <img
                    alt="WORKS"
                    src="/icons/Works.svg"
                    className="absolute lg:-bottom-10 bottom-0 w-full max-w-[3500px] -left-1 scale-102 z-20"
                />

                <div
                    className="my-auto top-1/3 -translate-y-1/2 flex flex-col relative w-full md:px-32 px-8 text-[#CAE6D8] gap-32 z-50">
                    <div className="flex justify-between font-extrabold">
                        {t('headers.name')}
                        <div className="flex items-between justify-between md:w-[200px] xl:w-[600px] w-auto">
                            <div className={"md:inline hidden"}>{t('headers.type')}</div>
                            <div>{t('headers.time')}</div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full z-0 flex-shrink-0">
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
                                    <div className="flex-shrink-0">{t(`projects.${id}.name`)}</div>

                                    <div ref={el => void (bandsRightRef.current[id] = el)} className="w-full h-4 px-16 opacity-0">
                                        <div className="bg-[#CAE6D8] h-4 rounded-full w-full"></div>
                                    </div>

                                    <div className="flex items-between flex-shrink-0 justify-between md:w-[300px] xl:w-[600px] w-auto">
                                        <div className="flex-shrink-0 md:inline hidden">{t(`projects.${id}.description`)}</div>

                                        <div ref={el => void (bandsLeftRef.current[id] = el)} className="w-full h-4 px-16 opacity-0">
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