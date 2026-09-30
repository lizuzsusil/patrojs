<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/public/logo.webp">
  <img alt="PatroJS" src="./docs/public/logo.webp" width="320">
</picture>

# PatroJS DatePicker

**A modern, accessible Bikram Sambat (Nepali) date picker for the JavaScript ecosystem.**

![npm](https://img.shields.io/npm/v/@patrojs/react) ![npm](https://img.shields.io/npm/dm/@patrojs/react) ![License](https://img.shields.io/npm/l/@patrojs/react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
</div>

## Features

- **Bikram Sambat calendar engine** — accurate BS↔AD conversion, leap year handling, and calendar generation
- **Framework-agnostic core** — shared business logic in `@patrojs/core`, thin UI wrappers per framework
- **React 18 & 19 support** — controlled/uncontrolled, SSR, hydration-safe
- **Nepali locale** — full Nepali UI with Nepali numerals (`१२३`), localized month/weekday names
- **Custom formatting** — pluggable formatter API with built-in patterns (`YYYY-MM-DD`, `DD Month YYYY`, ...)
- **Theming** — CSS custom properties, Tailwind CSS v4 default theme, `styles` and `classNames` props, or fully unstyled `minimal` mode
- **Validation** — `minDate`, `maxDate`, `disabledDates`, `disabledWeekdays`
- **Accessibility** — keyboard navigation, ARIA labels, focus management, screen reader support
- **Touch & swipe** — mobile-friendly with swipe gesture support
- **TypeScript** — first-class type definitions throughout

## Packages

| Package | Description |
|---------|-------------|
| [`@patrojs/core`](./packages/core) | Bikram Sambat calendar engine, conversion, formatting, validation |
| [`@patrojs/react`](./packages/react) | React date picker component |

Additional framework packages (Vue, Angular) are on the roadmap.

---

## Installation

```sh
npm install @patrojs/react
```

Requires **React ^18** or **React ^19**.

### Import styles

```tsx
import '@patrojs/react/style.css';
```

---

## Quick Usage

```tsx
import { useState } from 'react';
import { PatroDatePicker } from '@patrojs/react';
import '@patrojs/react/style.css';

function App() {
  const [date, setDate] = useState(null);

  return (
    <PatroDatePicker
      value={date}
      onChange={(bs) => setDate(bs)}
    />
  );
}
```

### Nepali locale

```tsx
<PatroDatePicker language="ne" formatPattern="DD Month YYYY" />
```

### Inline mode

```tsx
<PatroDatePicker inline />
```

---

## Documentation

Full documentation, live examples, and API reference are available at:

**[patrojs.vercel.app](https://patrojs.vercel.app)** — _(coming soon)_

For now, see the [SPECIFICATION.md](./SPECIFICATION.md) and the [docs site source](./docs) for details.

---

## Framework Support

| Framework | Status |
|-----------|--------|
| React 18 / 19 | ✅ |
| Next.js (App Router) | ✅ |
| Next.js (Pages Router) | ✅ |
| Vue 3 | 🚧 Planned |
| Angular | 🚧 Planned |

---

## License

[MIT](./LICENSE.md)

---

## Sponsors

Support PatroJS development by [buying me a momo](https://buymemomo.com/lizuzcodes) 🥟

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/public/buy-me-momo-large.png">
  <img alt="Buy Me a Momo" src="./docs/public/buy-me-momo.png" width="300">
</picture>
