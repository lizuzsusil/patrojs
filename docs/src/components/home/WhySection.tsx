import {whyResources} from "@/lib/constants";
import Container from "./Container";
import Reveal from "./motion/Reveal";
import StaggerGrid from "./motion/StaggerGrid";
import StaggerItem from "./motion/StaggerItem";
import SectionHeading from "./SectionHeading";

function WhySection() {
    return (
        <Reveal className="border-b border-(--pjs-section-divider) py-23">
            <Container>
                <SectionHeading eyebrow="Why PatroJS" title="Built for the Nepali calendar ecosystem" subtitle="Developer-first experience for web applications." />
                <StaggerGrid
                    className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-(--pjs-section-grid-border) bg-(--pjs-section-grid-bg) sm:grid-cols-1 lg:grid-cols-2">
                    {whyResources.map((item) => (
                        <StaggerItem key={item.title} className="dark:bg-[#111] bg-white p-5">
                            <div className="text-(--pjs-section-text-secondary)">{item.icon}</div>
                            <h3 className="mt-3 text-sm font-medium text-(--pjs-section-text-primary)">{item.title}</h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-(--pjs-section-text-secondary)">{item.text}</p>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </Container>
        </Reveal>
    );
}

export default WhySection;