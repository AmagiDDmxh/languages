const hexStr = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"

let chars = ''
for (let i = 0; i < hexStr.length; i += 2) {
  const int = parseInt(`${hexStr[i]}${hexStr[i+1]}`, 16)
  chars += String.fromCharCode(int)
}

function hexToBase64(hexstring: string) {
  return btoa(hexstring.match(/\w{2}/g)!.map(function(a: string) {
      return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}

console.log(hexToBase64(hexStr));

// console.log(Base64.fromString(hexStr).toString());
