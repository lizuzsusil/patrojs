import Link from 'next/link'
import {motion, useReducedMotion} from 'motion/react'
import {formatDownloads} from "@/lib/utils";
import {Icons} from "@/lib/icons";
import FrameworkCards from "@/components/FrameworkCards";
import {ScrollCue} from "@/components/home/ScrollCue";
import type {HomepageProps} from "@/components/Homepage";

function HeroSection({downloads, version}: HomepageProps) {
    const reducedMotion = useReducedMotion()

    const heroAnim = (delay: number) => ({
        initial: reducedMotion ? undefined : {opacity: 0, y: 12},
        animate: reducedMotion ? undefined : {opacity: 1, y: 0},
        transition: {duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const, delay},
    })
    return (
        <section className="hp-hero relative flex min-h-[calc(100dvh-56px)] flex-col">
            <div className="hp-hero-bg" aria-hidden={true}/>

            <div className="hp-container relative z-10 flex flex-1 flex-col">

                <div className="flex flex-1 flex-col justify-center">
                    <motion.div className="order-1 md:order-1" {...heroAnim(0)}>
                        <div className="hp-hero-badge">
                            <span className="hp-hero-badge-tag">v{version}</span>
                            <span className="hp-hero-badge-label">Now available for React</span>
                        </div>
                    </motion.div>

                    <motion.h1 className="hp-hero-title order-2 md:order-2" {...heroAnim(0.05)}>
                        <span className="hp-hero-title-accent">Patro</span>JS
                    </motion.h1>

                    <motion.p className="hp-hero-tagline order-3 md:order-3" {...heroAnim(0.1)}>
                        A modern Bikram Sambat date picker for web frameworks.
                    </motion.p>

                    <motion.p className="hp-hero-description order-4 md:order-4" {...heroAnim(0.15)}>
                        Build polished Nepali calendar experiences with accurate BS date handling,
                        native Nepali locale, flexible theming, and first-class TypeScript support.
                    </motion.p>

                    <motion.div className="order-8 md:order-5 md:mb-12" {...heroAnim(0.2)}>
                        <FrameworkCards/>
                    </motion.div>

                    <motion.div className="hp-hero-actions order-6 md:order-6" {...heroAnim(0.25)}>
                        <Link href="/getting-started" className="hp-btn hp-btn-primary">
                            Documentation
                        </Link>
                        <a
                            href="https://github.com/lizuzsusil/patrojs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hp-btn hp-btn-secondary"
                        >
                            {Icons.github}
                            GitHub
                        </a>
                        <a
                            href="https://www.npmjs.com/package/@patrojs/core"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hp-btn hp-btn-secondary"
                        >
                            npm
                            {Icons.external}
                        </a>
                    </motion.div>

                    <motion.div className="order-7 md:order-7 md:mb-0 mb-8" {...heroAnim(0.3)}>
                        <div
                            className="inline-grid md:gap-0 gap-3 grid-cols-2 rounded-xl border border-border bg-card px-7 py-4 shadow-sm md:grid-cols-4 md:divide-x md:divide-border"
                        >
                            <div className="flex flex-col justify-center items-center px-6">
                                <span className="text-[0.92rem] font-semibold">{version}</span>
                                <span className="text-[0.72rem] tracking-[0.04em] text-muted-foreground">
                              Version
                            </span>
                            </div>

                            <div className="flex flex-col justify-center items-center px-6">
                            <span className="text-[0.92rem] font-semibold">
                              {formatDownloads(downloads)}
                            </span>
                                <span className="text-[0.72rem] tracking-[0.04em] text-muted-foreground">
                              Downloads
                            </span>
                            </div>

                            <div className="flex flex-col justify-center items-center px-6">
                                <span className="text-[0.92rem] font-semibold">MIT</span>
                                <span className="text-[0.72rem] tracking-[0.04em] text-muted-foreground">
                              License
                            </span>
                            </div>

                            <div className="flex flex-col justify-center items-center px-6">
                                <span className="text-[0.92rem] font-semibold">TypeScript</span>
                                <span className="text-[0.72rem] tracking-[0.04em] text-muted-foreground">
                              Type Definitions
                            </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div className="order-8 md:order-8 min-[550px]:block hidden mt-20" {...heroAnim(0.35)}>
                    <ScrollCue/>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection;