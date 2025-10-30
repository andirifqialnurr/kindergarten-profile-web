import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube, Linkedin } from 'lucide-react'

type SocialMedia = {
  id: string
  platform: string
  username: string
  url: string
}

async function getSocialMedia(): Promise<SocialMedia[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/social-media`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch social media:', error)
    return []
  }
}

function getSocialIcon(platform: string) {
  const platformLower = platform.toLowerCase()
  if (platformLower.includes('facebook')) return Facebook
  if (platformLower.includes('instagram')) return Instagram
  if (platformLower.includes('twitter')) return Twitter
  if (platformLower.includes('youtube')) return Youtube
  if (platformLower.includes('linkedin')) return Linkedin
  return Facebook // default
}

export default async function Footer() {
  const socialMedia = await getSocialMedia()
  return (
    <footer className="bg-muted mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Zivana Montessori School</h3>
            <p className="text-sm text-muted-foreground">
              Taman Kanak-kanak dengan metode Montessori yang mengutamakan 
              perkembangan anak secara holistik.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/aktivitas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Aktivitas
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pendaftaran
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Jl. Contoh No. 123, Jakarta</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="flex-shrink-0" />
                <span>(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@zivanamontessori.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ikuti Kami</h3>
            {socialMedia.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada social media</p>
            ) : (
              <div className="flex gap-4">
                {socialMedia.map((social) => {
                  const Icon = getSocialIcon(social.platform)
                  return (
                    <a 
                      key={social.id}
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title={`${social.platform} - ${social.username}`}
                    >
                      <Icon size={24} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zivana Montessori School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
