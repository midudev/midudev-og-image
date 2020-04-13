
import twemoji from 'twemoji'
import { sanitizeHtml } from './_sanitaze.js'

const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text) => twemoji.parse(text, twOptions)

const getImage = (src) => `<img
  alt="Generated Image"
  src="${sanitizeHtml(src)}"
  width="auto"
  height="180"
/>`

const getPlusSign = (i) => i === 0 ? '' : '<div class="plus">+</div>'

function getCss ({ text }) {
  const background = 'white'
  const radial = 'lightgray'
  const fontSize = text.length < 60 ? '96px' : '72px'

  return `
    body {
      background: ${background};
      align-items: center;
      background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
      background-size: 100px 100px;
      font-family: system-ui;
      margin: 0;
      display: flex;
      height: 100vh;
      justify-content: center;
      text-align: center;
    }

    p {
      margin: 0;
    }

    code {
      color: #D400FF;
      font-family: 'Vera';
      white-space: pre-wrap;
      letter-spacing: -5px;
    }

    code:before, code:after {
      content: '\`';
    }

    #logo {
      color: #111;
      display: flex;
      font-size: 48px;
      text-decoration: none;
      position: absolute;
      top: 16px;
      left: 16px;
    }

    #logo svg {
      fill: #09f;
      margin-right: 8px;
      width: 48px;
    }

    .logo-wrapper {
      align-content: center;
      align-items: center;
      display: flex;
      justify-content: center;
      justify-items: center;
      margin-bottom: 36px;
    }

    .logo {
      margin: 0 75px;
    }

    .plus {
      color: #BBB;
      font-size: 100px;
    }

    .spacer {
      margin: 0 24px;
    }

    .emoji {
      height: 1em;
      width: 1em;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
    }
    
    .heading {
      font-size: ${fontSize};
      font-style: normal;
      font-weight: 600;
      color: black;
      line-height: 1.2;
    }`
}

export function getHtml (parsedReq) {
  const { text, images } = parsedReq
  return `<!DOCTYPE html>
<html>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${getCss({ text })}
  </style>
  <body>
  <a id="logo" href="/"><svg viewBox="0 0 1046 1024"><path d="M326.857143 799.428571 298.285714 828q-5.714286 5.714286-13.142857 5.714286T272 828l-266.285714-266.285714q-5.714286-5.714286-5.714286-13.142857t5.714286-13.142857l266.285714-266.285714q5.714286-5.714286 13.142857-5.714286t13.142857 5.714286l28.571429 28.571429q5.714286 5.714286 5.714286 13.142857t-5.714286 13.142857l-224.571429 224.571429 224.571429 224.571429q5.714286 5.714286 5.714286 13.142857t-5.714286 13.142857zm337.714286-609.714286-213.142857 737.714286q-2.285714 7.428571-8.857143 11.142857t-13.428571 1.428571l-35.428571-9.714286q-7.428571-2.285714-11.142857-8.857143t-1.428571-14l213.142857-737.714286q2.285714-7.428571 8.857143-11.142857t13.428571-1.428571l35.428571 9.714286q7.428571 2.285714 11.142857 8.857143t1.428571 14zm375.428571 372-266.285714 266.285714Q768 833.714285 760.571429 833.714285t-13.142857-5.714286l-28.571429-28.571429q-5.714286-5.714286-5.714286-13.142857t5.714286-13.142857l224.571429-224.571429-224.571429-224.571429q-5.714286-5.714286-5.714286-13.142857t5.714286-13.142857l28.571429-28.571429q5.714286-5.714286 13.142857-5.714286t13.142857 5.714286l266.285714 266.285714q5.714286 5.714286 5.714286 13.142857T1040 561.714283z"></path></svg><span>midudev</span></a>
  <div class="spacer">
    <div class="logo-wrapper">
      ${images.map((img, i) =>
        getPlusSign(i) + getImage(img)
      ).join('')}
    </div>
    <div class="spacer">
    <div class="heading">${emojify(
      sanitizeHtml(text)
    )}
    </div>`
}
