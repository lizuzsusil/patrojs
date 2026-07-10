import Image from 'next/image'
import Link from 'next/link'
import { Icons } from "@/lib/icons"

export function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-container">
        <div className="hp-footer-main">
          <div className="hp-footer-brand">
            <Image
              src="/logo.webp"
              alt="PatroJS"
              width={94}
              height={26}
              priority
            />
          </div>
          <nav className="hp-footer-nav">
            <Link href="/getting-started" className="hp-footer-nav-link">Docs</Link>
            <Link href="/reference" className="hp-footer-nav-link">API</Link>
            <a
              href="https://github.com/lizuzsusil/patrojs"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-footer-nav-link"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@patrojs/react"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-footer-nav-link"
            >
              npm
            </a>
          </nav>
        </div>

        <div className="hp-footer-mid">
          <p className="hp-footer-tagline">Built for the Nepali developer community</p>
          <a
            href="https://buymemomo.com/lizuzcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="hp-footer-sponsor"
          >
              <Image
                  src="/buy-me-momo-large.png"
                  alt="Support Me"
                  height={44}
                  width={200}
                  priority
              />
          </a>
        </div>

        <div className="hp-footer-bottom">
          <div className="hp-footer-legal">
            &copy; {new Date().getFullYear()} PatroJS Contributors &middot; MIT License
          </div>
          <div className="hp-footer-social">
            <a
              href="https://github.com/lizuzsusil/patrojs"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-footer-link"
              aria-label="GitHub"
            >
              {Icons.github}
            </a>
            <a
              href="https://www.npmjs.com/package/@patrojs/react"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-footer-link"
              aria-label="npm"
            >
              {Icons.npm}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
