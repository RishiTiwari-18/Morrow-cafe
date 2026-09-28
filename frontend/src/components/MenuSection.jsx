import { useEffect, useState } from 'react'
import { getMenu, seedMenu } from '../api.js'

const FALLBACK_ITEMS = [
  {
    name: 'Ratnagiri Estate Anaerobic',
    price: '₹240',
    typeLabel: 'Single Origin Pour-Over · V60 or Kalita Wave',
    description:
      'Anaerobic natural fermentation grown at 1,350m elevation in Bababudangiri. Vibrant and layered profile.',
    tags: ['Wild Berry', 'Cacao Nibs', 'Dried Fig'],
  },
  {
    name: 'Silky Spiced Cardamom Flat White',
    price: '₹220',
    typeLabel: 'Espresso Bar · House Blend & Micro-Foam',
    description:
      'Double ristretto of Chikmagalur washed roast infused with cold-pressed green Malabar cardamom and velvety steamed milk.',
    tags: ['Warm Spice', 'Almond Butter', 'Oat/Dairy'],
  },
  {
    name: 'Pistachio Orange Blossom Cruffin',
    price: '₹210',
    typeLabel: 'Viennoiserie · 48-hr Fermentation',
    description:
      'Caramelized exterior with honeycomb crumb, filled with Iranian pistachio mousseline and a kiss of organic Seville orange flower essence.',
    tags: ['French Butter', 'Stoneground Nut', 'Floral Note'],
  },
  {
    name: 'Cascara & Meyer Lemon Sparkler',
    price: '₹230',
    typeLabel: 'Botanical & Cold Extraction',
    description:
      'Sun-dried coffee cherry husk slow steeped for 18 hours, spritzed with wild botanical quinine tonic and fresh Meyer lemon peel.',
    tags: ['Rosehip', 'Sparkling Tonic', 'Low Caffeine'],
  },
]

export default function MenuSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    try {
      setLoading(true)
      setError('')
      const res = await getMenu()
      const menuItems = (res && res.data && res.data.items) || (res && res.items) || []
      if (menuItems && menuItems.length > 0) {
        setItems(menuItems)
      } else {
        const seeded = await seedMenu()
        const seededItems =
          (seeded && seeded.data && seeded.data.items) ||
          (seeded && seeded.items) ||
          FALLBACK_ITEMS
        setItems(seededItems)
      }
    } catch (err) {
      console.warn('[Menu] API failed, using fallback items:', err.message)
      setError(err.message || 'Unable to load menu from API.')
      setItems(FALLBACK_ITEMS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <section id="menu" className="mx-auto max-w-screen-xl px-4 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto mb-10 max-w-xl text-center sm:mb-14">
        <span className="mb-2 block text-label-sm font-label-sm uppercase tracking-widest text-secondary">
          Handmade & Brewed Fresh Daily
        </span>
        <h2 className="mb-3 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">
          Curated Specialty Roasts & Bakery
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Rooted in clean provenance. Each roast is ground to order; each pastry follows a 48-hour slow cold fermentation.
        </p>
      </div>

      {loading && (
        <div className="mx-auto max-w-2xl py-12 text-center">
          <span className="material-symbols-outlined text-4xl text-secondary animate-pulse">
            progress_activity
          </span>
          <p className="mt-3 text-body-sm text-on-surface-variant">Loading menu...</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {items.map((item) => (
              <div
                key={item._id || item.name}
                className="flex flex-col justify-between rounded-lg border border-outline-variant/35 bg-surface-container-lowest p-6 transition-all duration-200 hover:border-secondary group"
              >
                <div>
                  <div className="mb-2 flex justify-between items-baseline gap-4 border-b border-outline-variant/20 pb-2">
                    <h3 className="font-headline-sm text-headline-sm text-primary transition-colors group-hover:text-secondary">
                      {item.name}
                    </h3>
                    <span className="flex-shrink-0 font-title-lg text-title-lg text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="mb-2 text-label-sm font-label-sm uppercase tracking-wider text-secondary">
                    {item.typeLabel}
                  </p>
                  <p className="mb-4 font-body-md text-body-md text-on-surface-variant">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 flex-wrap">
                  {(item.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-surface-container px-2.5 py-1 text-[11px] font-medium text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-6 text-center text-body-sm text-on-surface-variant/80">
              Note: {error} — showing curated sample menu items.
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-center">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          All beverages served in custom ceramic vessels hand-thrown by local potters in Dhar, MP.
          <a
            href="#voucher-card"
            className="ml-1 font-medium text-primary underline hover:text-secondary"
          >
            Claim ₹150 first-order voucher
          </a>
          .
        </p>
      </div>
    </section>
  )
}
