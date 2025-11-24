'use client'

import React from "react";
import { Button } from "@/app/components/button";
import { useTranslations } from 'next-intl';

type ContactModalProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Footer = ({setOpen}: ContactModalProps) => {
    const t = useTranslations('common');

    return (
        <div className={"items-center md:flex hidden justify-between w-full px-12 py-3"}>
            <div className={"flex gap-6 items-center"}>
                <Button text={t('footer.hireUs')} icon={"mail"} func={() => {setOpen(true)}} />
                <a
                    href={"tel:+33768884818"}
                    className="
                        bg-[#CAE6D8] hover:bg-[#1E1E1E]
                        text-[#1E1E1E] hover:text-[#CAE6D8]
                        border-2 border-[#1E1E1E]/50 rounded-full
                        px-6 py-3
                        duration-150 transition-colors
                        flex gap-2 items-center
                        cursor-pointer
                    "
                >
                    <img src={`/icons/phone.svg`} alt={"phone"} width={20} height={20} />
                    <span>{t('footer.callUs')}</span>
                </a>
                <img className={"lg:flex hidden xl:text-sm text-xs"} src={"/icons/arrow.svg"} alt="arrow" />
                <p className={"lg:flex hidden"}>{t('footer.buildTogether')}</p>
            </div>
            <div className={"flex gap-6 items-center"}>
                <p className={"lg:flex hidden"}>{t('footer.madeBy')}</p>
                <a href={"https://www.dribbble.com/webbygian"}><img src={"/icons/dribbble.svg"} alt={"dribbble"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                <a href={"https://www.github.com/saravenpi"}><img src={"/icons/github.svg"} alt={"github"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                <a href={"https://www.instagram.com/webbygian"}><img src={"/icons/instagram.svg"} alt={"instagram"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
            </div>
        </div>
    )
}

export default Footer;