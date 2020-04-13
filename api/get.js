import { parseRequest } from './_parseRequest.js'
import { getHtml } from './_template.js'
import { pathToFileURL, writeTempFile } from './_file.js'
import { getScreenshot } from './_browser.js'

const {
  OG_HTML_DEBUG = false
} = process.env

const isDev = true
const isHtmlDebug = OG_HTML_DEBUG

export default async (req, res) => {
  try {
    const parsedReq = parseRequest(req)
    const html = getHtml(parsedReq)

    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
      return
    }

    const { text, fileType } = parsedReq
    const filePath = await writeTempFile(text, html)
    const fileUrl = pathToFileURL(filePath)
    const file = await getScreenshot(fileUrl, fileType, isDev)
    res.statusCode = 200
    res.setHeader('Content-Type', `image/${fileType}`)
    res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
