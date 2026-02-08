import { Link, NavLink } from 'react-router-dom'
import SectionContainer from './SectionContainer'
import ThemeSwitch from '@/components/ui/ThemeSwitch'
import MobileNav from './MobileNav'
import { navLinks } from '@/config/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-navy/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-gray-800">
      <SectionContainer className="relative">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-inshan.png" alt="Inshan Media" className="h-10 w-auto" />
            <span className="font-heading font-semibold text-xl text-primary dark:text-primary-300 hidden sm:block">
              Inshan Media
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary dark:text-primary-300 bg-blue-50 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </SectionContainer>
    </header>
  )
}
