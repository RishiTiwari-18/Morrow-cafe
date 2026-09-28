import { IoIosMenu } from "react-icons/io";

export default function Header() {
  return (
    <header className="bg-surface/90 backdrop-blur-md dark:bg-surface/90 sticky top-0 z-50 w-full transition-colors duration-200">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open Navigation Menu"
            type="button"
            className="flex items-center justify-center rounded-sm  text-primary transition-colors duration-200 hover:text-secondary dark:hover:text-secondary-fixed active:opacity-80"
          >
            <IoIosMenu size={34}/>
          </button>
          <span className="hidden border-l border-outline-variant/50 pl-3 text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant sm:inline-block">
            Indore · MP
          </span>
        </div>

        <div className="flex items-center justify-center">
          <a href="#" className="flex items-center gap-2">
            <img
              alt="Morrow Café Wordmark Logo"
              className="h-9 w-auto object-contain sm:h-7"
              src="logo.svg"
            />
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#voucher-card"
            className="flex items-center gap-1.5 rounded-lg bg-primary-container px-3.5 py-2.5 text-xs font-label-sm uppercase tracking-wider text-surface shadow-sm transition-colors duration-200 hover:bg-stone-800 active:scale-95"
          >
            <span>Reserve</span>
            <span className="text-[10px] text-tertiary-fixed-dim">· ₹150 Off</span>
          </a>
        </div>
      </div>
    </header>
  )
}
