'use client'

import React from "react";
import { Button } from "@/app/components/button";

type ContactModalProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Footer = ({setOpen}: ContactModalProps) => {

    return (
        <div className={"items-center md:flex hidden justify-between w-full px-12 py-3"}>
            <div className={"flex gap-6 items-center"}>
                <Button text={"Hire us"} icon={"mail"} func={() => {setOpen(true)}} />
                <Button text={"Schedule call"} icon={"phone"} func={() => {}} />
                <img className={"lg:flex hidden xl:text-sm text-xs"} src={"/icons/arrow.svg"} alt="arrow" />
                <p className={"lg:flex hidden"}>Let's build a website together.</p>
            </div>
            <div className={"flex gap-6 items-center"}>
                <p className={"lg:flex hidden"}>_ Made by Facile. Studio @ 2025</p>
                <a href={"https://www.dribbble.com/webbygian"}><img src={"/icons/dribbble.svg"} alt={"dribbble"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                <a href={"https://www.github.com/saravenpi"}><img src={"/icons/github.svg"} alt={"github"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                <a href={"https://www.instagram.com/webbygian"}><img src={"/icons/instagram.svg"} alt={"instagram"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
            </div>
        </div>
    )
}

export default Footer;