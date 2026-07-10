import { Icons } from "./icons"

export const features = [
    { icon: 'calendar', title: 'Bikram Sambat Engine', description: 'Accurate BS calendar generation with reliable AD ↔ BS conversion, leap years, and correct weekday calculation.' },
    { icon: 'globe', title: 'Nepali Locale', description: 'First-class Nepali language support with Nepali numerals and localized month/weekday names out of the box.' },
    { icon: 'palette', title: 'Fully Customizable', description: 'Tailor colors, class names, formatters, and rendering to match your application design.' },
    { icon: 'typescript', title: 'TypeScript First', description: 'Written in TypeScript with complete type definitions - autocomplete and type safety throughout your editor.' },
    { icon: 'accessibility', title: 'Accessible', description: 'Full keyboard navigation, screen reader support, ARIA attributes, and WCAG-compliant focus management.' },
    { icon: 'zap', title: 'SSR Ready', description: 'Works with Next.js App Router, Pages Router, and any SSR environment. Hydration-safe and tree-shakeable.' },
    { icon: 'check', title: 'Controlled & Uncontrolled', description: 'Use it however you prefer - fully controlled with value/onChange, or uncontrolled with a default value.' },
    { icon: 'box', title: 'Minimal Core', description: 'Shared logic lives in @patrojs/core. Framework wrappers stay thin - React now, Vue and Angular next.' },
]

export const installCommands = [
    { label: 'pnpm', command: 'pnpm add @patrojs/react' },
    { label: 'npm', command: 'npm install @patrojs/react' },
    { label: 'yarn', command: 'yarn add @patrojs/react' },
    { label: 'bun', command: 'bun add @patrojs/react' },
]

export const resources = [
    { title: 'Documentation', description: 'Guides, API reference, and examples.', href: '/getting-started', icon: Icons.book },
    { title: 'GitHub', description: 'Source code, issues, and pull requests.', href: 'https://github.com/lizuzsusil/patrojs', external: true, icon: Icons.github },
    { title: 'npm Package', description: 'View the package on npm.', href: 'https://www.npmjs.com/package/@patrojs/react', external: true, icon: Icons.npm },
]

export const whyResources = [
    {
        title: 'The Problem',
        icon: Icons.alertTriangle,
        text: 'Nepali calendar support in JavaScript is fragmented. Existing options are often unmaintained, lack TypeScript support, have inaccurate conversions, or don\u2019t integrate cleanly with modern frameworks - so teams end up writing fragile date logic from scratch.',
    },
    {
        title: 'The Approach',
        icon: Icons.packageBoxes,
        text: 'A shared, tested calendar engine (@patrojs/core) handles all BS ↔ AD conversion and date logic. Framework packages only add UI bindings, which keeps bundles small and the API consistent across React, Vue, and Angular.',
    },
    {
        title: 'When to Use It',
        icon: Icons.calendar,
        text: 'Reach for PatroJS when your app needs Nepali date input, BS calendar display, or conversion between Bikram Sambat and Gregorian dates - in forms, dashboards, booking flows, or any date-handling UI.',
    },
    {
        title: 'Who It\'s for',
        icon: Icons.userCircle,
        text: 'Frontend developers building for the Nepali market - fintech, healthcare, education, government, and enterprise products that need a production-ready, accurate BS calendar component.',    },
]

export const communityResources = [
    { title: 'Report a Bug', text: 'Open an issue with a minimal reproduction.', external: false, href: 'https://github.com/lizuzsusil/patrojs/issues/new?template=bug_report.md', icon: Icons.bug },
    { title: 'Request a Feature', text: 'Propose an idea or start a discussion.', external: false, href: 'https://github.com/lizuzsusil/patrojs/issues/new?template=feature_request.md', icon: Icons.gitPullRequest },
    { title: 'Contributing Guide', text: 'Read the guidelines for code, docs, and tests.', external: false, href: 'https://github.com/lizuzsusil/patrojs/blob/main/CONTRIBUTING.md', icon: Icons.lightBulb },
    { title: 'Discussions', text: 'Ask questions and connect with other users.', external: false, href: 'https://github.com/lizuzsusil/patrojs/discussions', icon: Icons.messageCircle },
]

export const messages = [
    "🚧 Our developers are fueling this framework with coffee. Check back soon!",
    "🛠️ Still under construction. The docs are getting their finishing touches.",
    "⏳ This framework is compiling something exciting. Hang tight!",
    "🚀 Coming soon! We're building something worth the wait.",
    "👨‍💻 Feature in progress. Our keyboards are getting a serious workout.",
    "✨ Magic is happening behind the scenes. Stay tuned!",
    "📦 We're packaging up something awesome for you.",
    "⚡ Good things take time. This page is almost ready.",
    "🔨 Hammering out the final details. We'll be back shortly.",
    "🎨 Adding the finishing touches. It's looking great already.",
    "🧩 Putting all the pieces together. Almost there!",
    "🛸 Building at warp speed. Check back in a bit!",
    "🧪 Running experiments to make this even better.",
    "📚 The documentation is still being written. Thanks for your patience!",
    "🌱 Growing this feature one commit at a time.",
    "🎯 We're aiming for perfection. It'll be worth the wait.",
    "💡 Bright ideas are turning into great features.",
    "🔧 Tightening a few bolts before launch.",
    "🏗️ This section is currently under active development.",
    "🌟 Something amazing is on its way. Stay tuned!",
    "🎁 We're wrapping up a surprise for you.",
    "🖥️ Pixels are being perfectly positioned as we speak.",
    "⚙️ Engineering in progress. We're almost there.",
    "📡 Sending progress updates from the development universe...",
    "🚀 Launch sequence initiated. Final checks underway.",
    "☕ One more cup of coffee and this should be ready.",
    "🧠 Our developers are teaching this framework some new tricks.",
    "🎉 Great things are coming. Thanks for your patience!",
    "🪄 A little coding magic is happening behind the curtain.",
    "🌈 This feature is loading with extra awesomeness.",
    "🔍 Squashing the last few bugs before release.",
    "📈 Making steady progress. Thanks for hanging in there!",
    "🛠️ Fine-tuning everything to give you the best experience.",
    "🧑‍🚀 Mission in progress. Preparing for a smooth landing.",
    "🔥 Cooking up fresh features. Almost ready to serve!",
    "🕒 Just a little longer. We're putting on the final polish.",
    "🎵 Coding to the rhythm of clacking keyboards.",
    "📋 Our to-do list is getting shorter by the minute.",
    "🚦Almost ready to go. Waiting for the green light.",
    "💙 Thanks for your patience-we can't wait to show you what's next!"
]