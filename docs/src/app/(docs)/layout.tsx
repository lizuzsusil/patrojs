import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Logo from '@/components/Logo'
import { version } from '../../../../package.json'

const banner = (
  <Banner storageKey="patrojs-v1" dismissible={false}>PatroJS {version} is released 🎉</Banner>
)

const navbar = (
  <Navbar
    logo={<Logo />}
    projectLink="https://github.com/lizuzsusil/patro"
  />
)

const footer = (
  <Footer style={{ justifyContent: 'center', padding: '1rem' }}>
    {new Date().getFullYear()} - Built for the Nepali 🇳🇵 Developer Community
  </Footer>
)

export default async function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/lizuzsusil/patrojs/tree/main/docs"
      footer={footer}
    >
      {children}
    </Layout>
  )
}
