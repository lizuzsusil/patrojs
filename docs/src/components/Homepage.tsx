'use client'

import FeaturesSection from "@/components/home/FeaturesSection";
import WhySection from "@/components/home/WhySection";
import ResourceSection from "@/components/home/ResourceSection";
import CommunitySection from "@/components/home/CommunitySection";
import {Footer} from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";

export function Homepage({downloads}: { downloads: number | null }) {
    return (
        <main className="hp-main">
            <HeroSection downloads={downloads}/>
            <FeaturesSection/>
            <WhySection/>
            <ResourceSection/>
            <CommunitySection/>
            <Footer/>
        </main>
    )
}
