'use client'

import FeaturesSection from "@/components/home/FeaturesSection";
import WhySection from "@/components/home/WhySection";
import ResourceSection from "@/components/home/ResourceSection";
import CommunitySection from "@/components/home/CommunitySection";
import {Footer} from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";

export type HomepageProps = Record<'downloads' | 'version', number | null | undefined>

export function Homepage(props: HomepageProps) {
    return (
        <main className="hp-main">
            <HeroSection {...props} />
            <FeaturesSection/>
            <WhySection/>
            <ResourceSection/>
            <CommunitySection/>
            <Footer/>
        </main>
    )
}
