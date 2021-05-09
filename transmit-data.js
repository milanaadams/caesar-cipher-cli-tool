const fs = require('fs');
const path = require('path');
const readline = require('readline');
const cipherText = require('./caesar-cipher');

async function transmitData(options) {

  if(options.input) {
    try {
      fs.accessSync(path.join(__dirname, options.input), fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      console.error(`No access to ${options.input} file!`);
      process.exit();
    }
  }

  if(options.output) {
    try {
      fs.accessSync(path.join(__dirname, options.output), fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      console.error(`No access to ${options.output} file!`);
      process.exit();
    }
  }

  const readFrom = options.input ? fs.createReadStream(path.join(__dirname, options.input)) : process.stdin;
  const writeTo = options.output ? fs.createWriteStream(path.join(__dirname, options.output)) : process.stdout;

  readFrom.setEncoding('utf8');

  const rl = readline.createInterface({
    input: readFrom,
    terminal: false
  });

  rl.on('line', (line) => {
    const processedText = cipherText(line, options.shift, options.action);
    writeTo.write(`${processedText}\n`);
  })
}

module.exports = transmitData;