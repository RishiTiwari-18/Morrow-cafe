const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

async function request(path, { method = 'GET', body, headers } = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(headers || {}),
    },
  }

  if (body !== undefined && method !== 'GET' && method !== 'HEAD') {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(url, config)
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (e) {
    data = text
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data
}

export async function healthCheck() {
  const res = await request('/health')
  return res
}

export async function claimVoucher({ name, phone }) {
  const res = await request('/voucher/claim', {
    method: 'POST',
    body: { name, phone },
  })
  return res
}

export async function getVoucher(code) {
  const res = await request(`/voucher/${encodeURIComponent(code)}`)
  return res
}

export async function listVouchers(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await request(`/voucher${query ? `?${query}` : ''}`)
  return res
}

export async function getMenu(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await request(`/menu${query ? `?${query}` : ''}`)
  return res
}

export async function getMenuItem(id) {
  const res = await request(`/menu/${id}`)
  return res
}

export async function seedMenu() {
  const res = await request('/menu/seed', { method: 'POST' })
  return res
}

export async function createMenuItem(payload) {
  const res = await request('/menu', { method: 'POST', body: payload })
  return res
}

export const api = {
  healthCheck,
  claimVoucher,
  getVoucher,
  listVouchers,
  getMenu,
  getMenuItem,
  seedMenu,
  createMenuItem,
}
