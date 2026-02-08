import { useQuery } from '@tanstack/react-query'
import { getAuthors } from '@/services/authors'
import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'
import SocialIcon from '@/components/social/SocialIcon'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getImageUrl } from '@/utils/strapiHelpers'
import siteConfig from '@/config/site'

export default function TentangKamiPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
  })

  const authors = data?.data || []

  return (
    <>
      <PageMeta
        title="Tentang Kami"
        description="Tentang CV Inshan Karya Permata - penerbit buku berkualitas dari Yogyakarta"
      />
      <SectionContainer className="py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Tentang Kami</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p>
              <strong>CV Inshan Karya Permata</strong> adalah perusahaan penerbitan buku yang
              berlokasi di Yogyakarta, Indonesia. Kami berkomitmen untuk menghadirkan buku-buku
              berkualitas yang bermanfaat bagi masyarakat luas.
            </p>
            <p>
              Melalui brand <strong>Inshan Books</strong> dan <strong>Inshan Media</strong>,
              kami terus berkarya untuk mengembangkan dunia literasi di Indonesia.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12">
            <h2 className="font-heading text-xl font-semibold mb-4">Hubungi Kami</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <SocialIcon kind="mail" href={`mailto:${siteConfig.email}`} />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <SocialIcon kind="whatsapp" href={siteConfig.whatsapp} />
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <SocialIcon kind="instagram" href={siteConfig.instagram} />
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  @inshanmedia
                </a>
              </div>
              <div className="flex items-center gap-3">
                <SocialIcon kind="facebook" href={siteConfig.facebook} />
                <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Inshan Books
                </a>
              </div>
            </div>
          </div>

          {/* Team */}
          {isLoading ? (
            <LoadingSpinner text="Memuat tim..." />
          ) : authors.length > 0 ? (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6">Tim Kami</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {authors.map((author) => {
                  const avatarUrl = getImageUrl(author.avatar)
                  return (
                    <div key={author.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={author.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xl font-heading font-bold text-primary">
                            {author.name?.[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{author.name}</h3>
                        {author.bio && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{author.bio}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </SectionContainer>
    </>
  )
}
