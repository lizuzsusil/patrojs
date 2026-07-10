import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

export default withNextra({
  turbopack: {
    resolveAlias: {
      // contentDirBasePath: '/',
      // Path to your `mdx-components` file with extension
      'next-mdx-import-source-file': './mdx-components.tsx'
    }
  }
})