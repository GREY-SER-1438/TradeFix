export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateStr, locale = 'ru-RU') {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale)
}

export function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
