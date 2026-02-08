import { Link } from 'react-router-dom'
import SectionContainer from './SectionContainer'
import SocialIcon from '@/components/social/SocialIcon'
import siteConfig from '@/config/site'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <SectionContainer className="py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo-inshan.png" alt="Inshan Media" className="h-10 w-auto" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
            {siteConfig.description}
          </p>
          <div className="flex gap-4">
            <SocialIcon kind="mail" href={`mailto:${siteConfig.email}`} />
            <SocialIcon kind="facebook" href={siteConfig.facebook} />
            <SocialIcon kind="youtube" href={siteConfig.youtube} />
            <SocialIcon kind="instagram" href={siteConfig.instagram} />
            <SocialIcon kind="whatsapp" href={siteConfig.whatsapp} />
          </div>
          <div className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
          </div>
        </div>
      </SectionContainer>
    </footer>
  )
}
