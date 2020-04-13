import { parse } from 'url'

const getTagImage = tag => `https://midu.dev/images/tags/${tag}.png`
const getTagImages = tags => tags.map(getTagImage)
export function parseRequest ({ url = '' }) {
  const { query = {} } = parse(url, true)
  const { tags, text = '', type = 'jpeg' } = query

  if (Array.isArray(text)) {
    throw new Error('Expected a single text')
  }

  return {
    fileType: type === 'jpeg' ? type : 'png',
    text: decodeURIComponent(text),
    images: getTagImages(getArray(tags))
  }
}

function getArray (stringOrArray) {
  return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]
}
