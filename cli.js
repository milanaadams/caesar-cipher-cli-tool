const { program } = require('commander');
const transmitData = require('./transmit-data.js');

program
  .version('1.0.0')
  .description("Caesar Cipher CLI tool")

program
  .requiredOption('-s, --shift <a shift>', 'you must provide --shift')
  .requiredOption('-a, --action <encode/decode>', 'you must provide--action')
  .option('-i, --input <input file>')
  .option('-o, --output <output file>')
  .parse();

const options = program.opts();

if (options.action !== 'encode' && options.action !== 'decode') {
  process.stderr.write('Action must be either \'encode\' or \'decode\'\n');
  process.exit();
}

transmitData(options);
