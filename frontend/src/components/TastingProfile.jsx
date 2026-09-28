const METERS = [
  {
    label: 'Roast',
    value: 'Medium Light',
    percent: 45,
  },
  {
    label: 'Acidity',
    value: 'Crisp Meyer',
    percent: 70,
  },
  {
    label: 'Body',
    value: 'Silky / Round',
    percent: 60,
  },
  {
    label: 'Sweetness',
    value: 'Dried Fig',
    percent: 85,
  },
]

export default function TastingProfile() {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
      <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-5 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <span className="mb-1 block text-label-sm font-label-sm uppercase tracking-widest text-secondary">
              Micro-Lot Tasting Dial
            </span>
            <h3 className="mb-2 font-headline-sm text-headline-sm text-primary">
              Artisan Balance of the Week
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Our Chikmagalur & Coorg harvest balances mild floral aromatics with deep cacao and panela molasses.
            </p>
          </div>

          <div className="max-w-2xl flex-1 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {METERS.map((m) => (
              <div
                key={m.label}
                className="rounded border border-outline-variant/30 bg-surface p-3"
              >
                <div className="mb-1 flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                  <span>{m.label}</span>
                  <span className="font-medium text-primary">{m.value}</span>
                </div>
                <div className="w-full overflow-hidden h-1.5 rounded-full bg-surface-variant">
                  <div
                    className="h-full bg-primary-container"
                    style={{ width: `${m.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
