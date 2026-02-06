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
    const [selectedWorkId, setSelectedWorkId] = React.useState<number | null>(null);
    const title = useRef<HTMLDivElement>(null);
    const bandsRightRef = useRef<(HTMLDivElement | null)[]>([]);
    const bandsLeftRef  = useRef<(HTMLDivElement | null)[]>([]);
    const backgroundRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isDesktop, setIsDesktop] = React.useState(false);
    const [innerHeight, setInnerHeight] = React.useState<number>(0)
    const [innerWidth, setInnerWidth] = React.useState<number>(0)

    React.useEffect(() => {
        RideauxIn(0);
    }, [])

    // Gérer le responsive
    React.useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth)
            setInnerHeight(window.innerHeight)
            setIsDesktop(window.innerWidth >= 1024);
        };

        // Initialiser la valeur
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (title.current) {
            if (!isDesktop) {
                // Lancer l'animation sur mobile
                gsap.to(title.current, {
                    delay: 0,
                    x: "-2000%",
                    duration: 133,
                    ease: "none",
                    repeat: -1,
                });
            } else {
                // Arrêter et réinitialiser l'animation sur desktop
                gsap.killTweensOf(title.current);
                gsap.set(title.current, { x: 0 });
            }
        }

        // Cleanup: tuer l'animation quand le composant se démonte
        return () => {
            if (title.current) {
                gsap.killTweensOf(title.current);
            }
        };
    }, [isDesktop]);

    // Trigger animations when selectedWorkId changes
    React.useEffect(() => {
        if (selectedWorkId !== null) {
            // Show animations
            gsap.to([bandsRightRef.current[selectedWorkId], bandsLeftRef.current[selectedWorkId]], {
                opacity: 1,
                duration: 0.2,
                ease: "power2.inOut",
            });
            gsap.to(backgroundRef.current[selectedWorkId], {
                zIndex:1,
                opacity: 1,
                duration:0.3,
                ease: "power3.out",
                onComplete: () => {
                    gsap.set(backgroundRef.current[selectedWorkId], {
                        zIndex: 1,
                    })
                }
            })
        }

        // Cleanup previous selection
        return () => {
            if (selectedWorkId !== null) {
                gsap.to([bandsRightRef.current[selectedWorkId], bandsLeftRef.current[selectedWorkId]], {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                });
                gsap.to(backgroundRef.current[selectedWorkId], {
                    opacity: 0,
                    duration:0.3,
                    ease: "power3.out",
                    onComplete: () => {
                        gsap.set(backgroundRef.current[selectedWorkId], {
                            zIndex: 0,
                        })
                    }
                })
            }
        };
    }, [selectedWorkId]);

    function handlePrevious() {
        setSelectedWorkId((prev) => {
            if (prev === null || prev === 0) return data.length - 1;
            return prev - 1;
        });
    };

    function handleNext() {
        setSelectedWorkId((prev) => {
            if (prev === null || prev === data.length - 1) return 0;
            return prev + 1;
        });
    };

    const ProjectsButton = () => {
        return (
            <div className="flex flex-col w-full z-50 shrink-0">
                {data.map((item, id) => {
                    return (
                        <a
                            href={item.link}
                            key={id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${id === selectedWorkId && "uppercase font-extrabold"} flex justify-between items-center shrink-0
                                cursor-pointer hover:font-extrabold hover:uppercase duration-100 transition-all px-4 py-1.5 sm:py-3`}
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
                            <div className="shrink-0">{t(`projects.${id}.name`)}</div>
                                <div ref={el => void (bandsRightRef.current[id] = el)} className={`${innerWidth <= 600 && "none" } w-full h-4 lg:px-16 px-4 opacity-0`}>
                                    <div className="bg-[#CAE6D8] h-4 rounded-full w-full"></div>
                                </div>

                            <div className="flex shrink-0 justify-between items-center md:w-60 xl:w-150 w-auto">
                                <div className={`shrink-0 md:inline hidden ${innerWidth <= 600 && "none w-0" } `} >{t(`projects.${id}.description`)}</div>

                                <div ref={el => void (bandsLeftRef.current[id] = el)} className={`w-full ${innerWidth <= 600 && "none w-0" } h-4 lg:px-16 px-4 opacity-0`}>
                                    <div className="bg-[#CAE6D8] h-4 rounded-full w-full"></div>
                                </div>

                                <div className="shrink-0">{item.weeks}</div>
                            </div>
                        </a>
                    )
                })}
            </div>
        )
    }

    const MobileButtons = () => {
        return (
            <div className="lg:hidden flex flex-col items-center justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                    {data.map((_, id) => (
                        <button
                            key={id}
                            onClick={() => setSelectedWorkId(id)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                selectedWorkId === id
                                    ? 'w-8 bg-[#CAE6D8]'
                                    : 'w-2 bg-[#CAE6D8]/40'
                            }`}
                            aria-label={`Go to work ${id + 1}`}
                        />
                    ))}
                </div>

                <div className={"flex gap-2"}>
                    <button
                        onClick={handlePrevious}
                        className="p-3 rounded-full bg-[#CAE6D8]/10 border border-[#CAE6D8]/30 text-[#CAE6D8] active:scale-95 transition-all duration-200"
                        aria-label="Previous work"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full bg-[#CAE6D8]/10 border border-[#CAE6D8]/30 text-[#CAE6D8] active:scale-95 transition-all duration-200"
                        aria-label="Next work"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative bg-[#CAE6D8] p-3 xl:p-4  w-screen h-screen overflow-hidden tracking-tight text-[#1E1E1E] text-lg flex flex-col gap-3">
            <div className={"rideaux absolute rounded-b-[64px] top-0 left-0 w-screen h-screen z-10 bg-[#CAE6D8]"} />
            <Header setOpen={setOpen} />
            <div className="w-full overflow-hidden h-full relative rounded-4xl">
                {data.map((item, id) => {
                    if (item.name === "Brain.h")
                        return <div style={{ backgroundImage: `url(/Backgrounds/${item.name}.webp)`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", }}
                                    ref={el => { backgroundRef.current[id] = el; }} key={id}
                                    className="absolute top-0 left-0 opacity-0 w-full h-full object-cover"
                        />
                    
                    return (
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
                    )
                })}
                <div
                    style={{
                        backgroundImage: 'url("/Backgrounds/blurBackground.png")',
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-1/2 z-0 w-full h-auto min-h-full object-cover"
                />
                <div ref={title} className="absolute lg:-bottom-12 z-50 -bottom-6 left-0 lg:w-full w-[200%] flex items-start justify-start">
                    <div className="flex shrink-0 gap-12 xl:w-full max-w-575 relative">
                    {!isDesktop ? (
                        innerHeight > 650 ? (
                            Array.from({ length: 20 }).map((_, i) => (
                                <img
                                    key={i}
                                    alt="Works"
                                    src="/icons/Works.svg"
                                    className="max-h-50 object-cover"
                                />
                            ))
                        ) : null
                    ) : (
                        <img
                            alt="Facile"
                            src="/icons/Works.svg"
                            className="min-h-100 xl:min-h-0 object-cover w-full"
                        />
                    )}
                    </div>
                </div>

                <div
                    className="my-auto lg:top-1/3 lg:-translate-y-1/2 top-0 mt-20 lg:mt-0 flex flex-col relative w-full md:px-32 px-8 text-[#CAE6D8] lg:gap-16 gap-6 z-40">
                    <div className="flex justify-between px-4 font-extrabold">
                        {t('headers.name')}
                        <div className="flex items-between justify-between md:w-100 xl:w-150 w-auto">
                            <div className={"md:inline hidden"}>{t('headers.type')}</div>
                            <div>{t('headers.time')}</div>
                        </div>  
                    </div>


                    <ProjectsButton />

                    <MobileButtons />
                    
                </div>
            </div>

            <Footer setOpen={setOpen}/>
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    )
}