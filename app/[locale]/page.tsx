'use client'

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import React from "react";
import ContactModal from "@/app/components/contactModal";
import gsap from "gsap";
import { RideauxIn } from "@/app/components/rideaux";
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('home');
    const [start, setStart] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const [isDesktop, setIsDesktop] = React.useState(false);
    const stack = React.useRef<HTMLDivElement>(null);
    const background = React.useRef<HTMLImageElement>(null);
    const title = React.useRef<HTMLDivElement>(null);
    const tl = gsap.timeline({})

    // Preload assets
    React.useEffect(() => {
        const assetsToLoad = [
            "/Backgrounds/background.png",
            "/icons/F..svg",
            "/icons/FACILE.svg"
        ];

        let loadedCount = 0;
        const totalAssets = assetsToLoad.length;

        const updateProgress = () => {
            loadedCount++;
            const progressPercent = Math.floor((loadedCount / totalAssets) * 100);
            setPercent(progressPercent);

            if (loadedCount === totalAssets) {
                // Small delay after all assets loaded
                setTimeout(() => {
                    setStart(true);
                }, 300);
            }
        };

        // Preload images
        assetsToLoad.forEach((src) => {
            const img = new Image();
            img.onload = updateProgress;
            img.onerror = updateProgress; // Continue even if an asset fails
            img.src = src;
        });

        // Fallback: if assets take too long (>5s), start anyway
        const fallbackTimeout = setTimeout(() => {
            if (!start) {
                setPercent(100);
                setStart(true);
            }
        }, 1000);

        return () => clearTimeout(fallbackTimeout);
    }, []);

    React.useEffect(() => {
        RideauxIn(2.4)
        if (start) {
            tl
                .to(".disappear", {
                    delay: 0.2,
                    stagger: 0.1,
                    y: "-110%",
                    duration: 1,
                    ease: "power2.inOut",
                })
                .to(stack.current, {
                    height:0,
                    duration: 1.5,
                    ease: "power4.inOut",
                }, "<")
                .to(background.current, {
                    delay: 0.2,
                    duration: 3,
                    ease: "power4.inOut",
                    scale: 1,
                    filter: "blur(0px)"
                }, "<")
                .set(stack.current, {
                    display: "none"
                });
        };
    }, [start]);

    // Gérer le responsive
    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (title.current) {
            if (!isDesktop) {
                gsap.to(title.current, {
                    delay: 3,
                    x: "-2000%",
                    duration: 133,
                    ease: "none",
                    repeat: -1,
                });
            } else {
                gsap.killTweensOf(title.current);
                gsap.set(title.current, { x: 0 });
            }
        }

        return () => {
            if (title.current) {
                gsap.killTweensOf(title.current);
            }
        };
    }, [isDesktop]);

    return (
        <div className="bg-[#CAE6D8] p-3 xl:p-4 w-screen h-screen relative tracking-tight overflow-hidden text-[#1E1E1E] flex flex-col gap-3">
            <Header setOpen={setOpen} />

            <div className={"rideaux absolute rounded-b-[64px] top-0 left-0 w-screen overflow-hidden h-screen z-999 bg-[#CAE6D8]"} />
            <div ref={stack} className={"absolute rounded-b-[64px] top-0 left-0 w-screen overflow-hidden h-screen z-999 flex flex-col gap-8 items-center justify-center"}>
                <div className={"overflow-hidden"}>
                    <img src={"/icons/F..svg"} alt="" className={"w-24 disappear"} />
                </div>

                <div className={"overflow-hidden"}>
                    <div className="font-extrabold disappear">
                        {percent}%
                    </div>
                </div>

                <div className={"gap-0"}>
                    <div className="overflow-hidden">
                        <div className={"opacity-66 text-center disappear"}>
                            {t('loading.line1')}
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div className={"opacity-66 text-center disappear"}>
                            {t('loading.line2')}
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w-full overflow-hidden bg-[#1E1E1E] h-full relative rounded-[32px]"}>
                <img ref={background}
                     alt="background"
                     src="/Backgrounds/background.png"
                     className="absolute top-1/2 left-1/2 -translate-1/2
                       w-full h-auto min-h-full object-cover scale-150 blur-3xl"
                />

                <div ref={title} className="absolute -bottom-1 left-0 lg:w-full w-[200%] flex items-start justify-start">
                    <div className="flex shrink-0 gap-12 xl:w-full relative">
                        <img
                            alt="Facile"
                            src="/icons/FACILE.svg"
                            className="min-h-[400px] xl:min-h-0 object-cover w-full"
                        />
                        {isDesktop ? (
                            <div className={"top-0 right-0 mr-[7%] fixed text-[#CAE6D8] font-extrabold text-5xl"}>
                                STUDIO
                            </div>
                        ) : (
                            Array.from({ length: 20 }).map((_, i) => (
                                <img
                                    key={i}
                                    alt="Facile"
                                    src="/icons/FACILE.svg"
                                    className="min-h-[400px] object-cover"
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Footer setOpen={setOpen} />
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    );
}