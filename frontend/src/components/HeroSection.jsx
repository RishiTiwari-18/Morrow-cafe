export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-8 sm:pt-8 sm:pb-20">
      <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-12 md:gap-12">
        <div className="flex flex-col justify-center order-2 pt-2 md:col-span-6 lg:col-span-5 md:order-1 md:pt-0">
          <div className="mb-4 inline-flex items-center gap-2 sm:mb-6">
            <span className="h-px w-6 bg-secondary-container"></span>
            <span className="text-label-sm font-label-sm uppercase tracking-widest text-secondary">
              Bespoke Micro-Roastery · Vijay Nagar
            </span>
          </div>

          <h1 className="mb-5 font-headline-lg-mobile text-headline-lg-mobile tracking-tight leading-tight text-primary md:font-headline-lg md:text-headline-lg">
            A sanctuary for slow mornings & mindful brew.
          </h1>

          <p className="mb-8 max-w-xl font-body-md text-body-md font-light text-on-surface-variant md:font-body-lg md:text-body-lg">
            Handcrafted single-origin coffees, natural fermentation loaves, and quiet sunlit archways in the heart of Indore. Crafted for unhurried presence.
          </p>

          <div className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
            <a
              href="#voucher-card"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-7 py-3.5 text-center text-label-lg font-label-lg tracking-wider text-surface shadow-sm transition-all duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              <span>Claim ₹150 Invitation</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#menu"
              className="rounded-lg border border-outline-variant/60 px-6 py-3.5 text-center text-label-lg font-label-lg tracking-wider text-primary-container transition-all duration-200 hover:bg-surface-container"
            >
              Explore Menu
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 border-t border-outline-variant/30 pt-6 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">nest_clock_farsight_analog</span>
              <span className="text-label-sm font-label-sm uppercase">Pour-over Bar & Sourdough</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span>
              <span className="text-label-sm font-label-sm uppercase">Open 08:00 AM</span>
            </div>
          </div>
        </div>

        <div className="order-1 md:col-span-6 lg:col-span-7 md:order-2">
          <div className="relative overflow-hidden rounded-lg border border-outline-variant/30 bg-surface-container shadow-[0_12px_32px_-8px_rgba(32,26,23,0.08)]">
            <img
              className="w-full transform object-cover object-center aspect-[4/3] transition-transform duration-700 ease-out hover:scale-[1.01] md:aspect-[5/4]"
              alt="An expansive view of an artisanal warm neutral café interior bathed in gentle morning sunlight through large black arched windows. A majestic dark oak communal table holds handcrafted ceramic latte cups and fresh sourdough loaves, surrounded by pale lime-washed stucco arches and earthy terracotta planters. The atmosphere is serene and architectural, evoking unhurried presence with natural textures of linen, wood, and warm ivory tones."
              src="https://careers.prozpekt.com/_astro/morrow-cafe-hero.B7AGZOSG_24CLfu.webp"
            />
            <div className="absolute bottom-3 left-3 rounded border border-outline-variant/30 bg-surface/90 px-3 py-1.5 backdrop-blur-md text-label-sm font-label-sm uppercase tracking-wider text-primary">
              Communal Sanctuary Table · Room 01
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
