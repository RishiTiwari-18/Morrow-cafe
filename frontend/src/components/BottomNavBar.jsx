const NAV_ITEMS = [
  {
    href: '#sanctuary',
    icon: 'spa',
    label: 'Sanctuary',
    active: true,
  },
  {
    href: '#menu',
    icon: 'local_cafe',
    label: 'Menu',
    active: false,
  },
  {
    href: '#voucher-card',
    icon: 'confirmation_number',
    label: 'Voucher',
    active: false,
  },
  {
    href: '#visit',
    icon: 'storefront',
    label: 'Visit',
    active: false,
  },
]

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full justify-around items-center border-t border-outline-variant/30 bg-surface/95 px-4 py-2.5 backdrop-blur-md shadow-[0_-4px_24px_rgba(32,26,23,0.06)] dark:border-outline-variant/20 dark:bg-surface/95 md:hidden">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center justify-center transition-transform duration-150 hover:text-primary active:scale-95 ${
            item.active
              ? 'font-semibold text-primary dark:text-primary'
              : 'font-normal text-on-surface-variant/70 dark:text-on-surface-variant/70'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
          <span className="mt-0.5 text-label-sm font-label-sm">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
