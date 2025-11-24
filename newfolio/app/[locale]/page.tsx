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
    const stack = React.useRef<HTMLDivElement>();
    const background = React.useRef<HTMLDivElement>();
    const title = React.useRef<HTMLDivElement>(null);
    const tl = gsap.timeline({})

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            let value = 0;
            const duration = 1000;
            const step = 1000 / 60;
            const increment = 100 / (duration / step);

            const interval = setInterval(() => {
                value += increment;
                if (value >= 100) {
                    value = 100;
                    clearInterval(interval);
                    setStart(true);
                }
                setPercent(Math.floor(value));
            }, step);
        }, 500);

        return () => clearTimeout(timeout);
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
                .to(background.current, {
                    delay: 0.2,
                    duration: 3,
                    ease: "power4.inOut",
                    scale: 1,
                    filter: "blur(0px)"
                }, "<")
                .to(stack.current, {
                    height:0,
                    duration: 1.5,
                    ease: "power4.inOut",
                }, "<")
                .set(stack.current, {
                    display: "none"
                });
        };
    }, [start]);

    // Animation infinie sur mobile
    React.useEffect(() => {
        if (title.current && window.innerWidth < 1024) {
            gsap.to(title.current, {
                delay: 3,
                x: "-230%",
                duration: 5,
                ease: "none",
                repeat: -1,
            });
        }
    }, []);

    return (
        <div className="bg-[#CAE6D8] p-4 w-screen h-screen relative tracking-tight overflow-hidden text-[#1E1E1E] flex flex-col gap-3">
            <Header setOpen={setOpen} />

            <div className={"rideaux absolute rounded-b-[64px] top-0 left-0 w-screen overflow-hidden h-screen z-99 bg-[#CAE6D8]"} />
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
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-full h-auto min-h-full object-cover scale-150 blur-3xl"
                />

                <div ref={title} className="absolute -bottom-1 left-0 lg:w-full w-[200%] flex items-start justify-start">
                    <div className="flex shrink-0 gap-12 xl:w-full">
                        <img
                            alt="Facile"
                            src="/icons/FACILE.svg"
                            className="min-h-[400px] xl:min-h-0 object-cover w-full"
                        />
                        {window.innerWidth < 1024 && <img
                            alt="Facile"
                            src="/icons/FACILE.svg"
                            className="min-h-[400px] object-cover"
                        />}
                    </div>
                </div>
            </div>

            <Footer setOpen={setOpen} />
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    );
}