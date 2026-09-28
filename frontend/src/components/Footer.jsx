const FOOTER_LINKS = [
  { href: '#sanctuary', label: 'Philosophy & Origins' },
  { href: '#menu', label: 'Seasonal Menu' },
  { href: '#voucher-card', label: 'Table Inquiries' },
  { href: '#visit', label: 'Vijay Nagar & Old Palasia' },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container dark:border-outline-variant/20 dark:bg-surface-container">
      <div className="mx-auto mb-16 flex max-w-screen-md flex-col items-center justify-center gap-6 px-6 py-12 text-center md:mb-0">
        <div className="space-y-2">
          <span className="block font-headline-sm text-headline-sm tracking-wider text-primary dark:text-primary">
            MORROW CAFÉ
          </span>
          <p className="mx-auto max-w-md font-body-sm text-body-sm text-on-surface-variant">
            An independent specialty coffee studio and artisan bakery celebrating the restorative slowness of unhurried mornings.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-label-sm font-label-sm text-on-surface-variant transition-colors duration-200 hover:text-secondary dark:text-on-surface-variant dark:hover:text-secondary-fixed"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="w-full border-t border-outline-variant/30 pt-4 text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant/80">
            © 2024 Morrow Café. Slow living, micro-roasted in Indore, MP.
          </p>
        </div>
      </div>
    </footer>
  )
}
