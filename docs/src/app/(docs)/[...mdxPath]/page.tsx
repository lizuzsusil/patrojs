import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../../mdx-components'
import { notFound } from 'next/navigation'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[] }>
}) {
  const params = await props.params
  try {
    const { metadata } = await importPage(params.mdxPath)
    return metadata
  } catch {
    return {}
  }
}

export default async function Page(props: {
  params: Promise<{ mdxPath: string[] }>
}) {
  const params = await props.params
  try {
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata, sourceCode } = result
      // eslint-disable-next-line react-hooks/rules-of-hooks
    const { wrapper: Wrapper } = useMDXComponents({})
    return (
        // eslint-disable-next-line react-hooks/error-boundaries
      <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
          {/* eslint-disable-next-line react-hooks/error-boundaries */}
        <MDXContent params={params} />
      </Wrapper>
    )
  } catch {
    notFound()
  }
}
