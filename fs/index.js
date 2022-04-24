const fs = require('fs');
fs.readFile('./files/duplicate.txt', (err, data) => {

  console.log(data)
  const buffLen = data.length
  console.log(buffLen)
  fs.writeFile('./files/duplicate.txt', data.slice(0, buffLen/2), () => {
    console.log('there there')
  })
})