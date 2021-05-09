const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const { pipeline } = require('stream');
const cipherText = require('./caesar-cipher');

async function transmitData(options) {

  if (options.input) {
    try {
      fs.accessSync(path.join(__dirname, options.input), fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      process.stderr.write(`No access to ${options.input} file!\n`);
      process.exit();
    }
  }

  if (options.output) {
    try {
      fs.accessSync(path.join(__dirname, options.output), fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
      process.stderr.write(`No access to ${options.output} file!\n`);
      process.exit();
    }
  }

  const readFrom = options.input ? fs.createReadStream(path.join(__dirname, options.input)) : process.stdin;
  const writeTo = options.output ? fs.createWriteStream(path.join(__dirname, options.output), { 'flags': 'a' }) : process.stdout;

  readFrom.setEncoding('utf8');

  

  const transformText = new Transform({
    transform(chunk, encoding, callback) {
      this.push(cipherText(chunk.toString(), options.shift, options.action));
      callback();
    }
  });

  readFrom.on('end', () => transformText.push('\n'));

  pipeline(
    readFrom,
    transformText,
    writeTo,
    (err) => {
      if (err) {
        process.stderr.write('Pipeline failed.\n');
      }
    }
  )
}

module.exports = transmitData;