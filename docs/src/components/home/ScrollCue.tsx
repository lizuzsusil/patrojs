"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "motion/react";

export function ScrollCue() {
    const controls = useAnimationControls();
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function animate() {
            while (!cancelled) {
                if (hovered) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    continue;
                }

                await controls.start({
                    y: 4,
                    transition: {
                        duration: 0.45,
                        ease: "easeOut",
                    },
                });

                await controls.start({
                    y: 0,
                    transition: {
                        duration: 0.45,
                        ease: "easeIn",
                    },
                });

                await new Promise((resolve) => setTimeout(resolve, 400));
            }
        }

        animate();

        return () => {
            cancelled = true;
            controls.stop();
        };
    }, [controls, hovered]);

    const handleClick = () => {
        document
            .getElementById("features")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Scroll down"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group mx-auto flex cursor-pointer items-center justify-center"
        >
            <div className="relative flex h-9 w-5.5 justify-center rounded-full border dark:border-white/30 border-gray-500/50 transition-colors dark:group-hover:border-white/40 group-hover:border-gray-500/40">
                <motion.div
                    animate={controls}
                    initial={{ y: 0 }}
                    className="absolute top-2 size-0.75 rounded-full dark:bg-white/60 bg-gray-500/60"
                />
            </div>
        </button>
    );
}