import {Homepage} from '@/components/Homepage'
import './main.css'
import type {Metadata} from "next";
import Header from "@/components/home/Header";

async function getDownloads() {
    try {
        const metaRes = await fetch("https://registry.npmjs.org/@patrojs/react", {
            next: {revalidate: 86400},
        });

        if (!metaRes.ok) return null;

        const meta = await metaRes.json();

        const firstVersion = Object.keys(meta.time).find(
            (key) => !["created", "modified"].includes(key)
        );

        if (!firstVersion) return null;

        const start = meta.time[firstVersion].split("T")[0];
        const end = new Date().toISOString().split("T")[0];

        const downloadsRes = await fetch(
            `https://api.npmjs.org/downloads/point/${start}:${end}/@patrojs/react`,
            {
                next: {revalidate: 3600},
            }
        );

        if (!downloadsRes.ok) return null;

        const data = await downloadsRes.json();
        return data.downloads as number;
    } catch {
        return null;
    }
}

export const metadata: Metadata = {
    title: 'PatroJS - Nepali (Bikram Sambat) Date Picker for Web frameworks',
    description:
        'A modern, accessible, and fully customizable Bikram Sambat date picker for Web frameworks. Built with TypeScript, supports Nepali locale, custom theming, and works with Next.js, Vue, and Angular.',
    openGraph: {
        title: 'PatroJS - Nepali Date Picker for Web frameworks',
        description:
            'A modern Bikram Sambat date picker with Nepali locale support, custom theming, and seamless React integration.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PatroJS - Nepali Date Picker for Web frameworks',
        description:
            'A modern Bikram Sambat date picker with Nepali locale support, custom theming, and seamless React integration.',
    },
}

export default async function Page() {
    const downloads = await getDownloads()

    return (
        <>
            <Header/>
            <Homepage downloads={downloads}/>
        </>
    )
}
