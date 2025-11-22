'use client'

import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const RideauxIn = (delayValue: number) => {
    gsap.to(".rideaux", {
        height: 0,

        duration: 2,
        delay: delayValue,
        ease: "power4.inOut",
    })
}

export const RideauxOut = ({href, router}: {href: string, router: AppRouterInstance}) => {
    gsap.fromTo(".rideaux", {
        height: 0,
        top: "100%",
    }, {
        height: "100%",
        top: 0,

        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
            router.push(href)
        }
    })
}
