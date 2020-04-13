import { parse } from 'url'

const getTagImage = tag => `https://midu.dev/images/tags/${tag}.png`
const getTagImages = tags => tags.map(getTagImage)
export function parseRequest ({ url }) {
  console.log('HTTP ' + url)
  const { pathname = '/', query = {} } = parse(url || '', true)
  const { tags } = query

  let extension = ''
  let text = ''

  if (typeof pathname === 'string') {
    const arr = pathname.slice(1).split('.')
    if (arr.length === 0) {
      text = ''
    } else if (arr.length === 1) {
      text = arr[0]
    } else {
      extension = arr.pop()
      text = arr.join('.')
    }
  } else {
    throw new Error('Expected a string as pathname')
  }

  return {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    images: getTagImages(getArray(tags))
  }
}

function getArray (stringOrArray) {
  return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]
}
