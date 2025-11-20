'use client'

import Button from "@/app/components/button";
import {redirect} from "next/navigation";

const Header = () => {
    return (
        <div className={"absolute top-0 left-1/2 -translate-x-1/2 z-10 flex items-start"}>
            <img src={"/icons/Exclude.svg"} alt={""} className={"mt-4"} width={32} height={32} />
            <div className={"px-8 py-4 bg-[#CAE6D8] flex items-center gap-6 rounded-b-[32px]"}>
                <a href={"/"}><img src={"/icons/F..svg"} alt={"Home logo"} width={28} height={28} /></a>
                <Button text={"Portfolio"} icon={"folder"} func={() => { redirect("/portfolio") }} />
                <Button text={"About us"} icon={"us"} func={() => { redirect("/us") }} />
            </div>
            <img src={"/icons/Exclude.svg"} alt={""} className={"scale-x-[-1] mt-4"} width={32} height={32} />
        </div>
    )
}

export default Header;