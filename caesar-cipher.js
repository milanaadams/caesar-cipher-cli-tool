function cipherText(text, shift, mode) {
  shift = +shift;
  if (shift < 0 && mode === 'encode') {
    shift = shift * -1;
    mode = 'decode';
  } else if (shift < 0 && 'decode') {
    shift = shift * -1;
    mode = 'encode';
  }
  const textToArray = text.split('');
  const cipheredArray = textToArray.map((char) => {
    if (char.match(/[a-zA-Z]/i)) {
      const charCode = char.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        if (mode === 'encode') {
          return String.fromCharCode(((charCode + shift % 26 - 65) ) + 65);
        } else if (mode === 'decode') {
          return String.fromCharCode(((charCode - shift % 26 - 65)) + 65);
        } else {
          throw new Error('Action must be either \'encode\' or \'decode\'');
        }
      }
      if (charCode >= 97 && charCode <= 122) {
        if (mode === 'encode') {
          return String.fromCharCode(((charCode + shift % 26 - 97)) + 97);
        } else if (mode === 'decode') {
          return String.fromCharCode(((charCode - shift % 26 - 97)) + 97);
        } else {
          throw new Error('Shift must be either \'encode\' or \'decode\'');
        }
      }
    }
    return char;
  })
  return cipheredArray.join('');
}

module.exports = cipherText;