function cipherText(text, shift, mode) {
  const textToArray = text.split('');
  const cipheredArray = textToArray.map((char) => {
    if (char.match(/[a-zA-Z]/i)) {
      const charCode = char.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        if ((mode === 'encode' && shift >= 0) || (mode === 'decode' && shift <= 0)) {
          return String.fromCharCode(((charCode + +shift - 65) % 26) + 65);
        } else if ((mode === 'decode' && shift > 0) || (mode === 'encode' && shift < 0)) {
          return String.fromCharCode(((charCode - +shift - 65) % 26) + 65);
        } else {
          throw new Error('Action must be either \'encode\' or \'decode\'');
        }
      }
      if (charCode >= 97 && charCode <= 122) {
        if ((mode === 'encode' && shift >= 0) || (mode === 'decode' && shift <= 0)) {
          return String.fromCharCode(((charCode + +shift - 97) % 26) + 97);
        } else if ((mode === 'decode' && shift > 0) || (mode === 'encode' && shift < 0)) {
          return String.fromCharCode(((charCode - +shift - 97) % 26) + 97);
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