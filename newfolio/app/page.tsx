'use client'

import Image from "next/image";
import Button from "@/app/components/button";
import Footer from "@/app/components/footer";
import React from "react";
import ContactModal from "@/app/components/contactModal";

export default function Home() {
    const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-[#CAE6D8] sm:p-4 p-2 w-screen h-screen text-[#1E1E1E] flex flex-col gap-3">
        <div className={"w-full overflow-hidden h-full relative rounded-[32px]"}>
            <img
                    alt="background"
                    src="/Backgrounds/background.png"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-full h-auto min-h-full object-cover"
                />
                <img
                    alt="Facile"
                    src="/icons/FACILE.svg"
                    className="absolute bottom-0 w-full left-0"
                />
        </div>

        <Footer setOpen={setOpen}/>
        <ContactModal open={open} setOpen={setOpen} />
    </div>
  );
}
