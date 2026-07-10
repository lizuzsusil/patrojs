'use client';

import Reveal from "./motion/Reveal"
import SectionHeading from "./SectionHeading"
import {Icons} from "@/lib/icons"
import {features} from "@/lib/constants"
import StaggerGrid from "./motion/StaggerGrid"
import StaggerItem from "./motion/StaggerItem"
import Container from "@/components/home/Container";

function FeaturesSection() {
    return (
        <Reveal id="features" className="border-b border-(--pjs-section-divider) py-23 bg-(--pjs-section-alt-bg) dark:bg-[linear-gradient(360deg,#09090b_40%,#111111)] border-t">
            <Container>
                <SectionHeading
                    eyebrow="Features"
                    title="Everything for Bikram Sambat date handling"
                    subtitle="A complete calendar engine and a thin, ergonomic React API on top of it."
                />
                <StaggerGrid
                    className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-(--pjs-section-grid-border) bg-(--pjs-section-grid-bg) sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <StaggerItem key={f.title} className="bg-(--pjs-section-bg) p-5">
                            <div className="text-(--pjs-section-text-secondary)">{Icons[f.icon]}</div>
                            <h3 className="mt-3 text-sm font-medium text-(--pjs-section-text-primary)">{f.title}</h3>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-(--pjs-section-text-muted)">{f.description}</p>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </Container>
        </Reveal>
    )
}

export default FeaturesSection;