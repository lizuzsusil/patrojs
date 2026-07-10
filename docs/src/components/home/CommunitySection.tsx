import Reveal from "@/components/home/motion/Reveal";
import Container from "@/components/home/Container";
import SectionHeading from "@/components/home/SectionHeading";
import StaggerGrid from "@/components/home/motion/StaggerGrid";
import StaggerItem from "@/components/home/motion/StaggerItem";
import {communityResources} from "@/lib/constants";
import {Icons} from "@/lib/icons";

function CommunitySection() {
    return (
        <Reveal className="py-16">
            <Container>
                <SectionHeading
                    eyebrow="Community"
                    title="Open source, and open to contributions"
                    subtitle="Bug reports, feature requests, and pull requests are all welcome."
                />
                <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {communityResources.map((c) => (
                        <StaggerItem
                            key={c.title}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-3 rounded-lg border border-(--pjs-section-card-border) bg-(--pjs-section-card-bg) p-4 transition-colors hover:border-(--pjs-section-card-border-hover) hover:bg-(--pjs-section-card-bg-hover)"
                        >
                            <div className="mt-0.5 text-(--pjs-section-text-muted)">{c.icon}</div>
                            <div className="flex-1">
                                <h3 className="flex items-center justify-between gap-1.5 text-sm font-medium text-(--pjs-section-text-primary)">{c.title}
                                    {c.external &&
                                        <span className="text-(--pjs-section-text-muted)">{Icons.external}</span>}
                                </h3>
                                <p className="mt-1 text-[13px] text-(--pjs-section-text-muted)">{c.text}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </Container>
        </Reveal>
    )
}

export default CommunitySection;