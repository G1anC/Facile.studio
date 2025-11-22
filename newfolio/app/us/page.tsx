'use client'

import Image from "next/image";
import Footer from "@/app/components/footer";
import ContactModal from "@/app/components/contactModal";
import React from "react";
import Header from "@/app/components/header";
import {RideauxIn} from "@/app/components/rideaux";

const Box = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={"p-8 bg-[#CAE6D8]/10 rounded-[20px] hover:shadow-[inset_0_0_40px_0_#CAE6D815] border text-[#CAE6D8]/66 border-[#CAE6D8]/33 flex flex-col gap-6 duration-300 transition-all hover:text-[#CAE6D8]"}>
            {children}
        </div>
    )
}

export default function AboutPage() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        RideauxIn(0);
    }, [])

    return (
        <div className="relative bg-[#CAE6D8] p-4 w-screen h-screen overflow-hidden tracking-tight text-[#1E1E1E] flex flex-col gap-3">
            <div className={"rideaux absolute rounded-b-[64px] top-0 left-0 w-screen h-screen z-99 bg-[#CAE6D8]"} />
            <Header setOpen={setOpen} />


            <div
                style={{
                    backgroundImage: 'url("/Backgrounds/blurBackground.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",

                }}
                className="w-full h-full flex flex-col items-center justify-start text-[#CAE6D8] leading-[110%] text-xs md:text-lg tracking-tight overflow-x-hidden overflow-y-auto relative rounded-[32px]">
                <section className="w-full max-w-3xl z-10 py-20 mt-64 pb-16 flex flex-col gap-5 items-center text-center">

                    {/* ABOUT FACILE */}
                    <div className={"flex sm:flex-row flex-col items-center justify-end sm:gap-8"}>
                        <h1 className="text-8xl font-extrabold">
                            ABOUT
                        </h1>
                        <div className={"pb-2"}>
                            <Image src={"/icons/FACILE Text.svg"} alt={"logo"} height={87} width={300} />
                        </div>
                    </div>
                    <p className="max-w-2xl text-[#CAE6D8]/66">
                        Where exceptional design meets<br />
                        technical excellence
                    </p>

                    {/* OUR MISSION */}
                    <div className={"flex flex-col md:flex-row gap-8 py-20 items-center justify-between w-full "}>
                        <div className={"flex flex-col items-start justify-start"}>
                            <h1 className="text-3xl font-extrabold mb-5 text-start">
                                OUR MISSION
                            </h1>
                            <p className="max-w-sm text-justify text-normal">
                                We are a dedicated team specializing in design, branding, and web  development.
                                We create functional, professional websites with a strong  emphasis on UI/UX design that captivates and converts.
                                <br />
                                <br />
                                Our approach combines stunning visual design with robust technical implementation.
                                From brand identity to pixel-perfect interfaces,
                                we craft digital experiences that not only look amazing but perform  flawlessly.
                                <br />
                                <br />
                                We pride ourselves on our commitment to design excellence
                                attention to detail, and creating meaningful user experiences.
                                Whether you're building a brand from scratch or need a website that stands out,
                                we bring creativity and professionalism to every project.
                            </p>
                        </div>

                        <Box>
                            <>
                                <div className={"text-xl font-extrabold leading-[90%] text-[#CAE6D8] text-start"}>
                                    WHAT SETS US<br />APART
                                </div>
                                <ul className="list-disc pl-2 text-start">
                                    <li className={"mt-1"}>Ecological Development</li>
                                    <li className={"mt-1"}>Beautiful & clean code</li>
                                    <li className={"mt-1"}>Collaborative process</li>
                                    <li className={"mt-1"}>Design-first approach</li>
                                </ul>
                            </>
                        </Box>
                    </div>

                </section>

                {/* SKILLS */}
                <section className="w-full max-w-4xl px-6 py-20 z-10  flex flex-col items-center justify-center gap-6">
                    <div className={"text-center"}>
                        <h1 className="text-3xl font-extrabold">
                            OUR SERICES
                        </h1>
                        <p className="text-[#CAE6D8]/66 mt-5 text-center">
                            Where exceptional design meets<br />
                            technical excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <Box>
                            <Image src={"/icons/style.svg"} alt={"logo"} width={20} height={20} />
                            <h3 className="text-xl font-extrabold leading-[90%] text-[#CAE6D8]">DESIGN &<br />BRANDING</h3>
                            <p className="text-justify">
                                Create a compelling brand identity with custom logos, color palettes,  typography, and comprehensive brand guidelines that make your business  memorable.
                            </p>
                            <ul className="list-disc pl-2 text-start">
                                <li className={"mt-1"}>Logo & Visual Identity</li>
                                <li className={"mt-1"}>Brand guidelines</li>
                                <li className={"mt-1"}>Marketing materials</li>
                            </ul>
                        </Box>

                        <Box>
                            <Image src={"/icons/web.svg"} alt={"logo"} width={20} height={20} />
                            <h3 className="text-xl font-extrabold leading-[90%] text-[#CAE6D8]">UI/UX &<br />DEVELOPMENT</h3>
                            <p className="text-justify">
                                Design and build stunning, user-centered websites that combine beautiful aesthetics with exceptional functionality and seamless user  experiences.
                            </p>
                            <ul className="list-disc pl-2 text-start">
                                <li className={"mt-1"}>Pixel-Perfect Design</li>
                                <li className={"mt-1"}>User-Centered UX</li>
                                <li className={"mt-1"}>Responsive & Fast</li>
                            </ul>
                        </Box>

                        <Box>
                            <Image src={"/icons/code.svg"} alt={"logo"} width={20} height={20} />
                            <h3 className="text-xl font-extrabold leading-[90%] text-[#CAE6D8]">WEB<br />APPLICATION</h3>
                            <p className="text-justify">
                                Develop sophisticated web applications with intuitive interfaces, smooth interactions, and powerful functionality that users love to use.
                                </p>
                            <ul className="list-disc pl-2 text-start">
                                <li className={"mt-1"}>Modern Frameworks</li>
                                <li className={"mt-1"}>Smooth Animations</li>
                                <li className={"mt-1"}>Production Ready</li>
                            </ul>
                        </Box>
                    </div>
                </section>

                {/* SKILLS */}
                <section className="w-full max-w-3xl px-6 py-20 z-10  flex flex-col items-center justify-center gap-6">
                    <div className={"text-center"}>
                        <h1 className="text-3xl font-extrabold">
                            OUR TEAM
                        </h1>
                        <p className="text-[#CAE6D8]/66 mt-5 text-center">
                            The creative minds behind Facile.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <Box>
                            <div>
                                <Image src={"/icons/yann.svg"} alt={"logo"} width={64} height={64} />
                                <h3 className="text-3xl font-extrabold leading-[100%] text-[#CAE6D8] mt-3">YANN<br />THEVENIN</h3>
                                <p className="text-justify mt-3">
                                    Lead Developer & Co-Founder
                                </p>
                            </div>
                            <p className="text-justify mt-6">
                                Fullstack developer with an AI background, passionate about creating  exceptional digital experiences with modern technologies, clean code  architecture, and an ecological approach to development.
                            </p>
                            <div className={"flex items-center justify-start gap-6"}>
                                <a href={"https://linkedin.com/in/thevyann"}><img src={"/icons/linkedIn.svg"} alt={"linkedIn"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                                <a href={"https://www.github.com/saravenpi"}><img src={"/icons/githubWhite.svg"} alt={"github"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                            </div>
                        </Box>

                        <Box>
                            <div className={""}>
                                <Image src={"/icons/noah.svg"} alt={"logo"} width={64} height={64} />
                                <h3 className="text-3xl font-extrabold leading-[100%] text-[#CAE6D8] mt-4">NOAH<br />STEINIGER</h3>
                                <p className="text-start mt-4">
                                    UI / Web Designer & Co-founder
                                </p>
                            </div>
                            <p className="text-justify mt-6">
                                Passionate creative UI, web and graphic designer specializing in crafting  beautiful, user-centric designs as well as bringing them to life with modern  web technologies using his development skills.                             </p>
                            <div className={"flex items-center justify-start gap-6 mt-3"}>
                                <a href={"https://www.dribbble.com/webbygian"}><img src={"/icons/dribbbleWhite.svg"} alt={"dribbble"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                                <a href={"https://www.github.com/G1anC"}><img src={"/icons/githubWhite.svg"} alt={"github"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                                <a href={"https://www.instagram.com/webbygian"}><img src={"/icons/instagramWhite.svg"} alt={"instagram"} className={"hover:scale-130 duration-200 transition-all"} width={20} height={20} /></a>
                            </div>
                        </Box>
                    </div>
                </section>

                {/* TECHNOLOGIES */}
                <section className="w-full max-w-4xl px-6 py-20 z-10  flex flex-col items-center justify-center gap-6">
                    <div className={"text-center"}>
                        <h1 className="text-3xl font-extrabold">
                            TECHNOLOGIES WE USE
                        </h1>
                        <p className="text-[#CAE6D8]/66 mt-5 text-center">
                            Modern tools for modern<br/>solutions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-6 gap-3 mt-8 w-full  text-center">
                        <Box>
                            <div className={"w-full h-16 flex flex-col justify-between  items-center"}>
                                <Image src={"/icons/gsap.svg"} alt={"logo"} width={38} height={20} />
                                <p>GSAP</p>
                            </div>
                        </Box>
                        <Box>
                            <div className={"w-full h-16 flex flex-col justify-between  items-center"}>
                                <Image src={"/icons/typescript.svg"} alt={"logo"} width={20} height={20} />
                                <p>Typescript</p>
                            </div>
                        </Box>
                        <Box>
                            <div className={"w-full h-16 flex flex-col justify-between  items-center"}>
                                <Image src={"/icons/vue.svg"} alt={"logo"} width={20} height={20} />
                                <p>Vue.js</p>
                            </div>
                        </Box>
                        <Box>
                            <div className={"w-full h-16 flex flex-col justify-between  items-center"}>
                                <Image src={"/icons/react.svg"} alt={"logo"} width={20} height={20} />
                                <p>React</p>
                            </div>
                        </Box>
                        <Box>
                            <div className={"w-full h-16 flex flex-col justify-between  items-center"}>
                                <Image src={"/icons/go.svg"} alt={"logo"} width={32} height={20} />
                                <p>Golang</p>
                            </div>
                        </Box>
                        <Box>
                            <div className={"w-full h-16 flex flex-col justify-between  items-center"}>
                                <Image src={"/icons/sveltekit.svg"} alt={"logo"} width={16} height={20} />
                                <p>Sveltekit</p>
                            </div>
                        </Box>

                    </div>
                </section>

            </div>

        {/* HERO */}

            <Footer setOpen={setOpen}/>
            <ContactModal open={open} setOpen={setOpen} />
        </div>
    );
}
