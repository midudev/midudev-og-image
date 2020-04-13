import puppeteer from 'puppeteer-core'
import { getOptions } from './_options.js'

let _page

/**
 * Get a Puppeteer Page from cache or create one from scratch
 * @param {Boolean} isDev
 * @returns {Promise<import("puppeteer-core").Page>}
 */
async function getPage (isDev) {
  console.log(isDev)
  if (_page) { return _page }
  const options = await getOptions(isDev)
  const browser = await puppeteer.launch(options)
  console.log(browser)
  _page = await browser.newPage()
  return _page
}

/**
 * Create a screenshot
 * @param {String} url
 * @param {"jpeg" | "png"} type
 * @param {Boolean} isDev
 * @returns {Promise<string|Buffer>}
 */
export async function getScreenshot (url, type, isDev) {
  const page = await getPage(isDev)
  await page.setViewport({ width: 1200, height: 627 })
  await page.goto(url)
  return page.screenshot({ type })
}
