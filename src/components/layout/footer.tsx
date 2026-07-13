import React from 'react'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Browse', href: '/browse' },
      { label: 'Favorites', href: '/favorites' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: '#' },
      { label: 'Forum', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="bg-background border-t-2 border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-primary-text font-bold mb-4">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-text hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-muted-text text-center border-t border-border pt-8">
          © 2026 Torii. Built with ❤️ by {' '}
          <a href="https://github.com/weenson" target="_blank" className="text-primary hover:underline">
            weenson
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
