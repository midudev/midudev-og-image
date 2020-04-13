const entities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
}

export function sanitizeHtml (html) {
  return String(html).replace(/[&<>"'/]/g, key => entities[key])
}
