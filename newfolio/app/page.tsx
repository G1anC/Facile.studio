'use client'

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import React from "react";
import ContactModal from "@/app/components/contactModal";
import gsap from "gsap";

export default function Home() {
    const [start, setStart] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const rideaux = React.useRef<HTMLDivElement>();
    const background = React.useRef<HTMLDivElement>();
    const tl = gsap.timeline({})
    React.useEffect(() => {
        // Wait 0.2s before starting the counter
        const timeout = setTimeout(() => {
            let value = 0;
            const duration = 1000; // 1 second
            const step = 1000 / 60; // ~60 FPS
            const increment = 100 / (duration / step);

            const interval = setInterval(() => {
                value += increment;

                if (value >= 100) {
                    value = 100;
                    clearInterval(interval);
                    setStart(true); // trigger GSAP HERE (when finished)
                }

                setPercent(Math.floor(value));
            }, step);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    React.useEffect(() => {
        if (start) {
            tl.to(".disappear", {
                delay: 0.5,
                stagger: 0.3,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            }).to(rideaux.current, {
                duration: 2,
                ease: "power2.inOut",
                height: 0,
            }, "<").to(background.current, {
                delay: 0.5,
                duration: 3,
                ease: "power4.out",
                scale: 1,
            }, "<");
        }
    }, [start]);


    return (
        <div className="bg-[#CAE6D8] p-4 w-screen h-screen relative tracking-tight text-[#1E1E1E] flex flex-col gap-3">
            <Header setOpen={setOpen} />
            <div ref={rideaux} className={"absolute rounded-[32px] w-screen h-screen z-99 bg-[#CAE6D8] flex flex-col gap-8 items-center justify-center"}>
                <img src={"/icons/F..svg"} alt="" className={"w-48 disappear"} />

                <div className="font-extrabold disappear">
                    {percent}%
                </div>

                <div className={"opacity-66 text-center leading-[105%] disappear"}>
                    Where exceptional design meets<br/>
                    technical excellence
                </div>
            </div>

            <div className={"w-full overflow-hidden bg-[#1E1E1E] h-full relative rounded-[32px]"}>
                <img ref={background}
                    alt="background"
                    src="/Backgrounds/background.png"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-full h-auto min-h-full object-cover scale-130"
                />

                <img
                    alt="Facile"
                    src="/icons/FACILE.svg"
                    className="absolute bottom-0 w-full left-0"
                />
            </div>

            <Footer setOpen={setOpen} />
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    );
}
