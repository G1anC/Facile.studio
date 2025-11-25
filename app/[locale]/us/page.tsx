'use client'

import Image from "next/image";
import Footer from "@/app/components/footer";
import ContactModal from "@/app/components/contactModal";
import React from "react";
import Header from "@/app/components/header";
import {RideauxIn} from "@/app/components/rideaux";
import {useTranslations} from 'next-intl';

const Box = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={"p-8 bg-[#CAE6D8]/10 rounded-[20px] hover:shadow-[inset_0_0_40px_0_#CAE6D815] border text-[#CAE6D8]/66 border-[#CAE6D8]/33 flex flex-col gap-6 duration-300 transition-all hover:text-[#CAE6D8]"}>
            {children}
        </div>
    )
}

export default function AboutPage() {
    const [open, setOpen] = React.useState(false);
    const t = useTranslations('about');

    React.useEffect(() => {
        RideauxIn(0);
    }, [])

    return (
        <div className="relative bg-[#CAE6D8] p-4 w-screen h-screen overflow-hidden tracking-tight text-[#1E1E1E] flex whitespace-pre-line flex-col gap-3">
            <div className={"rideaux absolute rounded-b-[64px] top-0 left-0 w-screen h-screen z-999 bg-[#CAE6D8]"} />
            <Header setOpen={setOpen} />

            <div
                style={{
                    backgroundImage: 'url("/Backgrounds/blurBackground.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
                className="w-full h-full flex flex-col items-center justify-start text-[#CAE6D8] leading-[110%] text-sm md:text-lg tracking-tight overflow-x-hidden overflow-y-auto relative rounded-[32px]">

                {/* ABOUT FACILE */}
                <section className="w-full max-w-3xl z-10 py-20 mt-64 pb-16 flex flex-col gap-5 items-center text-center">
                    <div className={"flex lg:flex-row flex-col items-center justify-center lg:gap-8 overflow-visible"}>
                        <h1 className="text-[90px] leading-[100%] font-extrabold shrink-0">
                            {t('title')}
                        </h1>
                        <div className={"pb-2 shrink-0 min-w-[300px]"}>
                            <img src={"/icons/FACILE Text.svg"} className={"w-[310px]"} alt={"logo"} />
                        </div>
                    </div>
                    <p className="max-w-2xl text-[#CAE6D8]/66">
                        {t('subtitle')}
                    </p>

                    {/* OUR MISSION */}
                    <div className={"flex flex-col md:flex-row gap-8 py-20 items-center justify-between w-full "}>
                        <div className={"flex flex-col items-start justify-start"}>
                            <h1 className="text-3xl font-extrabold mb-5 text-start">
                                {t('mission.title')}
                            </h1>
                            <p className="max-w-sm text-justify text-normal">
                                {t('mission.text')}
                            </p>
                        </div>

                        <Box>
                            <>
                                <div className={"text-xl font-extrabold leading-[110%] text-[#CAE6D8] text-start"}>
                                    {t('whatSetsUsApart.title')}
                                </div>
                                <ul className="list-disc pl-2 text-start">
                                    <li className={"mt-1"}>{t('whatSetsUsApart.items.0')}</li>
                                    <li className={"mt-1"}>{t('whatSetsUsApart.items.1')}</li>
                                    <li className={"mt-1"}>{t('whatSetsUsApart.items.2')}</li>
                                    <li className={"mt-1"}>{t('whatSetsUsApart.items.3')}</li>
                                </ul>
                            </>
                        </Box>
                    </div>
                </section>

                {/* SERVICES */}
                <section className="w-full max-w-5xl px-6 py-20 z-10 flex flex-col items-center justify-center gap-6">
                    <div className={"text-center"}>
                        <h1 className="text-3xl font-extrabold">
                            {t('services.title')}
                        </h1>
                        <p className="text-[#CAE6D8]/66 mt-5 text-center">
                            {t('services.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <Box>
                            <Image src={"/icons/style.svg"} alt={"logo"} width={20} height={20} />
                            <h3 className="text-xl font-extrabold leading-[110%] text-[#CAE6D8]">{t('services.design.title')}</h3>
                            <p className="">
                                {t('services.design.description')}
                            </p>
                            <ul className="list-disc pl-2 text-start">
                                <li className={"mt-1"}>{t('services.design.items.0')}</li>
                                <li className={"mt-1"}>{t('services.design.items.1')}</li>
                                <li className={"mt-1"}>{t('services.design.items.2')}</li>
                            </ul>
                        </Box>

                        <Box>
                            <Image src={"/icons/web.svg"} alt={"logo"} width={20} height={20} />
                            <h3 className="text-xl font-extrabold leading-[110%] text-[#CAE6D8]">{t('services.uiux.title')}</h3>
                            <p className="">
                                {t('services.uiux.description')}
                            </p>
                            <ul className="list-disc pl-2 text-start">
                                <li className={"mt-1"}>{t('services.uiux.items.0')}</li>
                                <li className={"mt-1"}>{t('services.uiux.items.1')}</li>
                                <li className={"mt-1"}>{t('services.uiux.items.2')}</li>
                            </ul>
                        </Box>

                        <Box>
                            <Image src={"/icons/code.svg"} alt={"logo"} width={20} height={20} />
                            <h3 className="text-xl font-extrabold leading-[110%] text-[#CAE6D8]">{t('services.webapp.title')}</h3>
                            <p className="">
                                {t('services.webapp.description')}
                            </p>
                            <ul className="list-disc pl-2 text-start">
                                <li className={"mt-1"}>{t('services.webapp.items.0')}</li>
                                <li className={"mt-1"}>{t('services.webapp.items.1')}</li>
                                <li className={"mt-1"}>{t('services.webapp.items.2')}</li>
                            </ul>
                        </Box>
                    </div>
                </section>

                {/* TEAM */}
                <section className="w-full max-w-4xl px-6 py-20 z-10 flex flex-col items-center justify-center gap-6">
                    <div className={"text-center"}>
                        <h1 className="text-3xl font-extrabold">
                            {t('team.title')}
                        </h1>
                        <p className="text-[#CAE6D8]/66 mt-5 text-center">
                            {t('team.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <Box>
                            <div>
                                <Image src={"/icons/yann.svg"} alt={"logo"} width={64} height={64} />
                                <h3 className="text-3xl font-extrabold leading-[110%] text-[#CAE6D8] mt-3">{t('team.yann.name')}</h3>
                                <p className=" mt-3">
                                    {t('team.yann.role')}
                                </p>
                            </div>
                            <p className=" mt-6">
                                {t('team.yann.description')}
                            </p>
                            <div className={"flex items-center justify-start gap-6"}>
                                <a href={"https://linkedin.com/in/thevyann"} target="_blank" rel="noopener noreferrer">
                                    <img src={"/icons/linkedIn.svg"} alt={"linkedIn"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} />
                                </a>
                                <a href={"https://www.github.com/saravenpi"} target="_blank" rel="noopener noreferrer">
                                    <img src={"/icons/githubWhite.svg"} alt={"github"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} />
                                </a>
                            </div>
                        </Box>

                        <Box>
                            <div className={""}>
                                <Image src={"/icons/noah.svg"} alt={"logo"} width={64} height={64} />
                                <h3 className="text-3xl font-extrabold leading-[110%] text-[#CAE6D8] mt-4">{t('team.noah.name')}</h3>
                                <p className="text-start mt-4">
                                    {t('team.noah.role')}
                                </p>
                            </div>
                            <p className=" mt-6">
                                {t('team.noah.description')}
                            </p>
                            <div className={"flex items-center justify-start gap-6 mt-3"}>
                                <a href={"https://www.dribbble.com/webbygian"} target="_blank" rel="noopener noreferrer">
                                    <img src={"/icons/dribbbleWhite.svg"} alt={"dribbble"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} />
                                </a>
                                <a href={"https://www.github.com/G1anC"} target="_blank" rel="noopener noreferrer">
                                    <img src={"/icons/githubWhite.svg"} alt={"github"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} />
                                </a>
                                <a href={"https://www.instagram.com/webbygian"} target="_blank" rel="noopener noreferrer">
                                    <img src={"/icons/instagramWhite.svg"} alt={"instagram"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} />
                                </a>
                            </div>
                        </Box>
                    </div>
                </section>

                {/* TECHNOLOGIES */}
                <section className="w-full max-w-4xl px-6 py-20 z-10 flex flex-col items-center justify-center gap-6">
                    <div className={"text-center"}>
                        <h1 className="text-3xl font-extrabold">
                            {t('technologies.title')}
                        </h1>
                        <p className="text-[#CAE6D8]/66 mt-5 text-center">
                            {t('technologies.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-6 gap-3 mt-8 w-full text-center">
                        {['gsap', 'typescript', 'vue', 'react', 'go', 'sveltekit'].map((tech) => (
                            <Box key={tech}>
                                <div className={"w-full h-16 flex flex-col justify-between items-center"}>
                                    <Image
                                        src={`/icons/${tech}.svg`}
                                        alt={tech}
                                        width={tech === 'gsap' ? 38 : tech === 'go' ? 32 : tech === 'sveltekit' ? 16 : 20}
                                        height={20}
                                    />
                                    <p>{t(`technologies.items.${tech}`)}</p>
                                </div>
                            </Box>
                        ))}
                    </div>
                </section>

            </div>

            <Footer setOpen={setOpen}/>
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    );
}