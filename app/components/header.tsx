'use client'
import React from "react";
import { TransitionButton, LogoButton } from "@/app/components/button"
import { useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';

type ContactModalProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const languages = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'de', label: 'DE', flag: '🇩🇪' }
];

const Header = ({setOpen}: ContactModalProps) => {
    const t = useTranslations('common.header');
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const locale = params.locale as string;
    const [openHeader, setOpenHeader] = React.useState(false);
    const [openLangDropdown, setOpenLangDropdown] = React.useState(false);

    const currentLang = languages.find(lang => lang.code === locale) || languages[0];

    const switchLanguage = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
        setOpenLangDropdown(false);
    };

    return (
        <div className={"z-99 absolute w-full top-0"}>
            <div className={"absolute top-0 left-1/2 -translate-x-1/2 z-50 lg:flex hidden items-start"}>
                <img src={"/icons/Exclude.svg"} alt={""} className={"lg:mt-4 md:mt-2 mt-2"} width={32} height={32} />

                <div className={"lg:px-8 px-6 lg:py-4 py-3 bg-[#CAE6D8] flex items-center lg:space-x-6 space-x-4 shrink-0 rounded-b-4xl"}>
                    <LogoButton />
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenLangDropdown(!openLangDropdown)}
                            className="border-2 border-transparent hover:border-[#1E1E1E]/50 rounded-full lg:px-3 lg:py-2 duration-150 transition-colors flex gap-2 items-center cursor-pointer"
                        >
                            <span>{currentLang.flag}</span>
                        </button>

                        {openLangDropdown && (
                            <div className="absolute top-full mt-2 bg-[#CAE6D8] rounded-2xl border-2 border-[#1E1E1E]/20 overflow-hidden min-w-30">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => switchLanguage(lang.code)}
                                        className={`w-full px-4 py-2 flex gap-2 items-center hover:bg-[#1E1E1E]/10 transition-colors ${
                                            lang.code === locale ? 'bg-[#1E1E1E]/10 font-semibold' : ''
                                        }`}
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <TransitionButton text={t('portfolio')} icon={"projects"} href={`/${locale}/portfolio`} />
                    <TransitionButton text={t('aboutUs')} icon={"us"} href={`/${locale}/us`} />

                </div>

                <img src={"/icons/Exclude.svg"} alt={""} className={"scale-x-[-1] lg:mt-4 md:mt-2 mt-2"} width={32} height={32} />
            </div>

            <div className={"absolute top-0 right-0 flex flex-col items-end justify-end z-50 lg:hidden"}>
                <div className={"p-6 pr-10 bg-[#CAE6D8] rounded-bl-4xl"}>
                    <button className="cursor-pointer" onClick={() => {sm:
                        setOpenHeader(true);
                    }}>
                        <img src={"/icons/menu.svg"} alt={"Home logo"} width={20} height={20} />
                    </button>
                </div>
                <img src={"/icons/Exclude.svg"} alt={""} className={"mr-2"} width={28} height={28} />
                {openHeader &&
                    <div className="fixed inset-0 z-50 bg-[#111111]/75 flex items-center justify-center">
                        <div className="bg-[#CAE6D8] p-16 px-24 rounded-4xl flex flex-col items-center gap-8 text-[#1e1e1e] relative">
                            <button
                                onClick={() => setOpenHeader(false)}
                                className="absolute top-8 left-8 cursor-pointer text-[#1E1E1E]" >
                                <img src={"/icons/arrow.svg"} alt="arrow" width={20} height={20} />
                            </button>
                            <a href={`/${locale}`}>{t('home')}</a>
                            <a href={`/${locale}/portfolio`}>{t('portfolio')}</a>
                            <a href={`/${locale}/us`}>{t('aboutUs')}</a>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setOpenHeader(false);
                                }}
                                className={"w-auto"}
                            >
                                {t('contactUs')}
                            </button>

                            {/* Language Selector Mobile */}
                            <div className="flex gap-2 pt-4 border-t border-[#1E1E1E]/20">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            switchLanguage(lang.code);
                                            setOpenHeader(false);
                                        }}
                                        className={`px-3 py-2 rounded-full transition-colors ${
                                            lang.code === locale
                                                ? 'bg-[#1E1E1E] text-[#CAE6D8]'
                                                : 'bg-[#1E1E1E]/10 hover:bg-[#1E1E1E]/20'
                                        }`}
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header;