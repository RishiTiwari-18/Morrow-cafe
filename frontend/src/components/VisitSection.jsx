export default function VisitSection() {
  return (
    <section id="visit" className="mx-auto max-w-screen-xl px-4 py-14 sm:px-8 sm:py-20">
      <div className="rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-[0_12px_32px_-8px_rgba(32,26,23,0.06)] sm:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          <div className="space-y-6 md:col-span-7">
            <div className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">storefront</span>
              <span className="text-label-sm font-label-sm uppercase tracking-widest text-secondary">
                Flagship Roastery
              </span>
            </div>

            <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-md md:text-headline-md">
              Finding Your Way to Morrow
            </h2>

            <div className="space-y-4 text-on-surface-variant">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-1 text-primary">location_on</span>
                <div>
                  <p className="font-title-md text-title-md text-primary">
                    Vijay Nagar Roastery & Café
                  </p>
                  <p className="font-body-md text-body-md">
                    14 Scheme No. 54, Near Vijay Nagar Square, Indore, Madhya Pradesh 452010
                  </p>
                  <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant/80">
                    Landmark: 2 minutes walking distance from Prestige Institute circle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <span className="material-symbols-outlined mt-1 text-primary">schedule</span>
                <div>
                  <p className="font-title-md text-title-md text-primary">Sanctuary Hours</p>
                  <p className="font-body-md text-body-md">
                    Tuesday – Sunday: 08:00 AM – 10:30 PM
                  </p>
                  <p className="mt-0.5 font-body-sm font-medium text-secondary">
                    Mondays: Closed for roastery micro-lot cupping & bread research.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-5 py-3 text-label-md font-label-md uppercase tracking-wider text-surface transition-colors hover:bg-stone-800"
              >
                <span>Get Directions</span>
                <span className="material-symbols-outlined text-[18px]">directions</span>
              </a>
              <a
                href="#voucher-card"
                className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/60 px-5 py-3 text-label-md font-label-md uppercase tracking-wider text-primary transition-colors hover:bg-surface-container"
              >
                <span>Reserve a Corner</span>
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-outline-variant/30 bg-surface-container p-5 md:col-span-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
                <span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">
                  Transport & Parking
                </span>
                <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-on-surface">
                  Valet Available
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Dedicated bicycle stands and shaded motor parking in the courtyard. Direct walk from Vijay Nagar Metro corridor.
              </p>
            </div>

            <div className="my-4 rounded border border-outline-variant/30 bg-surface p-4 text-center">
              <span className="material-symbols-outlined mb-1 text-3xl text-secondary">local_cafe</span>
              <p className="text-label-sm font-label-sm uppercase tracking-wider text-primary">
                Indoor & Verandah Seating
              </p>
              <p className="mt-1 text-body-sm text-on-surface-variant">
                42 uncrowded seats · Free fiber Wi-Fi for writers
              </p>
            </div>

            <div className="text-center text-label-sm font-label-sm text-on-surface-variant">
              Table Inquiries: +91 731 498 2210
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
