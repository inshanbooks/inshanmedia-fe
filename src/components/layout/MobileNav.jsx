import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '@/config/site'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 z-50">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-3 text-base font-medium transition-colors ${
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
        </div>
      )}
    </div>
  )
}
