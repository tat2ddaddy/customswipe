const AES = require('crypto-js/aes')
const CryptoJS = require('crypto-js')

export function Encrypt(data, secret) {
    let ciphertext = AES.encrypt(data, secret).toString()
    console.log(ciphertext)
}

export function Decrypt(text) {
    let bytes = AES.decrypt(ciphertext, secret)
    text = bytes.toString(CryptoJS.enc.Utf8)
    return text
}
