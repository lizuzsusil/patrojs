import Reveal from "@/components/home/motion/Reveal";
import Container from "@/components/home/Container";
import SectionHeading from "@/components/home/SectionHeading";
import StaggerGrid from "@/components/home/motion/StaggerGrid";
import {resources} from "@/lib/constants";
import StaggerItem from "@/components/home/motion/StaggerItem";
import {Icons} from "@/lib/icons";

function ResourceSection() {
    return (
        <Reveal id="resources"
                className="border-b border-(--pjs-section-divider) py-16 bg-(--pjs-section-alt-bg)">
            <Container>
                <SectionHeading eyebrow="Resources" title="Everything in one place"/>
                <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((r) => (
                        <StaggerItem
                            key={r.title}
                            href={r.href}
                            target={r.external ? '_blank' : undefined}
                            rel={r.external ? 'noopener noreferrer' : undefined}
                            className="group flex items-start gap-3 rounded-lg border border-(--pjs-section-card-border) bg-(--pjs-section-card-bg) p-4 transition-colors hover:border-(--pjs-section-card-border-hover) hover:bg-(--pjs-section-card-bg-hover)"
                        >
                            <div className="mt-0.5 text-(--pjs-section-text-muted)">{r.icon}</div>
                            <div className="flex-1">
                                <h3 className="flex items-center justify-between gap-1.5 text-sm font-medium text-(--pjs-section-text-primary)">
                                    {r.title}
                                    {r.external &&
                                        <span className="text-(--pjs-section-text-muted)">{Icons.external}</span>}
                                </h3>
                                <p className="mt-1 text-[13px] text-(--pjs-section-text-muted)">{r.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </Container>
        </Reveal>
    )
}

export default ResourceSection;