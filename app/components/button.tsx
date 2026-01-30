import {useParams, usePathname, useRouter} from "next/navigation";
import { RideauxOut} from "@/app/components/rideaux";
import React from "react";

type ButtonProps = {
    href?: string;
    text: string;
    icon: string;
    func?: () => void;
};

export const Button = ({ text, icon, func }: ButtonProps) => {
    return (
        <div
            onClick={func}
            className="
                bg-[#CAE6D8] hover:bg-[#1E1E1E]
                text-[#1E1E1E] hover:text-[#CAE6D8]
                border-2 border-[#1E1E1E]/33 rounded-full
                px-6 py-3
                duration-150 transition-colors
                flex gap-2 items-center
                cursor-pointer
                group
            "
        >
            <div 
                className="w-6 h-6 bg-[#1E1E1E] group-hover:bg-[#CAE6D8] transition-colors duration-150"
                style={{
                    WebkitMaskImage: `url(/icons/${icon}.svg)`,
                    maskImage: `url(/icons/${icon}.svg)`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                }}
            />
            <span>{text}</span>
        </div>
    );
};

export const LogoButton = () => {
    const params = useParams();
    const router = useRouter();
    const pathName = usePathname();
    const locale = params.locale as string;
    const href = `/${locale}`;

    return (
        <button
            className={"cursor-pointer"}
            onClick={() => {
                if (pathName !== href)
                    RideauxOut({href, router})
            }}
        >
            <img src={"/icons/F..svg"} alt={"Home logo"} width={28} height={28} />
        </button>
    )
}

export const TransitionButton = ({href, text, icon}: ButtonProps ) => {
    const router = useRouter();
    const pathName = usePathname();
    if (!href)
        return null;
    return (
        <div
            onClick={() => {
                if (pathName !== href)
                    RideauxOut({href, router})
            }}
            className="
                bg-[#CAE6D8] hover:bg-[#1E1E1E]
                text-[#1E1E1E] hover:text-[#CAE6D8]
                border-2 border-[#1E1E1E]/33 rounded-full
                px-6 py-3
                duration-150 transition-colors
                flex gap-2 items-center
                cursor-pointer
                group
            "
        >
            <div 
                className="w-6 h-6 bg-[#1E1E1E] group-hover:bg-[#CAE6D8] transition-colors duration-150"
                style={{
                    WebkitMaskImage: `url(/icons/${icon}.svg)`,
                    maskImage: `url(/icons/${icon}.svg)`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                }}
            />
            <span>{text}</span>
        </div>
    );
}