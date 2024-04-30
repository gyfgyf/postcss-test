var fs = require('fs')
fs.readFile('./index.html', 'utf-8', (error, res) => {
  // console.log('res', res)
  fs.readFile('./output.css', 'utf-8', (error, res) => {

    console.log('res', res)

  })
})