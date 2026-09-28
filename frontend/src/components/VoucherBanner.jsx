import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { claimVoucher } from '../api.js'

export default function VoucherBanner() {
  const [revealed, setRevealed] = useState(false)
  const [voucher, setVoucher] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      contact: '',
    },
  })

  async function onSubmit(data) {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await claimVoucher({
        name: data.name.trim(),
        phone: data.contact.trim(),
      })
      setVoucher(res.data || res)
      setRevealed(true)
      reset()
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function copyCode() {
    const code = voucher?.claimCode || ''
    if (!code) return
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          alert(`Invitation code ${code} copied to clipboard.`)
        })
        .catch(() => {
          alert(`Code: ${code}`)
        })
    } else {
      alert(`Code: ${code}`)
    }
  }

  return (
    <section
      id="voucher-card"
      className="mx-auto max-w-screen-md px-4 my-6 sm:px-6 sm:my-10"
    >
      <div className="relative overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-[0_12px_32px_-8px_rgba(32,26,23,0.06)] sm:p-9">
        <div className="absolute left-0 top-0 bottom-0 hidden w-2 bg-secondary-fixed/40 sm:block"></div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="flex items-center mb-4">
              <span className="rounded bg-secondary-container px-2 py-0.5 text-label-sm font-label-sm uppercase text-on-secondary-container">
                First Pour Welcome
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-primary">
              ₹150 OFF YOUR NEXT VISIT
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your first ritual on us. Valid across our full hand-brew roster and fresh viennoiserie tray at Vijay Nagar, Indore.
            </p>
          </div>

          <div className="w-full flex-shrink-0 md:w-80">
            {!revealed ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" id="voucherForm" noValidate>
                <div id="nameInputGroup" className="relative">
                  <label
                    htmlFor="nameInput"
                    className="mb-1 block text-label-sm font-label-sm uppercase text-on-surface-variant"
                  >
                    Enter Your Name
                  </label>
                  <div className="flex items-center">
                    <input
                      id="nameInput"
                      type="text"
                      required
                      placeholder="Your Full Name"
                      disabled={loading || isSubmitting}
                      {...register('name', {
                        required: 'Please enter your name.',
                        minLength: { value: 2, message: 'Name must be at least 2 characters.' },
                        validate: (v) => (v || '').trim().length >= 2 || 'Please enter a valid name.',
                      })}
                      className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-body-sm text-primary transition-colors focus:border-tertiary-container focus:outline-none disabled:opacity-70 ${
                        errors.name
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-outline-variant/70'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div id="contactInputGroup" className="relative">
                  <label
                    htmlFor="contactInput"
                    className="mb-1 block text-label-sm font-label-sm uppercase text-on-surface-variant"
                  >
                    Enter Mobile Number
                  </label>
                  <div className="flex items-center">
                    <input
                      id="contactInput"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      disabled={loading || isSubmitting}
                      {...register('contact', {
                        required: 'Please enter your phone number.',
                        pattern: {
                          value: /^\+?[\s()-]*\d[\d\s()-]{6,14}\d$/,
                          message: 'Please enter a valid phone number.',
                        },
                        validate: (v) => {
                          const cleaned = (v || '').replace(/[\s()-]/g, '')
                          if (cleaned.length < 7 || cleaned.length > 15) {
                            return 'Phone number should be 7 to 15 digits.'
                          }
                          if (!/^\+?\d+$/.test(cleaned)) {
                            return 'Phone number contains invalid characters.'
                          }
                          return true
                        },
                      })}
                      className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-body-sm text-primary transition-colors focus:border-tertiary-container focus:outline-none disabled:opacity-70 ${
                        errors.contact
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-outline-variant/70'
                      }`}
                    />
                  </div>
                  {errors.contact && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.contact.message}</p>
                  )}
                </div>
                {errorMsg && (
                  <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-body-sm text-red-700">
                    {errorMsg}
                  </div>
                )}
                <button
                  id="submitBtn"
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-2.5 text-label-lg font-label-lg uppercase tracking-wider text-surface transition-all duration-150 hover:bg-stone-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{loading || isSubmitting ? 'Generating...' : 'Get Invite Voucher'}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {loading || isSubmitting ? 'progress_activity' : 'confirmation_number'}
                  </span>
                </button>
              </form>
            ) : (
              <div
                id="voucherRevealed"
                className="animate-fade-in rounded-lg border border-outline-variant/50 bg-surface-container p-4 text-center"
              >
                <p className="mb-1 text-label-sm font-label-sm uppercase text-secondary">
                  Your Personal Invitation Key
                </p>
                {voucher?.name && (
                  <p className="mb-2 text-body-sm text-on-surface-variant">
                    Thank you,{' '}
                    <span className="font-semibold text-primary">{voucher.name}</span>!
                  </p>
                )}
                <div className="mb-2 flex items-center justify-center gap-2 rounded border border-outline-variant/60 bg-surface px-3 py-2">
                  <span className="select-all font-mono text-title-md font-bold tracking-widest text-primary">
                    {voucher?.claimCode || 'MORROW-INDORE-150'}
                  </span>
                  <button
                    onClick={copyCode}
                    title="Copy Code"
                    className="p-1 text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                </div>
                <p className="text-[11px] font-light text-on-surface-variant">
                  {voucher?.message ||
                    'Present at the counter or apply during online reservation.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
