/**
 * Formats a number to IDR currency
 * @param {number} value 
 * @returns {string} Formatted string, e.g., "Rp 120.000"
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

/**
 * Formats a currency to a short string like "Rp 120rb"
 * @param {number} value 
 * @returns {string} 
 */
export const formatCurrencyShort = (value) => {
  if (value === undefined || value === null) return 'Rp 0'
  if (value >= 1000 && value < 1000000) {
    return `Rp ${value / 1000}rb`
  } else if (value >= 1000000) {
    return `Rp ${value / 1000000}jt`
  }
  return formatCurrency(value)
}

/**
 * Formats a date string to Indonesian locale
 * @param {string|Date} dateString 
 * @param {Object} options 
 * @returns {string}
 */
export const formatDate = (dateString, options = { day: 'numeric', month: 'long', year: 'numeric' }) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', options).format(date)
}
