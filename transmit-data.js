const fs = require('fs');
const path = require('path');
const readline = require('readline');
const cipherText = require('./caesar-cipher');

async function transmitData(options) {

  if ((options.input && !path.join(__dirname, options.input)) || (options.output && !path.join(__dirname, options.output))) {
    process.stderr.write('Couldn\'t read the file\n');
    process.exit();
  }

  const readFrom = options.input ? fs.createReadStream(path.join(__dirname, options.input)) : process.stdin;
  const writeTo = options.output ? fs.createWriteStream(path.join(__dirname, options.output)) : process.stdout;

  readFrom.on('error', () => { process.stderr.write('Couldn\'t read the input file\n'); process.exit();})
  writeTo.on('error', () => { process.stderr.write('Couldn\'t write to the input file\n'); process.exit();})

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