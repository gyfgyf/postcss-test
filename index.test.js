const postcss = require('postcss')
const { equal } = require('node:assert')
const { test } = require('node:test')
const fs = require('fs')
const plugin = require('./')
const input = fs.readFileSync('./input.css')
async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: './input.css' })
  // console.log('=====>', result.css)
  fs.writeFile('./output.css', result.css, () => {

  })
  // equal(result.css, output)
  // equal(result.warnings().length, 0)
}

test('does something', async () => {
  await run(input, 'a{ }', {
    platform: 'h5',
    designWidth: 750,
    minRootSize: 22,
    selectorBlackList: [/^.taro/],
    deviceRatio: { '640': 1.17, '750': 1.0, '828': 0.905 }
  })
})
