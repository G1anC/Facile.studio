'use client'

import Button from "@/app/components/button";
import {redirect} from "next/navigation";
import React from "react";

type ContactModalProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({setOpen}: ContactModalProps) => {
    const [openHeader, setOpenHeader] = React.useState(false);

    return (
        <div className={"z-99 absolute w-full top-0"}>
            <div className={"absolute top-0 left-1/2 -translate-x-1/2 z-50 lg:flex hidden items-start"}>
                <img src={"/icons/Exclude.svg"} alt={""} className={"mt-4"} width={32} height={32} />

                <div className={"px-8 py-4 bg-[#CAE6D8] flex items-center gap-6 rounded-b-[32px]"}>
                    <a href={"/"}><img src={"/icons/F..svg"} alt={"Home logo"} width={28} height={28} /></a>
                    <Button text={"Portfolio"} icon={"folder"} func={() => { redirect("/portfolio") }} />
                    <Button text={"About us"} icon={"us"} func={() => { redirect("/us") }} />
                </div>

                <img src={"/icons/Exclude.svg"} alt={""} className={"scale-x-[-1] mt-4"} width={32} height={32} />
            </div>

            <div className={"absolute top-0 right-0 flex flex-col items-end justify-end z-50 lg:hidden"}>
                <div className={"p-6 pr-10 bg-[#CAE6D8] rounded-bl-[32px]"}>
                    <button className="cursor-pointer" onClick={() => {
                        setOpenHeader(true);
                        console.log(openHeader);
                    }}>
                        <img src={"/icons/menu.svg"} alt={"Home logo"} width={20} height={20} />
                    </button>
                </div>
                <img src={"/icons/Exclude.svg"} alt={""} className={"mr-2"} width={28} height={28} />
                {openHeader &&
                    <div className="fixed inset-0 z-50 bg-[#111111]/75 flex items-center justify-center">
                        <div className="bg-[#CAE6D8] p-16 px-24 rounded-[32px] flex flex-col items-center gap-8 text-[#1e1e1e] relative">
                            <button
                                onClick={() => setOpenHeader(false)}
                                className="absolute top-8 left-8 cursor-pointer text-[#1E1E1E]" >
                                <img src={"/icons/arrow.svg"} alt="arrow" width={20} height={20} />
                            </button>
                            <a href={"/"}>Home</a>
                            <a href={"/portfolio"}>Portfolio</a>
                            <a href={"/us"}>Us</a>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setOpenHeader(false);
                                }}
                                className={"w-auto"}
                            >
                                Contact us
                            </button>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header;