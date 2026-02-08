import { Helmet } from 'react-helmet-async'
import siteConfig from '@/config/site'

export default function PageMeta({
  title,
  description,
  image,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title
  const metaDesc = description || siteConfig.description
  const metaImage = image || siteConfig.siteLogo

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content={type} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
    </Helmet>
  )
}
