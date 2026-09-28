const FEATURES = [
  {
    icon: 'grain',
    title: 'Micro-Roasted in Small Batches',
    description:
      'Roasted every Monday on our 3kg Giesen drum roaster for optimum degas cycles.',
  },
  {
    icon: 'album',
    title: 'Curated Japanese Vinyl & Jazz',
    description:
      'Analog acoustics tuned to calm ambient frequencies without jarring digital playlists.',
  },
  {
    icon: 'chair',
    title: 'Quiet Work & Reading Nooks',
    description:
      'Subtle desk power access, dedicated library shelves, and zero hurried turnover pressure.',
  },
]

export default function PhilosophySection() {
  return (
    <section
      id="sanctuary"
      className="border-y border-outline-variant/30 bg-surface-container-high/60 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
        <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-3 block text-label-sm font-label-sm uppercase tracking-widest text-secondary">
              The Morrow Manifesto
            </span>
            <h2 className="mb-6 font-headline-lg-mobile text-headline-lg-mobile leading-tight text-primary md:font-headline-lg md:text-headline-lg">
              An antidote to the fast world.
            </h2>
            <p className="mb-5 font-body-md text-body-md font-light leading-relaxed text-on-surface-variant">
              Morrow was conceived as a quiet rebellion against transactional café culture. We believe the morning cup is an anchor — a punctuation mark that grounds your senses before the city begins its rush.
            </p>
            <p className="mb-8 font-body-md text-body-md font-light leading-relaxed text-on-surface-variant">
              Every arch, limewashed surface, and warm linen drape in our Vijay Nagar sanctuary was designed to absorb harsh echoes and invite deep reading, unhurried chats, or still contemplation.
            </p>

            <div className="space-y-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3.5">
                  <span className="material-symbols-outlined mt-0.5 text-secondary">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="font-title-md text-title-md text-primary">
                      {f.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-outline-variant/30">
                <img
                  className="w-full object-cover aspect-[3/4]"
                  alt="A close-up of an artisan hand pouring hot water from a copper gooseneck kettle over a ceramic dripper with fresh blooming coffee grounds. Warm amber natural light highlights the coffee bloom in a minimalist beige studio setup, accompanied by stoneware ceramics and raw unbleached linen."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB8zTKSqrnNU6t8OvTaPSAElIa1QXxooD1EbJxkIMRtyFRAgc2ElDJnjIkUYNQvCB84H5LgrOH-Z_7nDDt2UoXTNhp8Dxd5dYwhKVgm8xcPTtu8aUGw-2gMs1XtUhEt-JYqOExnDqInohzVTU2Ific2qGVSaPbau-W6X2s4yVRptoX4e8PpgWy3i8T7pqtL1iP6Fx9B68VcfHrRmVejUCoMeqA2l3vV7IryejDjbXpbCR4bHZm7jQ9hg"
                />
              </div>
              <div className="rounded-lg border border-outline-variant/30 bg-surface p-4">
                <span className="mb-1 block text-label-sm font-label-sm uppercase tracking-wider text-secondary">
                  Architecture
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Handcrafted arches inspired by Malwa sandstone structures and modern Nordic minimalism.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-lg border border-outline-variant/30 bg-surface p-4">
                <span className="mb-1 block text-label-sm font-label-sm uppercase tracking-wider text-secondary">
                  Bakery Ledger
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Wild yeast sourdough starters nurtured with ancient Sharbati wheat grains from Sehore.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border border-outline-variant/30">
                <img
                  className="w-full object-cover aspect-[3/4]"
                  alt="Golden crisp freshly baked artisanal sourdough bread and laminated croissants resting on a rustic wooden board against an ivory textured lime-wash wall. Soft daylight gently streams across the flaky layers and coarse crumb of the baker's creations."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFfhv6ukS3M7228x6fU3Fzo7F6cTWRXLB1EKW3mKPfJDRJkKVhyh98aUGfgWi-PulMBW4CJCzxLcJY5dpHXcjq1rTucUSldmm8V8cuCRWstlb1PMby5q0ceJA-8BaciVDZHB2gzoxu4zchTY50MKG5_F2SsgyDKoseXFs-qW9iCPSvAqpxXjLR4WHnVxeDQHyStJ3UqwGVZuaKWkOWhuvbeepXRWL-JoGo-ygEAOj8cL6zj54BLJV5WQ"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
