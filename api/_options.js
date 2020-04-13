import chrome from 'chrome-aws-lambda'

const executablePath = process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// interface Options {
//   args: string[];
//   executablePath: string;
//   headless: boolean;
// }
/**
 *
 * @param {Boolean} isDev
 */
export async function getOptions (isDev) {
  return isDev
    ? {
      args: [],
      executablePath,
      headless: true
    } : {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
}
